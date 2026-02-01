FROM ruby:3.3.5 AS builder
RUN apt-get update -qq && apt-get install -y build-essential nodejs curl
WORKDIR /srv/jekyll
COPY Gemfile Gemfile.lock ./
RUN bundle install
COPY . .
RUN chown 1000:1000 -R /srv/jekyll
RUN JEKYLL_ENV=production bundle exec jekyll build -d /srv/jekyll/_site

# Install rclone and deploy to Bunny
RUN curl https://rclone.org/install.sh | bash

# Configure rclone for Bunny
ARG BUNNY_STORAGE_ZONE
ARG BUNNY_STORAGE_PASSWORD
ARG BUNNY_STORAGE_HOSTNAME
ARG BUNNY_PULLZONE_ID
ARG BUNNY_API_KEY

RUN mkdir -p ~/.config/rclone && \
    printf "[bunny]\ntype = ftp\nhost = %s\nuser = %s\npass = %s\n" \
    "${BUNNY_STORAGE_HOSTNAME}" \
    "${BUNNY_STORAGE_ZONE}" \
    "$(rclone obscure ${BUNNY_STORAGE_PASSWORD})" \
    > ~/.config/rclone/rclone.conf

# Sync to Bunny CDN
RUN rclone sync /srv/jekyll/_site/ bunny:/ --progress --delete-before

# Purge CDN cache
RUN curl -X POST "https://api.bunny.net/pullzone/${BUNNY_PULLZONE_ID}/purgeCache" \
    -H "AccessKey: ${BUNNY_API_KEY}" || echo "Cache purge failed, continuing..."

FROM nginx:alpine
COPY --from=builder /srv/jekyll/_site /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]