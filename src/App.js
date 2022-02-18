import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import './App.css';
import { CHORDS, CHORD_FAMILIES } from './chords.js'
import { PIANO_KEYS } from './pianoKeys.js'
import { NO_ANSWER, CORRECT, INCORRECT, KEYS } from './constants.js'
import { getRandomElement, removeElement, sortByNoteOrder } from './utils.js'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import { Link } from "react-router-dom";

function App () {
  const [cookies, setCookie] = useCookies(['settings'])
  const [selectedPianoKeys, setSelectedPianoKeys] = useState([])
  const [askedChord, setAskedChord] = useState(CHORDS[0])
  const [lastChordCorrect, setLastChordCorrect] = useState(NO_ANSWER)
  const [selectedChordFamilies, setSelectedChordFamilies] = useState(new Set(cookies.ChordFamilies || CHORD_FAMILIES.map(c => c.name)))
  const [selectedKeys, setSelectedKeys] = useState(new Set(cookies.Keys || KEYS))
  const [showModal, setShowModal] = useState(false)
  const [answerTimerStart, setAnswerTimerStart] = useState(Date.now())

  useEffect(() => nextChord(), [])

  function handleChordFamilyCheckboxChanged(e) {
    const chordFamily = e.target.name
    let selectedChordFamiliesCopy = new Set(selectedChordFamilies)
    if (selectedChordFamiliesCopy.has(chordFamily)) {
      selectedChordFamiliesCopy.delete(chordFamily);
    } else {
      selectedChordFamiliesCopy.add(chordFamily);
    }
    setCookie('ChordFamilies', Array.from(selectedChordFamiliesCopy), { path: '/' });
    setSelectedChordFamilies(selectedChordFamiliesCopy)
  }

  function handleKeyCheckboxChanged(e) {
    const key = e.target.name
    let selectedKeysCopy = new Set(selectedKeys)
    if (selectedKeysCopy.has(key)) {
      selectedKeysCopy.delete(key);
    } else {
      selectedKeysCopy.add(key);
    }
    setCookie('Keys', Array.from(selectedKeysCopy), { path: '/' });
    setSelectedKeys(selectedKeysCopy)
  }

  // validates if the chord entered by the user is correct
  function validateChord() {
    let selectedPianoKeysCopy = [...selectedPianoKeys]
    sortByNoteOrder(selectedPianoKeysCopy, PIANO_KEYS.map(k => k.id))
    const isCorrect = askedChord.notes.join() === selectedPianoKeysCopy.join() ? CORRECT : INCORRECT
    if (isCorrect === CORRECT) {
      let chordExtension = askedChord.family.minor ? "m" : ""
      chordExtension += askedChord.family.extension || ""
      const answerDuration = Date.now() - answerTimerStart
      console.log(process.env.REACT_APP_BACKEND_URL)
      fetch(process.env.REACT_APP_BACKEND_URL, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'X-Auth-Token': process.env.REACT_APP_BACKEND_AUTH_TOKEN // Note: this will be visible to browser users
        },
        body: JSON.stringify({
          chord_name: askedChord.name,
          chord_extension: chordExtension,
          root_note: askedChord.rootNote,
          created_at: new Date().toISOString(),
          user: "Mattias",
          answer_duration_millis: answerDuration
        })
      })
      .then(res => console.log("Delivered stats to backend!"))
      .catch(err => console.log("Could not deliver stats to backend! Error:", err))
    }
    setLastChordCorrect(isCorrect)
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
    setAnswerTimerStart(Date.now())
  }

  function getChordDisplay(chord) {
    let chordDisplay = chord.rootNote
    chordDisplay += (chord.family.minor ? "m" : "")
    return <p id="asked-chord">{chordDisplay}<sup>{chord.family.extension}</sup>{chord.baseNote ? "/"+chord.baseNote : ""}</p>
  }

  // toggles if a piano key is selected or not
  function togglePianoKey(keyId) {
    let selectedPianoKeysCopy = [...selectedPianoKeys]
    if (!selectedPianoKeysCopy.includes(keyId)) {
      selectedPianoKeysCopy.push(keyId)
    } else {
      removeElement(selectedPianoKeysCopy, keyId)
    }
    setSelectedPianoKeys(selectedPianoKeysCopy)
  }

  return (
    <div className="App">
      <Modal show={showModal} onHide={() => setShowModal(false)}>
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
                onChange={handleChordFamilyCheckboxChanged}
                checked={selectedChordFamilies.has(chordFamily.name)}
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
                onChange={handleKeyCheckboxChanged}
                checked={selectedKeys.has(key)}
              />
            ))}
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={() => setShowModal(false)} variant="primary">OK</Button>
        </Modal.Footer>
      </Modal>
      
      {getChordDisplay(askedChord)}

      <div id="keyboard">
        {PIANO_KEYS.map(pianoKey => {
          let clazz = pianoKey.class
          if (selectedPianoKeys.includes(pianoKey.id)) {
            clazz += " selected"
          } 
          return <div 
            className={clazz}
            id={pianoKey.id}
            key={pianoKey.id}
            onClick={() => togglePianoKey(pianoKey.id)}
          />
        })}
      </div>
      <div id="result-container">

      <p id="answer" className={lastChordCorrect === NO_ANSWER ? "invisible" : "visible"}>{lastChordCorrect}</p>
      
      { lastChordCorrect !== CORRECT && <Button id="validate-button" size="lg" variant="primary" onClick={validateChord}>Validate</Button>}

      { lastChordCorrect === CORRECT && <Button variant="primary" size="lg" onClick={nextChord}>Next chord!</Button>}
      </div>
      <div>
        <Button variant="outline-secondary" size="lg" onClick={() => setShowModal(true)}>Settings</Button>
      </div>

      <nav>
        <Link to="/piano-chord-training">Piano</Link> |{" "}
        <Link to="/settings">Settings</Link> |{" "}
        <Link to="/stats">Stats</Link>
      </nav>
    </div>
  );
}

export default App;
