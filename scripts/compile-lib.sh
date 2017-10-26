set -e
cd $(cd `dirname ${BASH_SOURCE[0]}` && pwd -P)

../node_modules/.bin/browserify ../react-dom.js --outfile ../tags.js --no-bundle-external \
	-t babelify
