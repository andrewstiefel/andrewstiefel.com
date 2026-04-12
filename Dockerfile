FROM ruby:4.0.2 AS builder
WORKDIR /srv/jekyll
COPY Gemfile Gemfile.lock ./
RUN bundle install
COPY . .
RUN chown 1000:1000 -R /srv/jekyll
RUN JEKYLL_ENV=production bundle exec jekyll build -d /srv/jekyll/_site

FROM nginx:alpine
RUN apk add --no-cache curl
COPY --from=builder /srv/jekyll/_site /usr/share/nginx/html
COPY scripts/purge.sh /usr/local/bin/purge.sh
COPY scripts/entrypoint.sh /entrypoint.sh
EXPOSE 80
ENTRYPOINT ["/entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]