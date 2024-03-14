# Production image storybook
FROM docker.io/nginx:stable-alpine as production
LABEL org.opencontainers.image.source=https://github.com/parcellab/portal

ARG GITHUB_SHA=unknown
ARG VERSION=unknown

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY build/ /usr/share/nginx/html

RUN echo $GITHUB_SHA > /usr/share/nginx/html/sha.txt
RUN echo $VERSION > /usr/share/nginx/html/version.txt
