CONVERT = convert
JSHINT = jshint
JSONLINT = jsonlint
WGET = wget

icon_sizes = 16 19 38 48 128
icons = $(icon_sizes:%=icon-%.png)


all: icons commonmark.js

icons: $(icons)

icon-%.png: markdown-mark.svg
	$(CONVERT) $< -resize $*x$* $@

commonmark.js:
	$(WGET) http://spec.commonmark.org/js/commonmark.js

markdown-mark.svg:
	$(WGET) https://raw.githubusercontent.com/dcurtis/markdown-mark/master/svg/markdown-mark.svg

clean:
	$(RM) $(icons)

realclean:
	$(RM) commonmark.js markdown-mark.svg

check:
	$(JSHINT) background.js content.js
	$(JSONLINT) -q manifest.json package.json
