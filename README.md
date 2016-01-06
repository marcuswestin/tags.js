Tags
====

Generate UI for reactjs in vanilla javascript.

The default tags.js build uses DOM elements for web browsers (`tags/bootstraps/react-dom`).

You can also use `tags/bootstraps/react-native` and `tags/bootstraps/react-native-desktop`.

Tags exposes a number of functions for easily creating views using flexbox layout.

	// Views
	tags.View
	tags.TextView
	tags.ImageView
	tags.LinkView
	tags.ListView
	
	// Styles
	tags.Width
	tags.Height
	tags.Background
	tags.Color
	tags.Style
	
	// Helpers
	tags.OnClick
	tags.OnKeyPress
	tags.OnChange
	tags.Map
	tags.ExposeGlobals
	tags.MountApp
	
	// Fonts
	tags.LoadFont
	
	// Flexbox
	tags.Row
	tags.Col
	tags.RowReverse
	tags.ColReverse
	tags.Wrap
	tags.WrapReverse
	tags.JustifyContent
	tags.AlignItems
	tags.AlignContent
	tags.Order
	tags.Fix
	tags.Flex
	tags.AlignSelf
	

All commonly used methods can be made globally available:

	tags.ExposeGlobals()

Example
-------

See examples/exampleReactApp.js
