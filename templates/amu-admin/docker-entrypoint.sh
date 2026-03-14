#!/bin/sh
set -eu

app_base_path="${APP_BASE_PATH:-/}"
config_path="/etc/nginx/conf.d/default.conf"

cat > "$config_path" <<'EOF'
server {
  listen 80;
  server_name _;

  root /usr/share/nginx/html;
  index index.html;

  location = /healthz {
    add_header Content-Type text/plain;
    return 200 'ok\n';
  }

  location /api/ {
    proxy_pass http://app:3000/api/;
    proxy_http_version 1.1;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
  }
EOF

if [ "$app_base_path" = "/" ]; then
  cat >> "$config_path" <<'EOF'

  location / {
    try_files $uri $uri/ /index.html;
  }
}
EOF
else
  normalized_path="$(printf '%s' "$app_base_path" | sed 's#^/*##; s#/*$##')"
  app_base_path="/$normalized_path/"

  cat >> "$config_path" <<EOF

  location = ${app_base_path%/} {
    return 301 ${app_base_path};
  }

  location ${app_base_path} {
    try_files \$uri \$uri/ ${app_base_path}index.html;
  }

  location = / {
    return 404;
  }
}
EOF
fi

exec nginx -g 'daemon off;'