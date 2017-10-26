set -e
cd $(cd `dirname ${BASH_SOURCE[0]}` && pwd -P)

../node_modules/.bin/budo ../examples/exampleReactDOMApp.js --port 9901 --live --open --title "tags react example" -- -d \
	-t babelify
