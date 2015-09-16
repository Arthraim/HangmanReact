/**
 * Hangman React Native App
 */
'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  AlertIOS,
  TouchableHighlight,
} = React;

var GameObject = require('./game')
var GameUI = require('./game_ui')

var HangmanReact = React.createClass({
  render: function() {
    return (
      <GameUI />
    );
  },
});

AppRegistry.registerComponent('HangmanReact', () => HangmanReact);
