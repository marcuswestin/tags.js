import _ from 'lodash'
import { addStyleDefaults } from './tags-style-defaults'
import randomColor from './util/randomColor'

export var OnClick = attrFunction('onClick')
export var OnKeyPress = attrFunction('onKeyPress')
export var OnChange = attrFunction('onChange')
export var OnPress = attrFunction('onPress')

export var Map = wrap(function(items, fn) {
	return _.map(items, fn, this)
})

// List(items, renderItemFn)
// List(items, renderEmptyFn, renderItemFn)
export function List(items, renderEmptyFn, renderItemFn) {
	if (arguments.length == 2) {
		// No renderEmptyFn
		renderItemFn = renderEmptyFn
		renderEmptyFn = null
	}
	if (items != undefined && !_.isArray(items)) {
		throw new Error('List called with non-array items: '+items)
	}
	var isEmpty = (!items || items.length == 0)
	if (isEmpty && renderEmptyFn) {
		return renderEmptyFn.call(this)
	}
	return _.map(items, (val, i) => {
		var isFirst = (i == 0)
		var isLast = (i == items.length - 1)
		return renderItemFn(val, i, isFirst, isLast)
	})
}

export function renderRandomBackgrounds(shouldRender) {
	renderRandomBackgrounds.shouldRender = shouldRender
	if (renderRandomBackgrounds.initialized) {
		return
	}
	renderRandomBackgrounds.initialized = true
	setStyleDefaults(() => {
		if (renderRandomBackgrounds.shouldRender) {
			return { backgroundColor:randomColor() }
		} else {
			return null
		}
	})
}

export function setStyleDefaults(fn) {
	addStyleDefaults(fn)
}


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
