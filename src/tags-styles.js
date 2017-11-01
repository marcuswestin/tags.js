import { each } from 'lodash'

export var Width = (width) => Style({ width:width })
export var Height = (height) => Style({ height:height })
export var Background = (background) => Style({ background:background })
export var Color = (color) => Style({ color:color })
export var Padding = _topRigBotLefStyleFunction('padding')
export var Pad = Padding
export var Margin = _topRigBotLefStyleFunction('margin')

class TagsStyle {
	_isTagsStyleVal () { return true }
	constructor(styles) {
		this._tagsStyleVal = styles
	}
}

export function Style(styles) {
	return new TagsStyle(styles)
}

export function TextShadow(x, y, r, color) {
	return Style({
		textShadowOffset: {
			width:x,
			height:y,
		},
		textShadowRadius: r,
		textShadowColor: color
	})
}

// Util
///////

_topRigBotLefStyleFunction.nameExt = ['Top', 'Right', 'Bottom', 'Left']
function _topRigBotLefStyleFunction(styleName) {
	// React native does not allow for e.g style:{ padding:'4px 10px 5px' }
	// Ee must expand e.g Padding(4, 10, 5) to { paddingTop:4, paddingRight:10, paddingBottom:5, paddingLeft:10 }
	return function() {
		// Explode
		var [top, right, bottom, left] = arguments
		if (right === undefined) { right = top }
		if (bottom === undefined) { bottom = top }
		if (left === undefined) { left = right }
		// Assign to named object
		var styles = {}
		each([top, right, bottom, left], (val, i) => {
			var name = styleName + _topRigBotLefStyleFunction.nameExt[i]
			styles[name] = val
		})
		return Style(styles)
	}
}