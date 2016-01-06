import _ from 'lodash'
import ReactDOM from 'react-dom'
import React from 'react'
import {CreateViewFactory} from './tags-views'
import {_setViewFn} from '../src/tags-flexbox'

export * from './tags-flexbox'
export * from './tags-fonts'
export * from './tags-helpers'
export * from './tags-styles'
export * from './tags-views'

export function ViewComponent(args) {
	return React.createFactory(React.createClass(args))
}

export function ExposeGlobals() {
	_.each(module.exports, exposeGlobal)
}

function exposeGlobal(value, key) {
	var exclude = {
		Render: true,
		LoadFont: true,
	}
	if (exclude[key]) { return }
	if (!/^[A-Z]/.test(key[0])) { return }
	console.log("tags.js: EXPOSING GLOBAL VARIABLE", key)
	global[key] = value
}

export function _bootstrap(RenderFn, views) {
	module.exports.Render = RenderFn
	_.each(views, function(viewSpecifier, viewName) {
		module.exports[viewName] = CreateViewFactory(viewSpecifier)
	})
	var defaultViewName = _.first(_.keys(views))
	_setViewFn(module.exports[defaultViewName])
}
