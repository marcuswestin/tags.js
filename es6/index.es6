export * from './tags-react'
export * from './tags-styles'
export * from './tags-fonts'
export * from './tags-helpers'

import * as tagsReact from './tags-react'
import * as tagsStyles from './tags-styles'
import * as tagsHelpers from './tags-helpers'

import _ from 'lodash'

export function makeTags(tags) {
	return _.map(tags, tagsReact.makeTag)
}

export function exposeGlobals(tagNames) {
	 if (!tagNames) {
	 	tagNames = ('a,br,button,div,form,h1,h2,h3,h4,h5,h6,hr,iframe,img,input,label,li,ol,'+
	 		'option,output,p,pre,span,table,tbody,td,textarea,tfoot,th,thead,tr,u,ul').split(',')
	 }
	 _.each(tagNames, function(tagName) {
	 	exposeGlobal(tagName, tagsReact.makeTag(tagName))
	 })
	 _.each(tagsHelpers, exposeGlobal)
	 _.each(tagsStyles, exposeGlobal)
}

function exposeGlobal(name, value) {
	console.log("GLOBAL", name)
	global[name] = value
}