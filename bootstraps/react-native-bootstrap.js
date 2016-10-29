// Don't change to `import * from`, since _bootstrap modifies module.exports
module.exports = require('../src/index')

import ReactNative from 'react-native'
import {_bootstrap} from '../src/index'

_bootstrap(renderNative, {
	View: ReactNative.View,
	Text: ReactNative.Text,
	Image: ReactNative.Image,
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