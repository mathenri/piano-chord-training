import React, { Component } from 'react';
import './App.css';
import { CHORDS, CHORD_FAMILIES } from './chords.js'
import { KEYS } from './pianoKeys.js'
import { NO_ANSWER, CORRECT, INCORRECT } from './constants.js'
import { getRandomElement, removeElement, sortByNoteOrder } from './utils.js'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      selectedKeys: [],
      askedChord: getRandomElement(CHORDS),
      lastChordCorrect: NO_ANSWER,
      selectedChordFamilies: new Set(CHORD_FAMILIES)
    }

    this.validateChord = this.validateChord.bind(this)
    this.nextChord = this.nextChord.bind(this)
    this.toggleKey = this.toggleKey.bind(this)
    this.handleChordFamilyCheckboxChanged = this.handleChordFamilyCheckboxChanged.bind(this)

  }

  handleChordFamilyCheckboxChanged(e) {
    const chordFamily = e.target.name
    const { selectedChordFamilies } = this.state
    if (selectedChordFamilies.has(chordFamily)) {
      selectedChordFamilies.delete(chordFamily);
    } else {
      selectedChordFamilies.add(chordFamily);
    }
    this.setState({ selectedChordFamilies })
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
    const chordsSubset = CHORDS.filter(chord => this.state.selectedChordFamilies.has(chord.family))
    const nextChord = getRandomElement(chordsSubset)
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

        {CHORD_FAMILIES.map(chordFamily => (
        <div>
          <label>
            <input 
              name={chordFamily} 
              type="checkbox"
              key={chordFamily}
              onChange={this.handleChordFamilyCheckboxChanged}
              checked={this.state.selectedChordFamilies.has(chordFamily)}
            />
            {chordFamily}
          </label>
        </div>
        ))}
      </div>
    );
  }
}

export default App;
