import React from 'react'
import { each, isFunction, assign, isArray, isObject, isArguments, first, keys } from 'lodash'
import {_setViewFn} from '../src/tags-flexbox'
	
export * from './tags-flexbox'
export * from './tags-helpers'
export * from './tags-styles'

// E.g createFactory('div') or createFactory('button') for react-dom,
// and createFactory(React.View) or createFactory(React.ScrollView) for react-native
export function createFactory(viewSpecifier) {
	return function() {
		var props = {}
		var children = []
		each(arguments, function processArg(val) {
			if (val === undefined) {
				return
				
			} else if (_isReactObj(val)) {
				children.push(val)
				
			} else if (val._isTagsStyleSheet) {
				if (!props.style) {
					props.style = [val._tagsStyleSheetId]
				} else if (!isArray(props.style)) {
					throw new Error('Cannot use both tags.Style and tags.StyleSheet on the same element')
				} else {
					props.style.push(val._tagsStyleSheetId)
				}
				
			} else if (val._isTagsStyleVal) {
				if (!props.style) {
					props.style = val._tagsStyleVal
				} else if (!isObject(props.style)) {
					throw new Error('Cannot use both tags.StyleSheet and tags.Style on the same element')
				} else {
					assign(props.style, val._tagsStyleVal)
				}
				
			} else if (isFunction(val)) {
				processArg(val(props, children))
				
			} else if (isArray(val) || isArguments(val)) {
				each(val, processArg)
				
			} else if (isObject(val)) {
				if (val.style && props.style) {
					throw new Error("Cannot use multiple style properties on the same element")
				}
				assign(props, val)
				
			} else {
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
