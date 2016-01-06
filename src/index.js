import _ from 'lodash'
import ReactDOM from 'react-dom'
import React from 'react'

export * from './tags-flexbox'
export * from './tags-fonts'
export * from './tags-helpers'
export * from './tags-styles'
export * from './tags-wrap-env'

export function ViewComponent(args) {
	return React.createFactory(React.createClass(args))
}

export function ExposeGlobals() {
	var exclude = {
		_wrapEnvFunctions: true,
		MountApp: true,
		LoadFont: true,
	}
	_.each(module.exports, function(value, key) {
		if (exclude[key]) { return }
		console.log("tags.js: EXPOSING GLOBAL VARIABLE", key)
		global[key] = value
	})
}
