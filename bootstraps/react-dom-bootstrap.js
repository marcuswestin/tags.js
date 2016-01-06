export * from '../src/index'

import React from 'react'
import * as ReactDOM from 'react-dom'
import _ from 'lodash'
import {ExposeGlobals} from '../src/index'
import * as tagsWrapEnv from '../src/tags-wrap-env'
import * as tagsStyles from '../src/tags-styles'
import * as tagsHelpers from '../src/tags-helpers'

tagsWrapEnv._wrapEnvFunctions({
	View: function() {
		return div.apply(this, arguments)
	},
	TextView: function() {
		return span.apply(this, arguments)
	},
	ImageView: function() {
		return img.apply(this, arguments)
	},
	ListView: function() {
		return div.apply(this, arguments)
	},
	OnTap: function(handleTap) {
		return { onClick:handleTap }
	},
	MountApp: function(ReactView, el) {
		if (!el) {
			el = document.body.appendChild(document.createElement('div'))
		}
		ReactDOM.render(ReactView(), el)
	}
})

// Functions specific to DOM environment
////////////////////////////////////////
export function MakeTag(tagName) {
	return makeWebTagFactory(tagName)
}
export function MakeTags(tags) {
	return _.map(tags, MakeTag)
}
export function ExposeDOMGlobals(tagNames) {
	var tagNames = ('a,br,button,div,form,h1,h2,h3,h4,h5,h6,hr,iframe,img,input,label,li,ol,'+
		'option,output,p,pre,span,table,tbody,td,textarea,tfoot,th,thead,tr,u,ul').split(',')
	_.each(tagNames, function(tagName) {
		exposeGlobalTagName(tagName.toUpperCase())
	})
}

function exposeGlobalTagName(tagName) {
	console.log("tags/bootstraps/dom-bootstrap.js: EXPOSING GLOBAL VARIABLE", tagName)
	global[tagName] = makeWebTagFactory(tagName)
}

// Internal
///////////

var div = makeWebTagFactory('div')
var span = makeWebTagFactory('span')
var a = makeWebTagFactory('a')

function makeWebTagFactory(tagName) {
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
		return React.createElement.call(React, tagName, props, children)
	}
}

function isReactObj(arg) {
	return arg && !!(
		arg['$$typeof'] || // v0.14.0
		arg._isReactElement // v0.13.3.0
	)
}
