import React from 'react'
import {_setViewFn} from '../src/tags-flexbox'
import { each, isFunction, isArray, isObject, isArguments, assign, first, keys } from 'lodash'

export * from './tags-flexbox'
export * from './tags-helpers'
export * from './tags-styles'

export function exposeGlobals() {
	each(module.exports, function exposeGlobal(value, key) {
		var exclude = {
			Render: true,
			LoadFont: true,
		}
		if (exclude[key]) { return }
		if (!/^[A-Z]/.test(key[0])) { return }
		console.log("tags.js: EXPOSING GLOBAL VARIABLE", key)
		global[key] = value
	})
}


// E.g createViewFactory('div') or createViewFactory('button') for react-dom,
// and createViewFactory(React.View) or createViewFactory(React.ScrollView) for react-native
export function createViewFactory(viewSpecifier) {
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


export function _bootstrap(RenderFn, views) {
	module.exports.Render = RenderFn
	each(views, function(viewSpecifier, viewName) {
		module.exports[viewName] = createViewFactory(viewSpecifier)
	})
	var defaultViewName = first(keys(views))
	_setViewFn(module.exports[defaultViewName])
}
