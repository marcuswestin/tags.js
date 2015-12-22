set -e
cd $(cd `dirname ${BASH_SOURCE[0]}` && pwd -P)
export PATH=../node_modules/.bin:$PATH

browserify ../es6 --output ../tags.build.js --no-bundle-external \
	--extension .es6 -t babelify --presets es2015
