# AWS EC2 Deployment Guide for jontremblay.com

This guide will walk you through deploying the Next.js application to AWS EC2.

## 📋 Prerequisites

- AWS Account
- Domain name (jontremblay.com)
- SSH key pair for EC2 access
- Basic knowledge of Linux command line

## 🚀 Step-by-Step Deployment

### Step 1: Launch EC2 Instance

1. **Log into AWS Console** and navigate to EC2
2. **Click "Launch Instance"**
3. **Configure Instance:**
   - **Name**: `jontremblay-web`
   - **AMI**: Ubuntu Server 22.04 LTS (free tier eligible)
   - **Instance Type**: t2.small or t3.small (t2.micro may be too small)
   - **Key Pair**: Create new or select existing key pair
   - **Network Settings**:
     - Allow SSH (port 22) from your IP
     - Allow HTTP (port 80) from anywhere
     - Allow HTTPS (port 443) from anywhere
   - **Storage**: 20 GB gp3
4. **Launch the instance**

### Step 2: Connect to Your Instance

```bash
# SSH into your instance
ssh -i your-key.pem ubuntu@your-ec2-public-ip
```

### Step 3: Install Required Software

```bash
# Update system packages
sudo apt update && sudo apt upgrade -y

# Install Node.js 20.x
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Verify installation
node --version
npm --version

# Install PostgreSQL
sudo apt install -y postgresql postgresql-contrib

# Install Nginx (web server)
sudo apt install -y nginx

# Install PM2 (process manager)
sudo npm install -g pm2
```

### Step 4: Set Up PostgreSQL Database

```bash
# Switch to postgres user
sudo -u postgres psql

# In PostgreSQL prompt, run:
CREATE DATABASE jontremblay;
CREATE USER jonadmin WITH PASSWORD 'your-strong-password';
GRANT ALL PRIVILEGES ON DATABASE jontremblay TO jonadmin;
\q

# Allow password authentication
sudo nano /etc/postgresql/14/main/pg_hba.conf
# Change the line for local connections from 'peer' to 'md5'

# Restart PostgreSQL
sudo systemctl restart postgresql
```

### Step 5: Clone and Set Up Application

```bash
# Create application directory
sudo mkdir -p /var/www/jontremblay
sudo chown ubuntu:ubuntu /var/www/jontremblay

# Clone or upload your application
cd /var/www/jontremblay
# Option 1: If using Git
git clone https://github.com/yourusername/jontremblay.git .

# Option 2: Upload files via SCP from your local machine
# scp -i your-key.pem -r ./* ubuntu@your-ec2-public-ip:/var/www/jontremblay/

# Install dependencies
npm install

# Create .env file
nano .env
```

**Add the following to `.env`:**

```env
DATABASE_URL="postgresql://jonadmin:your-strong-password@localhost:5432/jontremblay?schema=public"

EMAIL_HOST="smtp.gmail.com"
EMAIL_PORT="587"
EMAIL_USER="your-email@gmail.com"
EMAIL_PASSWORD="your-app-password"
EMAIL_FROM="jtremblay@jontremblay.com"

ADMIN_EMAIL="jtremblay@jontremblay.com"

NEXT_PUBLIC_SITE_URL="https://jontremblay.com"
```

```bash
# Set up database
npx prisma generate
npx prisma migrate deploy

# Build the application
npm run build
```

### Step 6: Configure PM2 to Run Application

```bash
# Start the application with PM2
pm2 start npm --name "jontremblay" -- start

# Configure PM2 to start on system boot
pm2 startup systemd
pm2 save

# Check status
pm2 status
pm2 logs jontremblay
```

### Step 7: Configure Nginx as Reverse Proxy

```bash
# Create Nginx configuration
sudo nano /etc/nginx/sites-available/jontremblay
```

**Add the following configuration:**

```nginx
server {
    listen 80;
    server_name jontremblay.com www.jontremblay.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

```bash
# Enable the site
sudo ln -s /etc/nginx/sites-available/jontremblay /etc/nginx/sites-enabled/

# Remove default site
sudo rm /etc/nginx/sites-enabled/default

# Test Nginx configuration
sudo nginx -t

# Restart Nginx
sudo systemctl restart nginx
```

### Step 8: Set Up SSL with Let's Encrypt

```bash
# Install Certbot
sudo apt install -y certbot python3-certbot-nginx

# Obtain SSL certificate
sudo certbot --nginx -d jontremblay.com -d www.jontremblay.com

