import _ from 'lodash'

// Required env wrapper functions
export function View() {
	return envWrapper.View.apply(this, arguments)
}
export function TextView() {
	return envWrapper.Text.apply(this, arguments)
}
export function ImageView() {
	return envWrapper.Image.apply(this, arguments)
}
export function ListView() {
	return envWrapper.ListView.apply(this, arguments)
}
export function OnTap() {
	return envWrapper.OnTap.apply(this, arguments)
}
export function MountApp() {
	return envWrapper.MountApp.apply(this, arguments)
}

// Internal
///////////

var envWrapper
// exported for access from bootstraps/*-bootstrap.js
export function _wrapEnvFunctions(_envWrapper) {
	var wrapperKeys = _.keys(_envWrapper).sort().join(', ')
	var expectedKeys = 'ImageView, ListView, MountApp, OnTap, TextView, View'
	if (wrapperKeys != expectedKeys) {
		throw new Error('Bad env wrapper. Expected: '+expectedKeys+'. Received: '+wrapperKeys)
	}
	envWrapper = _envWrapper
}
