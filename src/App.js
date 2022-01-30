import React, { Component } from 'react';
import './App.css';
import { CHORDS } from './chords.js'
import { KEYS } from './pianoKeys.js'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      selectedKeys: [],
      askedChord: CHORDS[Math.floor(Math.random() * CHORDS.length)],
      lastChordCorrect: "no_answer"
    }

    this.validateChord = this.validateChord.bind(this)
    this.nextChord = this.nextChord.bind(this)
    this.toggleKey = this.toggleKey.bind(this)
  }

  validateChord() {
    console.log("Asked chord: ", this.state.askedChord.name)
    console.log("Selected keys: ", this.state.selectedKeys.join())
    console.log("Correct keys: ", this.state.askedChord.notes.join())
    const correct = this.state.askedChord.notes.join() === this.state.selectedKeys.join() ? "correct" : "incorrect"
    this.setState({
      lastChordCorrect: correct
    })
  }

  nextChord() {
    const nextChord = CHORDS[Math.floor(Math.random() * CHORDS.length)]
    this.setState({
      askedChord: nextChord,
      lastChordCorrect: "no_answer",
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

        { this.state.lastChordCorrect !== "correct" && <button onClick={this.validateChord}>Validate</button>}

        { this.state.lastChordCorrect !== "no_answer" && <p id="answer">{this.state.lastChordCorrect}</p>}

        { this.state.lastChordCorrect === "correct" && <button onClick={this.nextChord}>Next chord!</button>}
      </div>
    );
  }
}

export default App;
