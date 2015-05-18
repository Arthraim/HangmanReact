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
      attemptedLetters: [],
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
        // clear attempted letters
        this.setState({attemptedLetters:[]})
      })
    })
  },
  onPress: function(letter) {
    console.log('onPress', letter)
    if (this.state.attemptedLetters.indexOf(letter) > -1) {
      console.log('you have guessed', letter)
      return;
    }
    this.state.gameObject.makeAGuess(letter, (responseData) => {
      var array = this.state.attemptedLetters
      array.push(letter)
      this.setState({attemptedLetters: array})
      this.setState(responseData.data)
      // reach limit of guess times for single word
      if (this.state.wrongGuessCountOfCurrentWord > 0
          && this.state.numberOfGuessAllowedForEachWord > 0
          && this.state.wrongGuessCountOfCurrentWord == this.state.numberOfGuessAllowedForEachWord) {
        // get next word
        this.state.gameObject.giveMeAWord((responseData) => {
          console.log('give me another word')
          console.log(responseData)
          this.setState(responseData.data)
        })
        // reach limit of words
        if (this.state.numberOfWordsToGuess > 0
            && this.state.totalWordCount > 0
            && this.state.numberOfWordsToGuess == this.state.totalWordCount) {
          // udpate score
          this.state.gameObject.getYourResult((responseData) => {
            this.setState(responseData.data)
          })
        }
      }
    })
  },
  render: function() {
    return (
      <View style={styles.container}>
        <View style={styles.misc}>
          <View style={styles.miscSectionHeader}><Text style={styles.miscSectionHeaderText}>WORDS</Text></View>
          <View style={styles.miscNumbersRow}>
            {this.renderMiscNumber('Correct', this.state.correctWordCount)}
            {this.renderMiscNumber('Guessed', this.state.totalWordCount)}
            {this.renderMiscNumber('Total', this.state.numberOfWordsToGuess)}
          </View>
          <View style={styles.miscSectionHeader}><Text style={styles.miscSectionHeaderText}>GUESSES</Text></View>
          <View style={styles.miscNumbersRow}>
            {this.renderMiscNumber('Wrong', this.state.wrongGuessCountOfCurrentWord)}
            {this.renderMiscNumber('Total', this.state.numberOfGuessAllowedForEachWord)}
          </View>
          {this.renderScore()}
        </View>
        <View style={styles.wordContainer}>
          <Text style={styles.word}>{this.state.word}</Text>
        </View>
        <View style={styles.keyboardContainer}>
          <View style={styles.keyboard}>
            <View style={styles.keyboardRow}>
              {this.renderKey('Q')}
              {this.renderKey('W')}
              {this.renderKey('E')}
              {this.renderKey('R')}
              {this.renderKey('T')}
              {this.renderKey('Y')}
              {this.renderKey('U')}
              {this.renderKey('I')}
              {this.renderKey('O')}
              {this.renderKey('P')}
            </View>
            <View style={styles.keyboardRow}>
              {this.renderKey('A')}
              {this.renderKey('S')}
              {this.renderKey('D')}
              {this.renderKey('F')}
              {this.renderKey('G')}
              {this.renderKey('H')}
              {this.renderKey('J')}
              {this.renderKey('K')}
              {this.renderKey('L')}
            </View>
            <View style={styles.keyboardRow}>
              <View style={styles.fakeKey}></View>
              {this.renderKey('Z')}
              {this.renderKey('X')}
              {this.renderKey('C')}
              {this.renderKey('V')}
              {this.renderKey('B')}
              {this.renderKey('N')}
              {this.renderKey('M')}
              <View style={styles.fakeKey}></View>
            </View>
          </View>
        </View>
      </View>
    );
  },
  renderMiscNumber: function(title, number) {
    return (
      <View style={styles.miscNumber}>
        <Text style={styles.miscTitle}>{title}</Text>
        <Text style={styles.miscBigNumber}>{number}</Text>
      </View>
    );
  },
  renderScore: function() {
    if (this.state.totalWrongGuessCount > 0) {
      return (
        <View>
          <Text>totalWrongGuessCount {this.state.totalWrongGuessCount}</Text>
          <Text>score {this.state.score}</Text>
        </View>
      );
    }
  },
  renderKey: function(letter) {
    if (this.state.attemptedLetters.indexOf(letter) > -1) {
      return (
        <View style={styles.keyDisabled}><Text style={styles.keyText}>{letter}</Text></View>
      );
    } else {
      return (
        <TouchableHighlight underlayColor='#dddddd' style={styles.key} onPress={this.onPress.bind(this, letter)}><Text style={styles.keyText}>{letter}</Text></TouchableHighlight>
      );
    }
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    marginTop: 20,
  },
  misc: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#2ecc71',
    padding: 10,
  },
  miscSectionHeader: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#27ae60'
  },
  miscSectionHeaderText: {
    fontSize: 18,
    color: '#ffffff',
    marginLeft: 15,
  },
  miscNumbersRow: {
    flex: 1,
    flexDirection: 'row',
  },
  miscNumber: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  miscTitle: {
    color: '#555555',
  },
  miscBigNumber: {
    fontSize: 30,
    color: '#111111',
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
  keyDisabled: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ffffff',
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
