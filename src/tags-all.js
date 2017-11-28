var React = require('react')
var { each, isFunction, assign, isArray, isObject, isArguments } = require('lodash')
var {_setViewFn} = require('./tags-flexbox')
var { applyStyleDefaults } = require('./tags-style-defaults')

module.exports = {
	createFactory: createFactory,
	// private
	_bootstrap: _bootstrap,
}

each(require('./tags-flexbox'), function(val, key) {
	module.exports[key] = val
})
each(require('./tags-helpers'), function(val, key) {
	module.exports[key] = val
})
each(require('./tags-styles'), function(val, key) {
	module.exports[key] = val
})

// E.g createFactory('div') or createFactory('button') for react-dom,
// and createFactory(React.View) or createFactory(React.ScrollView) for react-native
function createFactory(viewSpecifier, viewName) {
	return function() {
		var props = {}
		var children = []
		each(arguments, function processArg(val) {
			if (val === undefined || val === null || val === true || val === false) {
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
				} else if (val.__value) {
					// TODO: expose canonical way for autoreact to play well with tags.js
					processArg(val.__value)
				} else {
					assign(props, val)
				}
				
			} else {
				children.push(val)
			}
		})
		applyStyleDefaults(viewName, props)
		return React.createElement(viewSpecifier, props, ...children)
	}
}

function _isReactObj(arg) {
	return arg && !!(
		arg['$$typeof'] || // v0.14.0
		arg._isReactElement // v0.13.3.0
	)
}

function _bootstrap(views, renderFn) {
	module.exports.renderApp = renderFn
	each(views, function(viewSpecifier, viewName) {
		module.exports[viewName] = createFactory(viewSpecifier, viewName)
	})
	_setViewFn(module.exports.View)
}
