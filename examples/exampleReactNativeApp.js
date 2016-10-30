var Tags = require('../react-dom') // normally require('tags/react-dom')
var React = require('react')

var { Text, View, Style, Flex, Padding, TouchableHighlight, NavigatorIOS } = Tags

var MyScene = React.createClass({
  propTypes: {
    navigator: React.PropTypes.object.isRequired,
  },

  _onForward: function () {
    this.props.navigator.push({
      component: MyScene,
      title: 'Wee '+new Date().getTime()
    });
  },
  
  render: function () {
    return View(Padding(80, 20),
      Text('Current Scene: ', this.props.title),
      TouchableHighlight({ onPress:this._onForward }, Text('Tap me to load the next scene')),
    )
  },
  
})

var App = React.createClass({
  _handleNavigationRequest: function () {
    this.refs.nav.push({ component: MyScene, title: 'Genius', passProps: { myProp: 'genius' } })
  },

  render: function() {
    return NavigatorIOS(Flex(1), {
      ref:'nav',
      initialRoute: {
        component:MyScene,
        title:'Foo',
        passProps:{ myProp:'asd' },
        rightButtonTitle:'Add',
        onRightButtonPress: () => this._handleNavigationRequest()
      }
    })
  }
})

Tags.render(App)
