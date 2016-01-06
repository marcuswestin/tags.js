(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
'use strict';

function _interopRequireWildcard(obj) {
	if (obj && obj.__esModule) {
		return obj;
	} else {
		var newObj = {};if (obj != null) {
			for (var key in obj) {
				if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
			}
		}newObj['default'] = obj;return newObj;
	}
}

function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { 'default': obj };
}

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _reactDom = require('react-dom');

var ReactDOM = _interopRequireWildcard(_reactDom);

var _srcIndex = require('../src/index');

var _srcTagsViews = require('../src/tags-views');

module.exports = require('../src/index');

(0, _srcIndex._bootstrap)(renderDOM, {
	View: 'div',
	Text: 'span',
	Image: 'img'
});

function renderDOM(ViewComponent, el) {
	if (!el) {
		el = document.body.appendChild(document.createElement('div'));
	}
	return ReactDOM.render(ViewComponent(), el);
}

// Functions specific to DOM environment
////////////////////////////////////////
module.exports.ExposeDOMGlobals = function (tagNames) {
	var tagNames = ('A,BR,BUTTON,DIV,FORM,H1,H2,H3,H4,H5,H6,HR,IFRAME,IMG,INPUT,LABEL,LI,OL,' + 'OPTION,OUTPUT,P,PRE,SPAN,TABLE,TBODY,TD,TEXTAREA,TFOOT,TH,THEAD,TR,U,UL').split(',');
	_lodash2['default'].each(tagNames, function (tagName) {
		exposeGlobalTagName(tagName);
	});
};

function exposeGlobalTagName(tagName) {
	console.log("tags/bootstraps/dom-bootstrap.js: EXPOSING GLOBAL VARIABLE", tagName);
	global[tagName] = (0, _srcTagsViews.CreateViewFactory)(tagName);
}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../src/index":2,"../src/tags-views":7,"lodash":undefined,"react-dom":undefined}],2:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});
exports.ViewComponent = ViewComponent;
exports.ExposeGlobals = ExposeGlobals;
exports._bootstrap = _bootstrap;

function _interopExportWildcard(obj, defaults) {
	var newObj = defaults({}, obj);delete newObj['default'];return newObj;
}

function _defaults(obj, defaults) {
	var keys = Object.getOwnPropertyNames(defaults);for (var i = 0; i < keys.length; i++) {
		var key = keys[i];var value = Object.getOwnPropertyDescriptor(defaults, key);if (value && value.configurable && obj[key] === undefined) {
			Object.defineProperty(obj, key, value);
		}
	}return obj;
}

function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { 'default': obj };
}

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _tagsViews = require('./tags-views');

var _srcTagsFlexbox = require('../src/tags-flexbox');

var _tagsFlexbox = require('./tags-flexbox');

_defaults(exports, _interopExportWildcard(_tagsFlexbox, _defaults));

var _tagsFonts = require('./tags-fonts');

_defaults(exports, _interopExportWildcard(_tagsFonts, _defaults));

var _tagsHelpers = require('./tags-helpers');

_defaults(exports, _interopExportWildcard(_tagsHelpers, _defaults));

var _tagsStyles = require('./tags-styles');

_defaults(exports, _interopExportWildcard(_tagsStyles, _defaults));

_defaults(exports, _interopExportWildcard(_tagsViews, _defaults));

function ViewComponent(args) {
	return _react2['default'].createFactory(_react2['default'].createClass(args));
}

function ExposeGlobals() {
	_lodash2['default'].each(module.exports, exposeGlobal);
}

function exposeGlobal(value, key) {
	var exclude = {
		Render: true,
		LoadFont: true
	};
	if (exclude[key]) {
		return;
	}
	if (!/^[A-Z]/.test(key[0])) {
		return;
	}
	console.log("tags.js: EXPOSING GLOBAL VARIABLE", key);
	global[key] = value;
}

function _bootstrap(RenderFn, views) {
	module.exports.Render = RenderFn;
	_lodash2['default'].each(views, function (viewSpecifier, viewName) {
		module.exports[viewName] = (0, _tagsViews.CreateViewFactory)(viewSpecifier);
	});
	var defaultViewName = _lodash2['default'].first(_lodash2['default'].keys(views));
	(0, _srcTagsFlexbox._setViewFn)(module.exports[defaultViewName]);
}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../src/tags-flexbox":3,"./tags-flexbox":3,"./tags-fonts":4,"./tags-helpers":5,"./tags-styles":6,"./tags-views":7,"lodash":undefined,"react":undefined,"react-dom":undefined}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});
exports.Row = Row;
exports.Col = Col;
exports.RowReverse = RowReverse;
exports.ColReverse = ColReverse;
exports.Wrap = Wrap;
exports.WrapReverse = WrapReverse;
exports.JustifyContent = JustifyContent;
exports.AlignItems = AlignItems;
exports.AlignContent = AlignContent;
exports.Order = Order;
exports.Fix = Fix;
exports.Flex = Flex;
exports.AlignSelf = AlignSelf;
exports._setViewFn = _setViewFn;

