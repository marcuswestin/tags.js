set -e
cd $(cd `dirname ${BASH_SOURCE[0]}` && pwd -P)
export PATH=../node_modules/.bin:$PATH

budo ../examples/exampleReactApp.js --live --open --title "tags react example" -- -d \
	--extension .es6 -t babelify --presets es2015
