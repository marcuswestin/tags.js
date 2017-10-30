// Don't change to `import * from`, since _bootstrap modifies module.exports
module.exports = require('./src/tags-all')
module.exports.loadFont = require('./src/tags-fonts').loadFont

import React from 'react'
import ReactDOM from 'react-dom'
import { each } from 'lodash'
import { _bootstrap } from './src/tags-all'

_bootstrap(_getComponents(), function renderApp(AppComponent, domEl) {
	if (!domEl) {
		domEl = document.body.appendChild(document.createElement('div'))
	}
	return ReactDOM.render(React.createElement(AppComponent), domEl)
})

function _getComponents() {
	var tagNames = (
		'A,Br,Button,Div,Form,H1,H2,H3,H4,H5,H6,HR,Iframe,Img,Input,Label,Li,Ol,'+
		'Option,Output,P,Pre,Span,Table,TBody,Td,Textarea,Tfoot,Th,Thead,Tr,U,Ul'
	).split(',')
	var components = {}
	each(tagNames, function(tagName) {
		components[tagName] = tagName.toLowerCase()
	})
	components.View = components.Div
	components.Text = components.Span
	components.Image = components.Img
	return components
}
