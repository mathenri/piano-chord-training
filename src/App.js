import React, { useState } from 'react';
import { withCookies, Cookies } from 'react-cookie';
import './App.css';
import { CHORDS, CHORD_FAMILIES } from './chords.js'
import { PIANO_KEYS } from './pianoKeys.js'
import { NO_ANSWER, CORRECT, INCORRECT, KEYS } from './constants.js'
import { getRandomElement, removeElement, sortByNoteOrder } from './utils.js'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';




function App () {

  const [selectedPianoKeys, setSelectedPianoKeys] = useState([])
  const [askedChord, setAskedChord] = useState(getRandomElement(CHORDS))
  const [lastChordCorrect, setLastChordCorrect] = useState(NO_ANSWER)
  const [selectedChordFamilies, setSelectedChordFamilies] = useState(new Set(CHORD_FAMILIES.map(c => c.name)))
  const [selectedKeys, setSelectedKeys] = useState(new Set(KEYS))
  const [showModal, setShowModal] = useState(false)

  function handleChordFamilyCheckboxChanged(e) {
    const chordFamily = e.target.name
    let selectedChordFamiliesCopy = selectedChordFamilies
    if (selectedChordFamiliesCopy.has(chordFamily)) {
      selectedChordFamiliesCopy.delete(chordFamily);
    } else {
      selectedChordFamiliesCopy.add(chordFamily);
    }
    setSelectedChordFamilies(selectedChordFamiliesCopy)
  }

  function handleKeyCheckboxChanged(e) {
    const key = e.target.name
    let selectedKeysCopy = selectedKeys
    if (selectedKeysCopy.has(key)) {
      selectedKeysCopy.delete(key);
    } else {
      selectedKeysCopy.add(key);
    }
    setSelectedKeys(selectedKeysCopy)
  }

  // validates if the chord entered by the user is correct
  function validateChord() {
    let selectedPianoKeysCopy = selectedPianoKeys
    sortByNoteOrder(selectedPianoKeysCopy, PIANO_KEYS.map(k => k.id))
    const correct = askedChord.notes.join() === selectedPianoKeysCopy.join() ? CORRECT : INCORRECT
    setLastChordCorrect(correct)
  }

  // fetches a new random chord and presents it to the user
  function nextChord() {
    const chordsSubset = CHORDS.filter(
      chord => selectedChordFamilies.has(chord.family.name)
    ).filter(
      chord => selectedKeys.has(chord.rootNote)
    )
    const nextChord = getRandomElement(chordsSubset)
    setAskedChord(nextChord)
    setLastChordCorrect(NO_ANSWER)
    setSelectedPianoKeys([])
  }

  function getChordDisplay(chord) {
    let chordDisplay = chord.rootNote
    chordDisplay += (chord.family.minor ? "m" : "")
    return <p id="asked-chord">{chordDisplay}<sup>{chord.family.extension}</sup>{chord.baseNote ? "/"+chord.baseNote : ""}</p>
  }

  // toggles if a piano key is selected or not
  function togglePianoKey(keyId) {
    let selectedPianoKeysCopy = selectedPianoKeys
    if (!selectedPianoKeysCopy.includes(keyId)) {
      selectedPianoKeysCopy.push(keyId)
    } else {
      removeElement(selectedPianoKeysCopy, keyId)
    }
    setSelectedPianoKeys(selectedPianoKeysCopy)
  }

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
          <Button onClick={setShowModal(false)} variant="primary">OK</Button>
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
        <Button variant="outline-secondary" size="lg" onClick={setShowModal(true)}>Settings</Button>
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

export default App;
