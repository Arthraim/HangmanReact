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
    requestBody = {
      sessionId: this.sessionId,
      action: "nextWord"
    }
    this.fetchData(requestBody, callback)
  }

  makeAGuess(letter, callback) {
    requestBody = {
      sessionId: this.sessionId,
      action: "guessWord",
      guess: letter
    }
    this.fetchData(requestBody, callback)
  }

  getYourResult(callback) {
    requestBody = {
      sessionId: this.sessionId,
      action : "getResult"
    }
    this.fetchData(requestBody, callback)
  }

  submitYourResult(callback) {
    requestBody = {
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
