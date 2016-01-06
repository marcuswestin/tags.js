(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});
exports.MakeTag = MakeTag;
exports.MakeTags = MakeTags;
exports.ExposeDOMGlobals = ExposeDOMGlobals;

function _interopExportWildcard(obj, defaults) { var newObj = defaults({}, obj); delete newObj['default']; return newObj; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var ReactDOM = _interopRequireWildcard(_reactDom);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _srcIndex = require('../src/index');

var _srcTagsWrapEnv = require('../src/tags-wrap-env');

var tagsWrapEnv = _interopRequireWildcard(_srcTagsWrapEnv);

var _srcTagsStyles = require('../src/tags-styles');

var tagsStyles = _interopRequireWildcard(_srcTagsStyles);

var _srcTagsHelpers = require('../src/tags-helpers');

var tagsHelpers = _interopRequireWildcard(_srcTagsHelpers);

_defaults(exports, _interopExportWildcard(_srcIndex, _defaults));

tagsWrapEnv._wrapEnvFunctions({
	View: function View() {
		return div.apply(this, arguments);
	},
	TextView: function TextView() {
		return span.apply(this, arguments);
	},
	ImageView: function ImageView() {
		return img.apply(this, arguments);
	},
	ListView: function ListView() {
		return div.apply(this, arguments);
	},
	OnTap: function OnTap(handleTap) {
		return { onClick: handleTap };
	},
	MountApp: function MountApp(ReactView, el) {
		if (!el) {
			el = document.body.appendChild(document.createElement('div'));
		}
		ReactDOM.render(ReactView(), el);
	}
});

// Functions specific to DOM environment
////////////////////////////////////////

function MakeTag(tagName) {
	return makeWebTagFactory(tagName);
}

function MakeTags(tags) {
	return _lodash2['default'].map(tags, MakeTag);
}

function ExposeDOMGlobals(tagNames) {
	var tagNames = ('a,br,button,div,form,h1,h2,h3,h4,h5,h6,hr,iframe,img,input,label,li,ol,' + 'option,output,p,pre,span,table,tbody,td,textarea,tfoot,th,thead,tr,u,ul').split(',');
	_lodash2['default'].each(tagNames, function (tagName) {
		exposeGlobalTagName(tagName.toUpperCase());
	});
}

function exposeGlobalTagName(tagName) {
	console.log("tags/bootstraps/dom-bootstrap.js: EXPOSING GLOBAL VARIABLE", tagName);
	global[tagName] = makeWebTagFactory(tagName);
}

// Internal
///////////

var div = makeWebTagFactory('div');
var span = makeWebTagFactory('span');
var a = makeWebTagFactory('a');

function makeWebTagFactory(tagName) {
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
		return _react2['default'].createElement.call(_react2['default'], tagName, props, children);
	};
}

function isReactObj(arg) {
	return arg && !!(arg['$$typeof'] || // v0.14.0
	arg._isReactElement) // v0.13.3.0
	;
}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../src/index":2,"../src/tags-helpers":5,"../src/tags-styles":6,"../src/tags-wrap-env":7,"lodash":undefined,"react":undefined,"react-dom":undefined}],2:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});
exports.ViewComponent = ViewComponent;
exports.ExposeGlobals = ExposeGlobals;

function _interopExportWildcard(obj, defaults) { var newObj = defaults({}, obj); delete newObj['default']; return newObj; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _tagsFlexbox = require('./tags-flexbox');

_defaults(exports, _interopExportWildcard(_tagsFlexbox, _defaults));

var _tagsFonts = require('./tags-fonts');

_defaults(exports, _interopExportWildcard(_tagsFonts, _defaults));

var _tagsHelpers = require('./tags-helpers');

_defaults(exports, _interopExportWildcard(_tagsHelpers, _defaults));

var _tagsStyles = require('./tags-styles');

_defaults(exports, _interopExportWildcard(_tagsStyles, _defaults));

var _tagsWrapEnv = require('./tags-wrap-env');

_defaults(exports, _interopExportWildcard(_tagsWrapEnv, _defaults));

function ViewComponent(args) {
	return _react2['default'].createFactory(_react2['default'].createClass(args));
}

function ExposeGlobals() {
	var exclude = {
		_wrapEnvFunctions: true,
		MountApp: true,
		LoadFont: true
	};
	_lodash2['default'].each(module.exports, function (value, key) {
		if (exclude[key]) {
			return;
		}
		console.log("tags.js: EXPOSING GLOBAL VARIABLE", key);
		global[key] = value;
	});
}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./tags-flexbox":3,"./tags-fonts":4,"./tags-helpers":5,"./tags-styles":6,"./tags-wrap-env":7,"lodash":undefined,"react":undefined,"react-dom":undefined}],3:[function(require,module,exports){
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

var _tagsStyles = require('./tags-styles');

var _tagsWrapEnv = require('./tags-wrap-env');

// Flex Containers
//////////////////

function Row() {
	var styles = (0, _tagsStyles.Style)({ display: 'flex', flexDirection: 'row' });
	return (0, _tagsWrapEnv.View)(styles, arguments);
}

function Col() {
	var styles = (0, _tagsStyles.Style)({ display: 'flex', flexDirection: 'column' });
	return (0, _tagsWrapEnv.View)(styles, arguments);
}

function RowReverse() {
	var styles = (0, _tagsStyles.Style)({ display: 'flex', flexDirection: 'row-reverse' });
	return (0, _tagsWrapEnv.View)(styles, arguments);
}

function ColReverse() {
	var styles = (0, _tagsStyles.Style)({ display: 'flex', flexDirection: 'col-reverse' });
	return (0, _tagsWrapEnv.View)(styles, arguments);
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

},{"./tags-styles":6,"./tags-wrap-env":7}],4:[function(require,module,exports){
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

},{"./tags-styles":6,"lodash":undefined,"webfontloader":undefined}],5:[function(require,module,exports){
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

},{"lodash":undefined}],6:[function(require,module,exports){
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

},{"lodash":undefined}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});
exports.View = View;
exports.TextView = TextView;
exports.ImageView = ImageView;
exports.ListView = ListView;
exports.OnTap = OnTap;
exports.MountApp = MountApp;
exports._wrapEnvFunctions = _wrapEnvFunctions;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

// Required env wrapper functions

function View() {
	return envWrapper.View.apply(this, arguments);
}

function TextView() {
	return envWrapper.Text.apply(this, arguments);
}

function ImageView() {
	return envWrapper.Image.apply(this, arguments);
}

function ListView() {
	return envWrapper.ListView.apply(this, arguments);
}

function OnTap() {
	return envWrapper.OnTap.apply(this, arguments);
}

function MountApp() {
	return envWrapper.MountApp.apply(this, arguments);
}

// Internal
///////////

var envWrapper;
// exported for access from bootstraps/*-bootstrap.js

function _wrapEnvFunctions(_envWrapper) {
	var wrapperKeys = _lodash2['default'].keys(_envWrapper).sort().join(', ');
	var expectedKeys = 'ImageView, ListView, MountApp, OnTap, TextView, View';
	if (wrapperKeys != expectedKeys) {
		throw new Error('Bad env wrapper. Expected: ' + expectedKeys + '. Received: ' + wrapperKeys);
	}
	envWrapper = _envWrapper;
}

},{"lodash":undefined}]},{},[1]);
