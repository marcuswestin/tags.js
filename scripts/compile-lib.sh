set -e
cd $(cd `dirname ${BASH_SOURCE[0]}` && pwd -P)
export PATH=../node_modules/.bin:$PATH

browserify ../src/index.js --outfile ../tags.js --no-bundle-external \
	-t babelify --presets es2015

browserify ../src/index.js --outfile ../tags.min.js --no-bundle-external  \
	-t babelify --presets es2015 -t uglifyify