var _tagsStyles = require('./tags-styles');

var ViewFn = null;

// Flex Containers
//////////////////

function Row() {
	var styles = (0, _tagsStyles.Style)({ display: 'flex', flexDirection: 'row' });
	return ViewFn(styles, arguments);
}

function Col() {
	var styles = (0, _tagsStyles.Style)({ display: 'flex', flexDirection: 'column' });
	return ViewFn(styles, arguments);
}

function RowReverse() {
	var styles = (0, _tagsStyles.Style)({ display: 'flex', flexDirection: 'row-reverse' });
	return ViewFn(styles, arguments);
}

function ColReverse() {
	var styles = (0, _tagsStyles.Style)({ display: 'flex', flexDirection: 'col-reverse' });
	return ViewFn(styles, arguments);
}

// Flex Container properties
////////////////////////////
// true, false, 'wrap-reverse'

function Wrap(flexWrap) {
	if (flexWrap == undefined) {
		flexWrap = true;
	}
	return (0, _tagsStyles.Style)({ flexWrap: flexWrap });
}

// wrap-reverse

function WrapReverse() {
	return Wrap('wrap-reverse');
}

// 'flex-start/flex-end/center/space-between/space-around'

function JustifyContent(justifyContent) {
	return (0, _tagsStyles.Style)({ justifyContent: justifyContent });
}

// 'stretch/flex-start/flex-end/center/baseline'

function AlignItems(alignItems) {
	return (0, _tagsStyles.Style)({ alignItems: alignItems });
}

// 'stretch/flex-start/flex-end/space-between/space-around'

function AlignContent(alignContent) {
	return (0, _tagsStyles.Style)({ alignContent: alignContent });
}

// Flex Item properties
///////////////////////
// 0, 1, ...2,

function Order(order) {
	return (0, _tagsStyles.Style)({ order: order });
}

// Nothing => Flex(0,0,'auto'), 100 => Flex(0,0,100)

function Fix(fix) {
	if (fix == undefined) {
		fix = 'auto';
	}
	return Flex(0, 0, fix);
}

// Nothing => { flex:'0 1 auto' }, Flex(1,0.5,100) => { flex:'1 0.5 100px' }

function Flex(flexGrow, flexShrink, flexBasis) {
	return (0, _tagsStyles.Style)({ flexGrow: flexGrow, flexShrink: flexShrink, flexBasis: flexBasis });
}

// 'auto/flex-start/flex-end/center/baseline/stretch'

function AlignSelf(alignSelf) {
	return (0, _tagsStyles.Style)({ alignSelf: alignSelf });
}

// Internal
///////////

function _setViewFn(_ViewFn) {
	ViewFn = _ViewFn;
}

},{"./tags-styles":6}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});
exports.LoadFont = LoadFont;

function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { 'default': obj };
}

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

},{"./tags-styles":6,"lodash":undefined,"webfontloader":undefined}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { 'default': obj };
}

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

},{"lodash":undefined}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});
exports.Style = Style;

function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { 'default': obj };
}

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

},{"lodash":undefined}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});
exports.CreateViewFactory = CreateViewFactory;

function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { 'default': obj };
}

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

// viewSpecifier is 'div/span/a/input/etc' for react-dom,
// and React.View/React.Text/React.ScrollView for react-native

function CreateViewFactory(viewSpecifier) {
	return function () {
		var props = { style: {} };
		var children = [];
		_lodash2['default'].each(arguments, processArg);
		function processArg(val) {
			if (_isReactObj(val)) {
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
		return _react2['default'].createElement.apply(_react2['default'], [viewSpecifier, props].concat(children));
	};
}

function _checkKeys(expected, received) {
	var receivedKeys = _lodash2['default'].keys(received).sort().join(', ');
	var expectedKeys = _lodash2['default'].keys(expected).sort().join(', ');
	if (receivedKeys != expectedKeys) {
		throw new Error('Bad keys. Expected: ' + expectedKeys + '. Received: ' + receivedKeys);
	}
	_lodash2['default'].each(expected, function (val, key) {
		if (!_lodash2['default'].isObject(val)) {
			return;
		}
		_checkKeys(expected[key], received[key]);
	});
}

function _isReactObj(arg) {
	return arg && !!(arg['$$typeof'] || // v0.14.0
	arg._isReactElement) // v0.13.3.0
	;
}

},{"lodash":undefined,"react":undefined}]},{},[1]);
