import _ from 'lodash'
import React from 'react'

// viewSpecifier is 'div/span/a/input/etc' for react-dom,
// and React.View/React.Text/React.ScrollView for react-native
export function CreateViewFactory(viewSpecifier) {
	return function() {
		var props = { style:{} }
		var children = []
		_.each(arguments, processArg)
		function processArg(val) {
			if (_isReactObj(val)) {
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
		return React.createElement(viewSpecifier, props, ...children)
	}
}

function _checkKeys(expected, received) {
	var receivedKeys = _.keys(received).sort().join(', ')
	var expectedKeys = _.keys(expected).sort().join(', ')
	if (receivedKeys != expectedKeys) {
		throw new Error('Bad keys. Expected: '+expectedKeys+'. Received: '+receivedKeys)
	}
	_.each(expected, function(val, key) {
		if (!_.isObject(val)) { return }
		_checkKeys(expected[key], received[key])
	})
}

function _isReactObj(arg) {
	return arg && !!(
		arg['$$typeof'] || // v0.14.0
		arg._isReactElement // v0.13.3.0
	)
}