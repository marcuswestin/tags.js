import {Style} from './tags-styles'

var ViewFn = null

// Flex Containers
//////////////////
export function Row() {
	var styles = Style({ display:'flex', flexDirection:'row' })
	return ViewFn(styles, arguments)
}
export function Col() {
	var styles = Style({ display:'flex', flexDirection:'column' })
	return ViewFn(styles, arguments)
}
export function RowReverse() {
	var styles = Style({ display:'flex', flexDirection:'row-reverse' })
	return ViewFn(styles, arguments)
}
export function ColReverse() {
	var styles = Style({ display:'flex', flexDirection:'col-reverse' })
	return ViewFn(styles, arguments)
}

// Flex Container properties
////////////////////////////
// true, false, 'wrap-reverse'
export function Wrap(flexWrap) {
	if (flexWrap == undefined) { flexWrap = true }
	return Style({ flexWrap:flexWrap })
}
// wrap-reverse
export function WrapReverse() {
	return Wrap('wrap-reverse')
}
// 'flex-start/flex-end/center/space-between/space-around'
export function JustifyContent(justifyContent) {
	return Style({ justifyContent:justifyContent })
}
// 'stretch/flex-start/flex-end/center/baseline'
export function AlignItems(alignItems) {
	return Style({ alignItems:alignItems })
}
// 'stretch/flex-start/flex-end/space-between/space-around'
export function AlignContent(alignContent) {
	return Style({ alignContent:alignContent })
}

// Flex Item properties
///////////////////////
// 0, 1, ...2, 
export function Order(order) {
	return Style({ order:order })
}
// Nothing => Flex(0,0,'auto'), 100 => Flex(0,0,100)
export function Fix(fix) {
	if (fix == undefined) { fix = 'auto' }
	return Flex(0,0,fix)
}
// Nothing => { flex:'0 1 auto' }, Flex(1,0.5,100) => { flex:'1 0.5 100px' }
export function Flex(flexGrow, flexShrink, flexBasis) {
	return Style({ flexGrow:flexGrow, flexShrink:flexShrink, flexBasis:flexBasis })
}
// 'auto/flex-start/flex-end/center/baseline/stretch'
export function AlignSelf(alignSelf) {
	return Style({ alignSelf:alignSelf })
}

// Internal
///////////

export function _setViewFn(_ViewFn) {
	ViewFn = _ViewFn
}
