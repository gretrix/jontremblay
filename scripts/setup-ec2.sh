#!/bin/bash

# Initial EC2 setup script for jontremblay.com
# Run this once on a fresh EC2 instance

set -e  # Exit on any error

echo "🚀 Starting EC2 setup for jontremblay.com..."

# Update system
echo "📦 Updating system packages..."
sudo apt update && sudo apt upgrade -y

# Install Node.js 20.x
echo "📦 Installing Node.js..."
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Install PostgreSQL
echo "🗄️ Installing PostgreSQL..."
sudo apt install -y postgresql postgresql-contrib

# Install Nginx
echo "🌐 Installing Nginx..."
sudo apt install -y nginx

# Install PM2
echo "⚙️ Installing PM2..."
sudo npm install -g pm2

# Install Certbot for SSL
echo "🔒 Installing Certbot..."
sudo apt install -y certbot python3-certbot-nginx

# Install Fail2ban for security
echo "🛡️ Installing Fail2ban..."
sudo apt install -y fail2ban

# Create application directory
echo "📁 Creating application directory..."
sudo mkdir -p /var/www/jontremblay
sudo chown ubuntu:ubuntu /var/www/jontremblay

# Create logs directory
mkdir -p /var/www/jontremblay/logs

# Set up PostgreSQL database
echo "🗄️ Setting up PostgreSQL database..."
sudo -u postgres psql << EOF
CREATE DATABASE jontremblay;
CREATE USER jonadmin WITH PASSWORD 'CHANGE_THIS_PASSWORD';
GRANT ALL PRIVILEGES ON DATABASE jontremblay TO jonadmin;
EOF

echo "⚠️  IMPORTANT: Change the PostgreSQL password above!"

# Configure PostgreSQL for password authentication
echo "🔧 Configuring PostgreSQL..."
sudo sed -i 's/local   all             all                                     peer/local   all             all                                     md5/' /etc/postgresql/14/main/pg_hba.conf
sudo systemctl restart postgresql

# Configure firewall
echo "🔥 Configuring firewall..."
sudo ufw allow OpenSSH
sudo ufw allow 'Nginx Full'
echo "y" | sudo ufw enable

# Create Nginx configuration
echo "🌐 Creating Nginx configuration..."
sudo tee /etc/nginx/sites-available/jontremblay > /dev/null << 'EOF'
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
EOF

# Enable the site
sudo ln -sf /etc/nginx/sites-available/jontremblay /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t
sudo systemctl restart nginx

# Create backup script
echo "💾 Creating backup script..."
sudo tee /usr/local/bin/backup-db.sh > /dev/null << 'EOF'
#!/bin/bash
BACKUP_DIR="/var/backups/postgresql"
mkdir -p $BACKUP_DIR
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
pg_dump -U jonadmin jontremblay > $BACKUP_DIR/jontremblay_$TIMESTAMP.sql
find $BACKUP_DIR -name "jontremblay_*.sql" -mtime +7 -delete
EOF

sudo chmod +x /usr/local/bin/backup-db.sh

# Add backup to crontab
echo "⏰ Setting up daily backups..."
(sudo crontab -l 2>/dev/null; echo "0 2 * * * /usr/local/bin/backup-db.sh") | sudo crontab -

echo "✅ EC2 setup complete!"
echo ""
echo "📝 Next steps:"
echo "1. Upload your application files to /var/www/jontremblay"
echo "2. Create .env file with your configuration"
echo "3. Run: cd /var/www/jontremblay && npm install"
echo "4. Run: npx prisma generate && npx prisma migrate deploy"
echo "5. Run: npm run build"
echo "6. Run: pm2 start ecosystem.config.js"
echo "7. Run: pm2 startup systemd && pm2 save"
echo "8. Configure SSL: sudo certbot --nginx -d jontremblay.com -d www.jontremblay.com"
echo "9. Configure DNS records to point to this server's IP: $(curl -s ifconfig.me)"
echo ""
echo "⚠️  Don't forget to:"
echo "   - Change the PostgreSQL password"
echo "   - Update .env with correct credentials"
echo "   - Configure your email settings"

