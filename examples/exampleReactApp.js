// normally, require('tags/react-dom') or require('tags/react-native')
var tags = require('../react-dom')

tags.ExposeGlobals()
var Input = tags.createViewFactory('input')
var Font = tags.LoadFont('Lato', 'n4', { italic: 'i4', bold: 'n7', boldItalic: 'i7' }, onFontsLoaded)

var AppView = tags.ViewComponent({
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

var loadingMessage = document.body.appendChild(document.createElement('View'))
loadingMessage.innerText = 'loading fonts...'
function onFontsLoaded() {
	document.body.removeChild(loadingMessage)
	tags.Render(AppView)
}