# Test auto-renewal
sudo certbot renew --dry-run
```

### Step 9: Configure Domain DNS

In your domain registrar (GoDaddy, Namecheap, etc.):

1. Create an **A Record**:
   - Host: `@`
   - Value: Your EC2 public IP address
   - TTL: 3600

2. Create a **CNAME Record** (optional):
   - Host: `www`
   - Value: `jontremblay.com`
   - TTL: 3600

### Step 10: Configure Firewall (UFW)

```bash
# Enable UFW
sudo ufw allow OpenSSH
sudo ufw allow 'Nginx Full'
sudo ufw enable

# Check status
sudo ufw status
```

## 🔄 Updating the Application

When you need to update the application:

```bash
# SSH into server
ssh -i your-key.pem ubuntu@your-ec2-public-ip

# Navigate to application directory
cd /var/www/jontremblay

# Pull latest changes (if using Git)
git pull

# Or upload new files via SCP

# Install new dependencies
npm install

# Run database migrations (if any)
npx prisma migrate deploy

# Rebuild application
npm run build

# Restart PM2
pm2 restart jontremblay

# Check logs
pm2 logs jontremblay
```

## 🔍 Monitoring and Maintenance

### View Application Logs

```bash
# PM2 logs
pm2 logs jontremblay

# Nginx access logs
sudo tail -f /var/log/nginx/access.log

# Nginx error logs
sudo tail -f /var/log/nginx/error.log
```

### Monitor System Resources

```bash
# Check PM2 status
pm2 status

# Monitor system resources
pm2 monit
```

### Database Backup

```bash
# Create backup script
sudo nano /usr/local/bin/backup-db.sh
```

**Add the following:**

```bash
#!/bin/bash
BACKUP_DIR="/var/backups/postgresql"
mkdir -p $BACKUP_DIR
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
pg_dump -U jonadmin jontremblay > $BACKUP_DIR/jontremblay_$TIMESTAMP.sql
# Keep only last 7 days of backups
find $BACKUP_DIR -name "jontremblay_*.sql" -mtime +7 -delete
```

```bash
# Make executable
sudo chmod +x /usr/local/bin/backup-db.sh

# Add to crontab for daily backups
sudo crontab -e
# Add this line: 0 2 * * * /usr/local/bin/backup-db.sh
```

## 🔒 Security Best Practices

1. **Keep System Updated:**
   ```bash
   sudo apt update && sudo apt upgrade -y
   ```

2. **Change Default PostgreSQL Port** (optional):
   ```bash
   sudo nano /etc/postgresql/14/main/postgresql.conf
   # Change port = 5432 to another port
   ```

3. **Set Up Fail2Ban** (protects against brute force):
   ```bash
   sudo apt install -y fail2ban
   sudo systemctl enable fail2ban
   ```

4. **Regular Backups**: Use AWS backup services or configure automated backups

5. **Monitor Logs**: Regularly check application and system logs

## 🐛 Troubleshooting

### Application won't start

```bash
# Check PM2 logs
pm2 logs jontremblay

# Check if port 3000 is in use
sudo lsof -i :3000

# Restart application
pm2 restart jontremblay
```

### Database connection issues

```bash
# Check PostgreSQL status
sudo systemctl status postgresql

# Test database connection
psql -U jonadmin -d jontremblay -h localhost
```

### Nginx issues

```bash
# Check Nginx status
sudo systemctl status nginx

# Test configuration
sudo nginx -t

# Restart Nginx
sudo systemctl restart nginx
```

### SSL certificate issues

```bash
# Renew certificate manually
sudo certbot renew

# Check certificate expiry
sudo certbot certificates
```

## 💰 Cost Estimation

- **EC2 t3.small**: ~$15-20/month
- **Storage (20GB)**: ~$2/month
- **Data Transfer**: Variable (first 1GB free)
- **Total**: ~$17-22/month

## 📞 Support

If you encounter issues during deployment, contact:
- Email: jtremblay@jontremblay.com
- Phone: 404-374-9322

---

**Deployment Checklist:**

- [ ] EC2 instance launched and running
- [ ] Node.js and PostgreSQL installed
- [ ] Application code deployed
- [ ] Environment variables configured
- [ ] Database set up and migrations run
- [ ] PM2 running the application
- [ ] Nginx configured as reverse proxy
- [ ] SSL certificate installed
- [ ] DNS records configured
- [ ] Firewall configured
- [ ] Backup script set up
- [ ] Test all functionality (especially contact form)

