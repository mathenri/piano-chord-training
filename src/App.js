import React, { Component } from 'react';
import './App.css';
import { CHORDS, CHORD_FAMILIES } from './chords.js'
import { PIANO_KEYS } from './pianoKeys.js'
import { NO_ANSWER, CORRECT, INCORRECT, KEYS } from './constants.js'
import { getRandomElement, removeElement, sortByNoteOrder } from './utils.js'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';


class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      selectedPianoKeys: [],
      askedChord: getRandomElement(CHORDS),
      lastChordCorrect: NO_ANSWER,
      selectedChordFamilies: new Set(CHORD_FAMILIES.map(c => c.name)),
      selectedKeys: new Set(KEYS),
      showModal: false
    }

    this.validateChord = this.validateChord.bind(this)
    this.nextChord = this.nextChord.bind(this)
    this.togglePianoKey = this.togglePianoKey.bind(this)
    this.handleChordFamilyCheckboxChanged = this.handleChordFamilyCheckboxChanged.bind(this)
    this.handleKeyCheckboxChanged = this.handleKeyCheckboxChanged.bind(this)
    this.closeModal = this.closeModal.bind(this)
    this.openModal = this.openModal.bind(this)
    this.getChordDisplay = this.getChordDisplay.bind(this)
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

  handleKeyCheckboxChanged(e) {
    const key = e.target.name
    const { selectedKeys } = this.state
    if (selectedKeys.has(key)) {
      selectedKeys.delete(key);
    } else {
      selectedKeys.add(key);
    }
    this.setState({ selectedKeys })
  }

  // validates if the chord entered by the user is correct
  validateChord() {
    let { selectedPianoKeys } = this.state
    sortByNoteOrder(selectedPianoKeys, PIANO_KEYS.map(k => k.id))
    const correct = this.state.askedChord.notes.join() === selectedPianoKeys.join() ? CORRECT : INCORRECT
    this.setState({
      lastChordCorrect: correct
    })
  }

  // fetches a new random chord and presents it to the user
  nextChord() {
    const chordsSubset = CHORDS.filter(
      chord => this.state.selectedChordFamilies.has(chord.family.name)
    ).filter(
      chord => this.state.selectedKeys.has(chord.rootNote)
    )
    const nextChord = getRandomElement(chordsSubset)
    this.setState({
      askedChord: nextChord,
      lastChordCorrect: NO_ANSWER,
      selectedPianoKeys: []
    })
  }

  getChordDisplay(chord) {
    let chordDisplay = chord.rootNote
    chordDisplay += (chord.family.minor ? "m" : "")
    return <p id="asked-chord">{chordDisplay}<sup>{chord.family.extension}</sup>{chord.baseNote ? "/"+chord.baseNote : ""}</p>
  }

  // toggles if a piano key is selected or not
  togglePianoKey(keyId) {
    let { selectedPianoKeys } = this.state
    if (!selectedPianoKeys.includes(keyId)) {
      selectedPianoKeys.push(keyId)
    } else {
      removeElement(selectedPianoKeys, keyId)
    }
    this.setState({selectedPianoKeys})
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
            <Form>
              <p>Chord types</p>
              {CHORD_FAMILIES.map(chordFamily => (
                <Form.Check
                  type="switch"
                  id={chordFamily.name}
                  name={chordFamily.name}
                  label={chordFamily.name}
                  key={chordFamily.name}
                  onChange={this.handleChordFamilyCheckboxChanged}
                  checked={this.state.selectedChordFamilies.has(chordFamily.name)}
                />
              ))}
              <p>Keys</p>
              {KEYS.map(key => (
                <Form.Check
                  type="switch"
                  id={key}
                  name={key}
                  label={key}
                  key={key}
                  onChange={this.handleKeyCheckboxChanged}
                  checked={this.state.selectedKeys.has(key)}
                />
              ))}
            </Form>
          </Modal.Body>

          <Modal.Footer>
            <Button onClick={this.closeModal} variant="primary">OK</Button>
          </Modal.Footer>
        </Modal>
        
        {this.getChordDisplay(this.state.askedChord)}

        <div id="keyboard">
          {PIANO_KEYS.map(pianoKey => {
            let clazz = pianoKey.class
            if (this.state.selectedPianoKeys.includes(pianoKey.id)) {
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

        <Nav className="justify-content-center">
          <Nav.Item>
            <Nav.Link>Chord training</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link>Stats</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link>Settings</Nav.Link>
          </Nav.Item>
        </Nav>
      </div>
    );
  }
}

export default App;
