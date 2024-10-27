FROM node:lts-alpine AS builder

WORKDIR /frontend

COPY package*.json .

RUN --mount=type=cache,target=/root/.npm \
    npm ci

COPY . .

RUN npm run ng build -c production

# Final image to build
FROM alpine:3.20

RUN \
    apk --no-cache update && \
    apk --no-cache upgrade && \
    apk --no-cache add nginx

RUN \
    adduser -D -g 'www' www && \
    mkdir /www && \
    chown -R www: /var/lib/nginx && \
    chown -R www: /www

COPY nginx.d/nginx.conf /etc/nginx/nginx.conf

WORKDIR /www

COPY --from=builder /frontend/dist/film-catalog /www

EXPOSE 80

ENTRYPOINT ["nginx", "-g", "daemon off;"]
