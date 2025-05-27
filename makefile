install:
	bundle install

serve:
	JEKYLL_ENV=development bundle exec jekyll serve --drafts --livereload

clean:
	bundle exec jekyll clean

start: clean
	$(MAKE) serve

build:
	JEKYLL_ENV=production bundle exec jekyll build