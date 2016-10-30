// Don't change to `import * from`, since _bootstrap modifies module.exports
module.exports = require('./src/tags-all')

import ReactNative from 'react-native'
import {_bootstrap} from './src/tags-all'

_bootstrap(_renderNative, {
	View: ReactNative.View,
	Text: ReactNative.Text,
	Image: ReactNative.Image,
})

function _renderNative(ViewComponent, name) {
	if (!name) {
		name = 'TagsReactNativeApp'
	}
	AppRegistry.registerComponent(name, () => ViewComponent);
}

// Functions specific to native environment
///////////////////////////////////////////

// ...
