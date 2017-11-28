var tags = require('../react-native') // normally require('tags/react-native')
var React = require('react')
var createReactClass = require('create-react-class')

var { Text, View, Style, Flex, Padding, TouchableHighlight, NavigatorIOS } = tags

var MyScene = createReactClass({
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

var App = createReactClass({
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

tags.renderApp(App)
