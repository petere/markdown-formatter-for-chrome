CONVERT = convert
JSHINT = jshint
JSONLINT = jsonlint
WGET = wget
ZIP = zip

icon_sizes = 16 19 38 48 128
icons = $(icon_sizes:%=extension/icon-%.png)


all: icons extension/commonmark.js

icons: $(icons)

extension/icon-%.png: markdown-mark.svg
	$(CONVERT) $< -resize $*x$* $@

extension/commonmark.js:
	$(WGET) -O $@ http://spec.commonmark.org/js/commonmark.js

markdown-mark.svg:
	$(WGET) -O $@ https://raw.githubusercontent.com/dcurtis/markdown-mark/master/svg/markdown-mark.svg

clean:
	$(RM) $(icons)

realclean: clean
	$(RM) extension/commonmark.js markdown-mark.svg
	$(RM) extension.zip

check:
	$(JSHINT) extension/background.js extension/content.js
	$(JSONLINT) -q extension/manifest.json package.json

zip: extension.zip
extension.zip:
	$(ZIP) -r $@ extension/
