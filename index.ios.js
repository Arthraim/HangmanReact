/**
 * Sample React Native App
 * https://github.com/facebook/react-native
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

class GameObject {
  constructor() {
    this.playerId = 'arthur@strikingly.com';
    this.sessionId = null;
  }

  startGame(callback) {
    var requestBody = {
      playerId: this.playerId,
      action: "startGame"
    }
    this.fetchData(requestBody, (responseData) => {
      this.sessionId = responseData.sessionId
      if (callback) {
        callback(responseData)
      }
    })
  }

  giveMeAWord(callback) {
    var requestBody = {
      sessionId: this.sessionId,
      action: "nextWord"
    }
    this.fetchData(requestBody, callback)
  }

  makeAGuess(letter, callback) {
    var requestBody = {
      sessionId: this.sessionId,
      action: "guessWord",
      guess: letter
    }
    this.fetchData(requestBody, callback)
  }

  getYourResult(callback) {
    var requestBody = {
      sessionId: this.sessionId,
      action : "getResult"
    }
    this.fetchData(requestBody, callback)
  }

  submitYourResult(callback) {
    var requestBody = {
      sessionId: this.sessionId,
      action : "submitResult"
    }
    this.fetchData(requestBody, callback)
  }

  // private
  fetchData(requestBody, callback) {
    // url
    var requestUrl = 'https://strikingly-hangman.herokuapp.com/game/on';
    // request
    fetch(requestUrl, {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    })
    .then((response) => response.json())
    .then((responseData) => {
      if (callback) {
        callback(responseData);
      }
    })
  }
} // end class GameObject

var HangmanReact = React.createClass({
  getInitialState: function() {
    return {
      gameObject: null,
      word: '',
      numberOfWordsToGuess: 0,
      numberOfGuessAllowedForEachWord: 0,
      wrongGuessCountOfCurrentWord: 0,
      totalWordCount: 0,
      correctWordCount: 0,
      totalWrongGuessCount: 0,
      score: 0,
    };
  },
  componentDidMount: function() {
    // init gameObject
    var gObj = new GameObject()
    this.setState({gameObject: gObj})
    // start game
    gObj.startGame((responseData) => {
      console.log('start game done')
      console.log(responseData)
      this.setState(responseData.data)
      // get first word here
      gObj.giveMeAWord((responseData) => {
        console.log('give me a word')
        console.log(responseData)
        this.setState(responseData.data)
      })
    })
  },
  onPress: function(letter) {
    console.log('onPress', letter)
    this.state.gameObject.makeAGuess(letter, (responseData) => {
      this.setState(responseData.data)
    })
  },
  render: function() {
    return (
      <View style={styles.container}>
        <View style={styles.misc}>
          <Text>WORDS: {this.state.correctWordCount} | {this.state.totalWordCount} | {this.state.numberOfWordsToGuess}</Text>
          <Text>GUESSES: {this.state.wrongGuessCountOfCurrentWord} / {this.state.numberOfGuessAllowedForEachWord}</Text>
          <Text>totalWrongGuessCount {this.state.totalWrongGuessCount}</Text>
          <Text>score {this.state.score}</Text>
        </View>
        <View style={styles.wordContainer}>
          <Text style={styles.word}>{this.state.word}</Text>
        </View>
        <View style={styles.keyboardContainer}>
          <View style={styles.keyboard}>
            <View style={styles.keyboardRow}>
              <TouchableHighlight style={styles.key} onPress={this.onPress.bind(this, "Q")}><Text style={styles.keyText}>Q</Text></TouchableHighlight>
              <TouchableHighlight style={styles.key} onPress={this.onPress.bind(this, "W")}><Text style={styles.keyText}>W</Text></TouchableHighlight>
              <TouchableHighlight style={styles.key} onPress={this.onPress.bind(this, "E")}><Text style={styles.keyText}>E</Text></TouchableHighlight>
              <TouchableHighlight style={styles.key} onPress={this.onPress.bind(this, "R")}><Text style={styles.keyText}>R</Text></TouchableHighlight>
              <TouchableHighlight style={styles.key} onPress={this.onPress.bind(this, "T")}><Text style={styles.keyText}>T</Text></TouchableHighlight>
              <TouchableHighlight style={styles.key} onPress={this.onPress.bind(this, "Y")}><Text style={styles.keyText}>Y</Text></TouchableHighlight>
              <TouchableHighlight style={styles.key} onPress={this.onPress.bind(this, "U")}><Text style={styles.keyText}>U</Text></TouchableHighlight>
              <TouchableHighlight style={styles.key} onPress={this.onPress.bind(this, "I")}><Text style={styles.keyText}>I</Text></TouchableHighlight>
              <TouchableHighlight style={styles.key} onPress={this.onPress.bind(this, "O")}><Text style={styles.keyText}>O</Text></TouchableHighlight>
              <TouchableHighlight style={styles.key} onPress={this.onPress.bind(this, "P")}><Text style={styles.keyText}>P</Text></TouchableHighlight>
            </View>
            <View style={styles.keyboardRow}>
              <TouchableHighlight style={styles.key} onPress={this.onPress.bind(this, "A")}><Text style={styles.keyText}>A</Text></TouchableHighlight>
              <TouchableHighlight style={styles.key} onPress={this.onPress.bind(this, "S")}><Text style={styles.keyText}>S</Text></TouchableHighlight>
              <TouchableHighlight style={styles.key} onPress={this.onPress.bind(this, "D")}><Text style={styles.keyText}>D</Text></TouchableHighlight>
              <TouchableHighlight style={styles.key} onPress={this.onPress.bind(this, "F")}><Text style={styles.keyText}>F</Text></TouchableHighlight>
              <TouchableHighlight style={styles.key} onPress={this.onPress.bind(this, "G")}><Text style={styles.keyText}>G</Text></TouchableHighlight>
              <TouchableHighlight style={styles.key} onPress={this.onPress.bind(this, "H")}><Text style={styles.keyText}>H</Text></TouchableHighlight>
              <TouchableHighlight style={styles.key} onPress={this.onPress.bind(this, "J")}><Text style={styles.keyText}>J</Text></TouchableHighlight>
              <TouchableHighlight style={styles.key} onPress={this.onPress.bind(this, "K")}><Text style={styles.keyText}>K</Text></TouchableHighlight>
              <TouchableHighlight style={styles.key} onPress={this.onPress.bind(this, "L")}><Text style={styles.keyText}>L</Text></TouchableHighlight>
            </View>
            <View style={styles.keyboardRow}>
              <View style={styles.fakeKey}></View>
              <TouchableHighlight style={styles.key} onPress={this.onPress.bind(this, "Z")}><Text style={styles.keyText}>Z</Text></TouchableHighlight>
              <TouchableHighlight style={styles.key} onPress={this.onPress.bind(this, "X")}><Text style={styles.keyText}>X</Text></TouchableHighlight>
              <TouchableHighlight style={styles.key} onPress={this.onPress.bind(this, "C")}><Text style={styles.keyText}>C</Text></TouchableHighlight>
              <TouchableHighlight style={styles.key} onPress={this.onPress.bind(this, "V")}><Text style={styles.keyText}>V</Text></TouchableHighlight>
              <TouchableHighlight style={styles.key} onPress={this.onPress.bind(this, "B")}><Text style={styles.keyText}>B</Text></TouchableHighlight>
              <TouchableHighlight style={styles.key} onPress={this.onPress.bind(this, "N")}><Text style={styles.keyText}>N</Text></TouchableHighlight>
              <TouchableHighlight style={styles.key} onPress={this.onPress.bind(this, "M")}><Text style={styles.keyText}>M</Text></TouchableHighlight>
              <View style={styles.fakeKey}></View>
            </View>
          </View>
        </View>
      </View>
    );
  },
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#ffffff',
  },
  misc: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2ecc71',
  },
  wordContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eeeeee',
  },
  word: {
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 70,
  },
  keyboardContainer: {
    flex: 1,
  },
  keyboard: {
    flex: 1,
    flexDirection: 'column',
    margin: 3,
  },
  keyboardRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  key: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#bbbbbb',
    margin: 3,
  },
  keyText: {
    fontSize: 20,
  },
  fakeKey: {
    flex: 1,
    margin: 5,
  },
});

AppRegistry.registerComponent('HangmanReact', () => HangmanReact);
