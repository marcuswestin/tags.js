module.exports = require('../src/index')

import * as ReactNativeDesktop from 'react-native-desktop'
import {_bootstrap} from '../src/index'

_bootstrap(renderNative, {
	View: ReactNativeDesktop.View,
	Text: ReactNativeDesktop.Text,
	Image: ReactNativeDesktop.Image,
})

function renderNative(ViewComponent, name) {
	if (!name) {
		name = 'TagsReactNativeDesktopApp'
	}
	AppRegistry.registerComponent(name, () => ViewComponent);
}

// Functions specific to native environment
///////////////////////////////////////////

// ...