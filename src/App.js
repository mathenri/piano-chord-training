import React, { Component } from 'react';
import './App.css';
import { CHORDS } from './chords.js'
import { KEYS } from './pianoKeys.js'
import { NO_ANSWER, CORRECT, INCORRECT } from './constants.js'
import { getRandomElement, removeElement, sortByNoteOrder } from './utils.js'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      selectedKeys: [],
      askedChord: getRandomElement(CHORDS),
      lastChordCorrect: NO_ANSWER
    }

    this.validateChord = this.validateChord.bind(this)
    this.nextChord = this.nextChord.bind(this)
    this.toggleKey = this.toggleKey.bind(this)
  }

  // validates if the chord entered by the user is correct
  validateChord() {
    let { selectedKeys } = this.state
    sortByNoteOrder(selectedKeys, KEYS.map(k => k.id))
    const correct = this.state.askedChord.notes.join() === selectedKeys.join() ? CORRECT : INCORRECT
    this.setState({
      lastChordCorrect: correct
    })
  }

  // fetches a new random chord and presents it to the user
  nextChord() {
    const nextChord = getRandomElement(CHORDS)
    this.setState({
      askedChord: nextChord,
      lastChordCorrect: NO_ANSWER,
      selectedKeys: []
    })

  }

  // toggles if a piano key is selected or not
  toggleKey(keyId) {
    let { selectedKeys } = this.state
    if (!selectedKeys.includes(keyId)) {
      selectedKeys.push(keyId)
    } else {
      removeElement(selectedKeys, keyId)
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
