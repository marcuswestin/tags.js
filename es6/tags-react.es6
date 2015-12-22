import React from 'react'
import _ from 'lodash'

export function makeTag(tagName) {
	return function() {
		var props = { style:{} }
		var children = []
		_.each(arguments, processArg)
		function processArg(val) {
			if (isReactObj(val)) {
				children.push(val)
				
			} else if (_.isFunction(val)) {
				processArg(val(props, children))
				
			} else if (_.isArray(val) || _.isArguments(val)) {
				_.each(val, processArg)
				
			} else if (_.isObject(val)) {
				_.assign(props, val)
				
			} else if (val !== undefined) {
				children.push(val)
			}
		}
		var args = [tagName, props].concat(children)
		return React.createElement.apply(React, args)
	}
}

function isReactObj(arg) {
	return arg && !!(
		arg['$$typeof'] || // v0.14.0
		arg._isReactElement // v0.13.3.0
	)
}
