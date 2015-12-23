set -e
cd $(cd `dirname ${BASH_SOURCE[0]}` && pwd -P)
export PATH=../node_modules/.bin:$PATH

browserify ../es6/index.es6 --outfile ../tags.build.js --no-bundle-external \
	--extension .es6 -t babelify --presets es2015

browserify ../es6/index.es6 --outfile ../tags.min.js --no-bundle-external  \
	--extension .es6 -t babelify --presets es2015 -t uglifyify
