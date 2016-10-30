import _ from 'lodash'
import webfontloader from 'webfontloader'
import { Style } from './tags-styles'

/* An example. Font styles are given in FVD (https://github.com/typekit/fvd):
var Font = tags.loadFont('Lato', 'n4', { Italic:'i4', Light:'n2' }, function(didLoad) {
	if (!didLoad) { alert("Could not load fonts") }
	div(Font(13), 'Regular Lato, size 13',
		div(Font.Italic(18), 'Italic Lato, size 18'),
		div(Font.Light(14), 'Light Lato, size 14')
	)
})
*/
export function loadFont(familyName, defaultStyleFVD, additionalNamedStyleFVDs, onDone) {
	var fvdSpecifiers = _.map(additionalNamedStyleFVDs, (specifier, _) => specifier)
	var fontsString = familyName+':'+fvdSpecifiers.join(',')
	webfontloader.load({
		active: function() {
			onDone(true)
		},
		inactive: function() {
			onDone(false)
		},
		google: {
			families: [familyName],
		}
	})
	
	var resultFontFn = makeFontFunctionFromFVD(familyName, defaultStyleFVD)
	_.each(additionalNamedStyleFVDs, (specifier, styleName) => {
		resultFontFn[styleName] = makeFontFunctionFromFVD(familyName, specifier)
	})
	return resultFontFn
}

var fvdStyles = { 'n':'normal', 'i':'italic', 'o':'oblique' }
function makeFontFunctionFromFVD(fontFamily, styleFVD) {
	var fontStyle = fvdStyles[styleFVD[0]]
	var fontWeight = 100 * parseInt(styleFVD[1])
	if (!fontStyle || !fontWeight) {
		throw new Error('Bad FVD: '+styleFVD)
	}
	return function(fontSize) {
		return Style({ fontFamily:fontFamily, fontSize:fontSize, fontStyle:fontStyle, fontWeight:fontWeight })
	}
}