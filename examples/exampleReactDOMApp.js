var Tags = require('../react-dom') // normally require('tags/react-dom')
var React = require('react')
var createReactClass = require('create-react-class')

var { View, Text, Col, OnClick, OnChange, Style, Background, Color } = Tags
var Input = Tags.createFactory('input')
var Font = Tags.loadFont('Lato', 'n4', { italic: 'i4', bold: 'n7', boldItalic: 'i7' }, onFontsLoaded)

var App = createReactClass({
	getInitialState: function() {
		return { input: 'Hi' }
	},
	render: function() {
		return Col(Font(13),
			Text('Lato, weight 400, size 13'),
			Text(Font.italic(12), 'Lato, weight 400, size 12, italic'),
			Text(Font.bold(18), 'Lato, weight 700, size 18'),
			Text(Font.boldItalic(15), 'Lato, weight 700, size 15, italic'),
			Input({ value:this.state.input }, OnChange(this.handleInputChange)),
			View(Style({ maxWidth:200 }), Background('steelblue'), Color('white'),
				Text(this.state.input),
				OnClick(this.handleBlueClick)
			)
		)
	},
	handleInputChange: function(event) {
		this.setState({ input:event.target.value })
	},
	handleBlueClick: function() {
		alert('click: '+this.state.input)
	}
})

var loadingMessage = document.body.appendChild(document.createElement('div'))
loadingMessage.innerText = 'loading fonts...'
function onFontsLoaded() {
	document.body.removeChild(loadingMessage)
	Tags.renderApp(App)
}
