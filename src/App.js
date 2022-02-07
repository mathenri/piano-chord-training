import React, { Component } from 'react';
import './App.css';
import { CHORDS, CHORD_FAMILIES } from './chords.js'
import { KEYS } from './pianoKeys.js'
import { NO_ANSWER, CORRECT, INCORRECT } from './constants.js'
import { getRandomElement, removeElement, sortByNoteOrder } from './utils.js'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      selectedKeys: [],
      askedChord: getRandomElement(CHORDS),
      lastChordCorrect: NO_ANSWER,
      selectedChordFamilies: new Set(CHORD_FAMILIES),
      showModal: false
    }

    this.validateChord = this.validateChord.bind(this)
    this.nextChord = this.nextChord.bind(this)
    this.togglePianoKey = this.togglePianoKey.bind(this)
    this.handleChordFamilyCheckboxChanged = this.handleChordFamilyCheckboxChanged.bind(this)
    this.closeModal = this.closeModal.bind(this)
    this.openModal = this.openModal.bind(this)
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
  togglePianoKey(keyId) {
    let { selectedKeys } = this.state
    if (!selectedKeys.includes(keyId)) {
      selectedKeys.push(keyId)
    } else {
      removeElement(selectedKeys, keyId)
    }
    this.setState({selectedKeys})
  }

  closeModal() {
    this.setState({showModal: false})
  }

  openModal() {
    this.setState({showModal: true})
  }

  render() {
    return (
      <div className="App">
        <Modal show={this.state.showModal} onHide={this.closeModal}>
          <Modal.Header closeButton>
            <Modal.Title>Settings</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <p>Chord families</p>
            <Form>
              {CHORD_FAMILIES.map(chordFamily => (
                <Form.Check
                  type="switch"
                  id={chordFamily}
                  name={chordFamily}
                  label={chordFamily}
                  key={chordFamily}
                  onChange={this.handleChordFamilyCheckboxChanged}
                  checked={this.state.selectedChordFamilies.has(chordFamily)}
                />
              ))}
            </Form>
          </Modal.Body>

          <Modal.Footer>
            <Button onClick={this.closeModal} variant="primary">OK</Button>
          </Modal.Footer>
        </Modal>
        
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
              onClick={() => this.togglePianoKey(pianoKey.id)}
            />
          })}
        </div>
        <div id="result-container">

        <p id="answer" className={this.state.lastChordCorrect === NO_ANSWER ? "invisible" : "visible"}>{this.state.lastChordCorrect}</p>
        
        { this.state.lastChordCorrect !== CORRECT && <Button id="validate-button" size="lg" variant="primary" onClick={this.validateChord}>Validate</Button>}

        { this.state.lastChordCorrect === CORRECT && <Button variant="primary" size="lg" onClick={this.nextChord}>Next chord!</Button>}
        </div>
        <div>
          <Button variant="outline-secondary" size="lg" onClick={this.openModal}>Settings</Button>
        </div>
      </div>
    );
  }
}

export default App;
