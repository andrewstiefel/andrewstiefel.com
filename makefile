install:
	bundle install

start:
	bundle exec jekyll serve --drafts --livereload

build:
	JEKYLL_ENV=production bundle exec jekyll build