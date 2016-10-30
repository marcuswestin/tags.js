// Don't change to `import * from`, since _bootstrap modifies module.exports
module.exports = require('./src/tags-all')

import ReactDOM from 'react-dom'
import {_bootstrap, createViewFactory} from './src/tags-all'
export * from './src/tags-fonts'

_bootstrap(_renderDOM, {
	View: 'div',
	Text: 'span',
	Image: 'img',
})

function _renderDOM(ViewComponent, el) {
	if (!el) {
		el = document.body.appendChild(document.createElement('div'))
	}
	return ReactDOM.render(ViewComponent(), el)
}


// Functions specific to DOM environment
////////////////////////////////////////

import _ from 'lodash'

module.exports.exposeGlobals = function(tagNames) {
	var tagNames = (
		'A,BR,BUTTON,DIV,FORM,H1,H2,H3,H4,H5,H6,HR,IFRAME,IMG,INPUT,LABEL,LI,OL,'+
		'OPTION,OUTPUT,P,PRE,SPAN,TABLE,TBODY,TD,TEXTAREA,TFOOT,TH,THEAD,TR,U,UL'
	).split(',')
	_.each(tagNames, function(tagName) {
		console.log("tags/bootstraps/dom-bootstrap.js: Expose global", tagName)
		global[tagName] = createViewFactory(tagName)
	})
}
