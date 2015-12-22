import _ from 'lodash'

export var Width = styleFunction('width')
export var Height = styleFunction('height')
export var Background = styleFunction('background')
export var Color = styleFunction('color')

export function Style() {
	var args = arguments
	return function (props, children) {
		_.each(args, function(arg) {
			_.each(arg, function(val, key) {
				props.style[key] = val
			})
		})
	}
}


// Util
///////

function styleFunction(styleName) {
	return function(styleValue) {
		var res = {}
		res[styleName] = styleValue
		return Style(res)
	}
}