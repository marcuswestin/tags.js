// Don't change to `import * from`, since _bootstrap modifies module.exports
module.exports = require('./src/tags-all')

import ReactNative from 'react-native'
import {_bootstrap} from './src/tags-all'
import { each, map, isFunction, create } from 'lodash'

var CursorManager = require('react-native-macos').NativeModules.CursorManager
module.exports.Tappable = function(callback) {
	return {
		onPress: function() {
			callback()
		},
		onMouseEnter: function() {
			CursorManager.pointingHandCursor()
		},
		onMouseLeave: function() {
			CursorManager.arrowCursor()
		}
	}
}

class TagsStyleSheet {
	_isTagsStyleSheet () { return true }
	constructor(id) {
		this._tagsStyleSheetId = id
	}
}

module.exports.StyleSheet = create(ReactNative.StyleSheet, {
	create: function createStyleSheet(props) {
		var res = {}
		var reactStyles = ReactNative.StyleSheet.create(props)
		each(reactStyles, (styleSheetId, key) => {
			res[key] = new TagsStyleSheet(styleSheetId)
		})
		return res
	}
})

// These keys cause runtime warnings and errors when accessed (e.g
// `ReactNative.AppStateIOS` in react-native or
// `ReactNative.Navigator` in react-native-macos)
var avoidBadKeys = {
	// react-native:
	PushNotificationIOS: true, AppStateIOS: true, LinkingIOS: true,
	// react-native-macos:
	StatusBar: true, Navigator: true, TouchableHighlight: true,
}

_bootstrap(_getNativeComponents(avoidBadKeys), function renderNativeApp(AppComponent, name) {
	ReactNative.AppRegistry.registerComponent(name || 'TagsReactNativeApp', () => AppComponent);
})

function _getNativeComponents(avoidBadKeys) {
	var components = {}
	for (var name in ReactNative) {
		if (avoidBadKeys[name]) {
			continue
		}
		if (_isReactComponent(ReactNative[name])) {
			components[name] = ReactNative[name]
		}
	}
	
	components.Input = components.TextInput

	return components
}

function _isReactComponent(val) {
	return val.prototype && val.prototype.isReactComponent
}
