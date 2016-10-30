import { each } from 'lodash'

export var Width = _styleFunction('width')
export var Height = _styleFunction('height')
export var Background = _styleFunction('background')
export var Color = _styleFunction('color')
export var Padding = _topRigBotLefStyleFunction('padding')
export var Margin = _topRigBotLefStyleFunction('margin')

export function Style(styles) {
	return function (props, children) {
		each(styles, function(val, key) {
			props.style[key] = val
		})
	}
}


// Util
///////

function _styleFunction(styleName) {
	return function(styleValue) {
		var res = {}
		res[styleName] = styleValue
		return Style(res)
	}
}

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