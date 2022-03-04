import { useState, useRef } from 'react';
import Button from 'react-bootstrap/Button';
import './ChordProgressionTraining.css';
import { CHORD_PROGRESSION_FILES } from './chordProgressionFiles.js';
import { getRandomElement } from './utils.js'

export default function ChordProgressionTraining() {
  const [audioFile, setAudioFile] = useState(getRandomElement(CHORD_PROGRESSION_FILES))
  const [showAnswer, setShowAnswer] = useState(false)

  const audioRef = useRef()

  function nextChordProgression() {
    setShowAnswer(false)
    setAudioFile(getRandomElement(CHORD_PROGRESSION_FILES))
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
    </main>
  );
}