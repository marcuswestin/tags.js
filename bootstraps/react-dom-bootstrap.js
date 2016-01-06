module.exports = require('../src/index')

import _ from 'lodash'
import * as ReactDOM from 'react-dom'
import {_bootstrap} from '../src/index'
import {CreateViewFactory} from '../src/tags-views'

_bootstrap(renderDOM, {
	View: 'div',
	Text: 'span',
	Image: 'img',
})

function renderDOM(ViewComponent, el) {
	if (!el) {
		el = document.body.appendChild(document.createElement('div'))
	}
	return ReactDOM.render(ViewComponent(), el)
}

// Functions specific to DOM environment
////////////////////////////////////////
module.exports.ExposeDOMGlobals = function(tagNames) {
	var tagNames = ('A,BR,BUTTON,DIV,FORM,H1,H2,H3,H4,H5,H6,HR,IFRAME,IMG,INPUT,LABEL,LI,OL,'+
		'OPTION,OUTPUT,P,PRE,SPAN,TABLE,TBODY,TD,TEXTAREA,TFOOT,TH,THEAD,TR,U,UL').split(',')
	_.each(tagNames, function(tagName) {
		exposeGlobalTagName(tagName)
	})
}

function exposeGlobalTagName(tagName) {
	console.log("tags/bootstraps/dom-bootstrap.js: EXPOSING GLOBAL VARIABLE", tagName)
	global[tagName] = CreateViewFactory(tagName)
}
