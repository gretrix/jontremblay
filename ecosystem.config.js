module.exports = {
  apps: [{
    name: 'jontremblay',
    script: 'node_modules/next/dist/bin/next',
    args: 'start -p 3000',
    cwd: '/var/www/jontremblay',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    },
    error_file: '/var/www/jontremblay/logs/err.log',
    out_file: '/var/www/jontremblay/logs/out.log',
    log_file: '/var/www/jontremblay/logs/combined.log',
    time: true
  }]
}

