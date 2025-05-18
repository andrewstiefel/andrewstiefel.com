install:
	bundle install

start:
	JEKYLL_ENV=development bundle exec jekyll serve --drafts --livereload

build:
	JEKYLL_ENV=production bundle exec jekyll build