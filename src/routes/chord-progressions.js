import { Link } from "react-router-dom";
import { useState, useRef } from 'react';
import Button from 'react-bootstrap/Button';
import './chord-progressions.css';
import { CHORD_PROGRESSION_FILES } from './chordProgressionFiles.js';
import { getRandomElement } from '../utils.js'

export default function ChrodProgressions() {
  const [audioFile, setAudioFile] = useState(getRandomElement(CHORD_PROGRESSION_FILES))
  const [showAnswer, setShowAnswer] = useState(false)

  const audioRef = useRef()

  function nextChordProgression() {
    setShowAnswer(false)
    const nextChordProgression = getRandomElement(CHORD_PROGRESSION_FILES)
    console.log('nextChordProgression', nextChordProgression)
    setAudioFile(nextChordProgression)
    if(audioRef.current) {
      audioRef.current.pause()
      audioRef.current.load()
    }
  }
  
  return (
    <main>
      <h2>Chord Progressions</h2>
      <audio controls ref={audioRef}>
        <source src={process.env.PUBLIC_URL + '/audio/' + audioFile} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
      <p id="answer" className={showAnswer ? "visible" : "invisible"}>{audioFile}</p>
      <div>
        { !showAnswer && <Button size="lg" variant="primary" onClick={() => setShowAnswer(true)}>Show answer</Button>}
        { showAnswer && <Button size="lg" variant="primary" onClick={nextChordProgression}>Next Progression</Button>}
      </div>
      <nav>
        <Link to="/piano-chord-training">Piano</Link> |{" "}
        <Link to="/chord-progressions">Chord Progressions</Link> |{" "}
        <Link to="/stats">Stats</Link>
      </nav>
    </main>
  );
}