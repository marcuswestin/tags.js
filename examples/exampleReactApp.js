// normally, require('tags')
var tags = require('../es6')
var ReactDOM = require('react-dom')
var React = require('react')

var div = tags.makeTag('div')
var input = tags.makeTag('input')
var Style = tags.Style
var Background = tags.Background
var Color = tags.Color
var OnClick = tags.OnClick
var OnChange = tags.OnChange
var Font = tags.LoadFont('Lato', 'n4', { italic: 'i4', bold: 'n7', boldItalic: 'i7' }, onFontsLoaded)

var AppView = React.createFactory(React.createClass({
	getInitialState: function() {
		return { input: 'Hi' }
	},
	render: function() {
		return div(Font(13),
			'Lato, weight 400, size 13',
			div(Font.italic(12), 'Lato, weight 400, size 12, italic'),
			div(Font.bold(18), 'Lato, weight 700, size 18'),
			div(Font.boldItalic(15), 'Lato, weight 700, size 15, italic'),
			input({ value:this.state.input }, OnChange(this.handleInputChange)),
			div(Style({ maxWidth:200 }), Background('steelblue'), Color('white'),
				this.state.input,
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
}))

var viewport = document.body.appendChild(document.createElement('div'))
viewport.innerText = 'loading fonts...'
function onFontsLoaded() {
	ReactDOM.render(AppView(), viewport)
}