import { each, mapValues, isObject, assign } from 'lodash'

var styleDefaultsFns = []
export function addStyleDefaults(fn) {
	styleDefaultsFns.push(fn)	
}

export function applyStyleDefaults(viewName, props) {
	if (!styleDefaultsFns.length) {
		return
	}
	if (typeof props.style == 'number') {
		console.warn("TODO: setStyleDefaults does not yet work with tags.StyleSheet")
		return
	}
	if (!props.style) {
		props.style = {}
	}
	var defaultStyles = {}
	each(styleDefaultsFns, (styleDefaultsFn) => {
		var newDefaultStyles = styleDefaultsFn(viewName)
		if (!newDefaultStyles) {
			return
		} else if (!isObject(newDefaultStyles)) {
			throw new Error('function passed in to setStyleDefaults return non-object value: '+newDefaultStyles)
		}
		assign(defaultStyles, newDefaultStyles)
	})
	if (!Object.isExtensible(props.style)) {
		props.style = mapValues(props.style, (val) => val) // copy
	}
	each(defaultStyles, (val, key) => {
		if (props.style[key] == undefined) {
			props.style[key] = val
		}
	})
}