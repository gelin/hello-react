FROM nginx:alpine

COPY docker/default.nginx /etc/nginx/conf.d/default.conf

COPY build/ /usr/share/nginx/html/

