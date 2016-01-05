import _ from 'lodash'

export var OnClick = attrFunction('onClick')
export var OnKeyPress = attrFunction('onKeyPress')
export var OnChange = attrFunction('onChange')

export var Map = wrap(function(items, fn) {
	return _.map(items, fn, this)
})


// Util
///////

function wrap(fn) {
	return function(props, children) {
		return fn.call(this, props, children)
	}
}

function attrFunction(attrName) {
	return function(attrValue) {
		var res = {}
		res[attrName] = attrValue
		return res
	}
}
