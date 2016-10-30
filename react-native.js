// Don't change to `import * from`, since _bootstrap modifies module.exports
var tags = module.exports = require('./src/tags-all')

import ReactNative from 'react-native'
import {_bootstrap} from './src/tags-all'
import { each, map, isFunction } from 'lodash'

// These keys cause runtime warnings and errors when accessed (e.g `ReactNative.AppStatIOS`)
var avoidBadKeys = { PushNotificationIOS: true, AppStateIOS: true, LinkingIOS: true }

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
	return components
}

function _isReactComponent(val) {
	return val.prototype && val.prototype.isReactComponent
}
