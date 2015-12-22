(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});
exports.LoadFont = LoadFont;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _webfontloader = require('webfontloader');

var _webfontloader2 = _interopRequireDefault(_webfontloader);

var _tagsStyles = require('./tags-styles');

/* An example. Font styles are given in FVD (https://github.com/typekit/fvd):
var Font = tags.LoadFont('Lato', 'n4', { Italic:'i4', Light:'n2' }, function(didLoad) {
	if (!didLoad) { alert("Could not load fonts") }
	div(Font(13), 'Regular Lato, size 13',
		div(Font.Italic(18), 'Italic Lato, size 18'),
		div(Font.Light(14), 'Light Lato, size 14')
	)
})
*/

function LoadFont(familyName, defaultStyleFVD, additionalNamedStyleFVDs, onDone) {
	var fvdSpecifiers = _lodash2['default'].map(additionalNamedStyleFVDs, function (specifier, _) {
		return specifier;
	});
	var fontsString = familyName + ':' + fvdSpecifiers.join(',');
	_webfontloader2['default'].load({
		active: function active() {
			onDone(true);
		},
		inactive: function inactive() {
			onDone(false);
		},
		google: {
			families: [familyName]
		}
	});

	var resultFontFn = makeFontFunctionFromFVD(familyName, defaultStyleFVD);
	_lodash2['default'].each(additionalNamedStyleFVDs, function (specifier, styleName) {
		resultFontFn[styleName] = makeFontFunctionFromFVD(familyName, specifier);
	});
	return resultFontFn;
}

var fvdStyles = { 'n': 'normal', 'i': 'italic', 'o': 'oblique' };
function makeFontFunctionFromFVD(fontFamily, styleFVD) {
	var fontStyle = fvdStyles[styleFVD[0]];
	var fontWeight = 100 * parseInt(styleFVD[1]);
	if (!fontStyle || !fontWeight) {
		throw new Error('Bad FVD: ' + styleFVD);
	}
	return function (fontSize) {
		return (0, _tagsStyles.Style)({ fontFamily: fontFamily, fontSize: fontSize, fontStyle: fontStyle, fontWeight: fontWeight });
	};
}

},{"./tags-styles":4,"lodash":undefined,"webfontloader":undefined}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var OnClick = attrFunction('onClick');
exports.OnClick = OnClick;
var OnKeyPress = attrFunction('onKeyPress');
exports.OnKeyPress = OnKeyPress;
var OnChange = attrFunction('onChange');

exports.OnChange = OnChange;
var Map = wrap(function (items, fn) {
	return _lodash2['default'].map(items, fn, this);
});

exports.Map = Map;
// Util
///////

function wrap(fn) {
	return function (props, children) {
		return fn.call(this, props, children);
	};
}

function attrFunction(attrName) {
	return function (attrValue) {
		var res = {};
		res[attrName] = attrValue;
		return res;
	};
}

},{"lodash":undefined}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});
exports.makeTag = makeTag;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function makeTag(tagName) {
	return function () {
		var props = { style: {} };
		var children = [];
		_lodash2['default'].each(arguments, processArg);
		function processArg(val) {
			if (isReactObj(val)) {
				children.push(val);
			} else if (_lodash2['default'].isFunction(val)) {
				processArg(val(props, children));
			} else if (_lodash2['default'].isArray(val) || _lodash2['default'].isArguments(val)) {
				_lodash2['default'].each(val, processArg);
			} else if (_lodash2['default'].isObject(val)) {
				_lodash2['default'].assign(props, val);
			} else if (val !== undefined) {
				children.push(val);
			}
		}
		var args = [tagName, props].concat(children);
		return _react2['default'].createElement.apply(_react2['default'], args);
	};
}

function isReactObj(arg) {
	return arg && !!(arg['$$typeof'] || // v0.14.0
	arg._isReactElement) // v0.13.3.0
	;
}

},{"lodash":undefined,"react":undefined}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});
exports.Style = Style;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var Width = styleFunction('width');
exports.Width = Width;
var Height = styleFunction('height');
exports.Height = Height;
var Background = styleFunction('background');
exports.Background = Background;
var Color = styleFunction('color');

exports.Color = Color;

function Style() {
	var args = arguments;
	return function (props, children) {
		_lodash2['default'].each(args, function (arg) {
			_lodash2['default'].each(arg, function (val, key) {
				props.style[key] = val;
			});
		});
	};
}

// Util
///////

function styleFunction(styleName) {
	return function (styleValue) {
		var res = {};
		res[styleName] = styleValue;
		return Style(res);
	};
}

},{"lodash":undefined}],5:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});
exports.makeTags = makeTags;
exports.exposeGlobals = exposeGlobals;

function _interopExportWildcard(obj, defaults) { var newObj = defaults({}, obj); delete newObj['default']; return newObj; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

var _tagsReact = require('./tags-react');

var tagsReact = _interopRequireWildcard(_tagsReact);

var _tagsStyles = require('./tags-styles');

var tagsStyles = _interopRequireWildcard(_tagsStyles);

var _tagsHelpers = require('./tags-helpers');

var tagsHelpers = _interopRequireWildcard(_tagsHelpers);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

_defaults(exports, _interopExportWildcard(_tagsReact, _defaults));

_defaults(exports, _interopExportWildcard(_tagsStyles, _defaults));

var _tagsFonts = require('./tags-fonts');

_defaults(exports, _interopExportWildcard(_tagsFonts, _defaults));

_defaults(exports, _interopExportWildcard(_tagsHelpers, _defaults));

function makeTags(tags) {
	return _lodash2['default'].map(tags, tagsReact.makeTag);
}

function exposeGlobals(tagNames) {
	if (!tagNames) {
		tagNames = ('a,br,button,div,form,h1,h2,h3,h4,h5,h6,hr,iframe,img,input,label,li,ol,' + 'option,output,p,pre,span,table,tbody,td,textarea,tfoot,th,thead,tr,u,ul').split(',');
	}
	_lodash2['default'].each(tagNames, function (tagName) {
		exposeGlobal(tagName, tagsReact.makeTag(tagName));
	});
	_lodash2['default'].each(tagsHelpers, exposeGlobal);
	_lodash2['default'].each(tagsStyles, exposeGlobal);
}

function exposeGlobal(name, value) {
	console.log("GLOBAL", name);
	global[name] = value;
}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./tags-fonts":1,"./tags-helpers":2,"./tags-react":3,"./tags-styles":4,"lodash":undefined}]},{},[5]);
