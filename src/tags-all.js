import React from 'react'
import { each, isFunction, isArray, isObject, isArguments, assign, first, keys } from 'lodash'
import {_setViewFn} from '../src/tags-flexbox'
	
export * from './tags-flexbox'
export * from './tags-helpers'
export * from './tags-styles'

// E.g createFactory('div') or createFactory('button') for react-dom,
// and createFactory(React.View) or createFactory(React.ScrollView) for react-native
export function createFactory(viewSpecifier) {
	return function() {
		var props = { style:{} }
		var children = []
		each(arguments, function processArg(val) {
			if (_isReactObj(val)) {
				children.push(val)
				
			} else if (isFunction(val)) {
				processArg(val(props, children))
				
			} else if (isArray(val) || isArguments(val)) {
				each(val, processArg)
				
			} else if (isObject(val)) {
				assign(props, val)
				
			} else if (val !== undefined) {
				children.push(val)
			}
		})
		return React.createElement(viewSpecifier, props, ...children)
	}
}

function _isReactObj(arg) {
	return arg && !!(
		arg['$$typeof'] || // v0.14.0
		arg._isReactElement // v0.13.3.0
	)
}

export function _bootstrap(views, renderFn) {
	module.exports.render = renderFn
	each(views, function(viewSpecifier, viewName) {
		module.exports[viewName] = createFactory(viewSpecifier)
	})
	var defaultViewName = first(keys(views))
	_setViewFn(module.exports[defaultViewName])
}
