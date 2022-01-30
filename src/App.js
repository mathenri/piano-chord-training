import React, { Component } from 'react';
import './App.css';
import { CHORDS } from './chords.js'
import { KEYS } from './pianoKeys.js'
import { NO_ANSWER, CORRECT, INCORRECT } from './constants.js'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      selectedKeys: [],
      askedChord: CHORDS[Math.floor(Math.random() * CHORDS.length)],
      lastChordCorrect: NO_ANSWER
    }

    this.validateChord = this.validateChord.bind(this)
    this.nextChord = this.nextChord.bind(this)
    this.toggleKey = this.toggleKey.bind(this)
  }

  validateChord() {
    const correct = this.state.askedChord.notes.join() === this.state.selectedKeys.join() ? CORRECT : INCORRECT
    this.setState({
      lastChordCorrect: correct
    })
  }

  nextChord() {
    const nextChord = CHORDS[Math.floor(Math.random() * CHORDS.length)]
    this.setState({
      askedChord: nextChord,
      lastChordCorrect: NO_ANSWER,
      selectedKeys: []
    })

  }

  toggleKey(keyId) {
    let { selectedKeys } = this.state
    if (!selectedKeys.includes(keyId)) {
      selectedKeys.push(keyId)
    } else {
      const index = selectedKeys.indexOf(keyId);
      if (index > -1) {
        selectedKeys.splice(index, 1);
      }
    }
    this.setState({selectedKeys})
  }

  render() {
    return (
      <div className="App">
        
        <p id="asked-chord">Chord: {this.state.askedChord.name}</p>

        <div id="keyboard">
          {KEYS.map(pianoKey => {
            let clazz = pianoKey.class
            if (this.state.selectedKeys.includes(pianoKey.id)) {
              clazz += " selected"
            } 
            return <div 
              className={clazz}
              id={pianoKey.id}
              key={pianoKey.id}
              onClick={() => this.toggleKey(pianoKey.id)}
            />
          })}
        </div>

        { this.state.lastChordCorrect !== CORRECT && <button onClick={this.validateChord}>Validate</button>}

        { this.state.lastChordCorrect !== NO_ANSWER && <p id="answer">{this.state.lastChordCorrect}</p>}

        { this.state.lastChordCorrect === CORRECT && <button onClick={this.nextChord}>Next chord!</button>}
      </div>
    );
  }
}

export default App;
