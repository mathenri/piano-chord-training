export const CHORDS = [
  //--- major ---
  { name: "C",     notes: ["C1", "E1", "G1"]},
  { name: "C/E",   notes: ["E1", "G1", "C2"]},
  { name: "C/G",   notes: ["G1", "C2", "E2"]},
  { name: "Db",    notes: ["C#1", "F1", "G#1"]},
  { name: "Db/F",  notes: ["F1", "G#1", "C#2"]},
  { name: "Db/Ab", notes: ["G#1", "C#2", "F2"]},
  { name: "D",     notes: ["D1", "F#1", "A1"]},
  { name: "D/F#",  notes: ["F#1", "A1", "D2"]},
  { name: "D/A",   notes: ["A1", "D2", "F#2"]},
  { name: "Eb",    notes: ["D#1", "G1", "A#1"]},
  { name: "Eb/G",  notes: ["G1", "A#1", "D#2"]},
  { name: "Eb/Bb", notes: ["A#1", "D#2", "G2"]},
  { name: "E",     notes: ["E1", "G#1", "B1"]},
  { name: "E/G#",  notes: ["G#1", "B1", "E2"]},
  { name: "E/B",   notes: ["B1", "E2", "G#2"]},
  { name: "F",     notes: ["F1", "A1", "C2"]},
  { name: "F/A",   notes: ["A1", "C2", "F2"]},
  { name: "F/C",   notes: ["C1", "F1", "A1"]},
  { name: "F#",    notes: ["F#1", "A#1", "C#2"]},
  { name: "F#/A#", notes: ["A#1", "C#2", "F#2"]},
  { name: "F#/C#", notes: ["C#1", "F#1", "A#1"]},
  { name: "G",     notes: ["G1", "B1", "D2"]},
  { name: "G/B",   notes: ["B1", "D2", "G2"]},
  { name: "G/D",   notes: ["D1", "G1", "B1"]},
  { name: "Ab",    notes: ["G#1", "C2", "D#2"]},
  { name: "Ab/C",  notes: ["C1", "D#1", "G#1"]},
  { name: "Ab/Eb", notes: ["D#1", "G#1", "C2"]},
  { name: "A",     notes: ["A1", "C#2", "E2"]},
  { name: "A/C#",  notes: ["C#1", "E1", "A1"]},
  { name: "A/E",   notes: ["E1", "A1", "C#2"]},
  { name: "Bb",    notes: ["A#1", "D2", "F2"]},
  { name: "Bb/D",  notes: ["D1", "F1", "A#1"]},
  { name: "Bb/F",  notes: ["F1", "A#1", "D2"]},
  { name: "B",     notes: ["B1", "D#2", "F#2"]},
  { name: "B/D#",  notes: ["D#1", "F#1", "B1"]},
  { name: "B/F#",  notes: ["F#1", "B1", "D#2"]},

  // --- minor ---
  { name: "Cm",     notes: ["C1", "D#1", "G1"] },
  { name: "Cm/Eb",  notes: ["D#1", "G1", "C2"]},
  { name: "Cm/G",   notes: ["G1", "C2", "D#2"]},
  { name: "C#m",    notes: ["C#1", "E1", "G#1"]},
  { name: "C#m/E",  notes: ["E1", "G#1", "C#2"]},
  { name: "C#m",    notes: ["G#1", "C#2", "E2"]},
  { name: "Dm",     notes: ["D1", "F1", "A1"]},
  { name: "Dm/F",   notes: ["F1", "A1", "D2"]}, 
  { name: "Dm/A",   notes: ["A1", "D2", "F2"]},
  { name: "Ebm",    notes: ["D#1", "F#1", "A#1"]},
  { name: "Ebm/G",  notes: ["F#1", "A#1", "D#2"]},
  { name: "Ebm/Bb", notes: ["A#1", "D#2", "F#2"]},
  { name: "Em",     notes: ["E1", "G1", "B1"]},
  { name: "Em/G",   notes: ["G1", "B1", "E2"]},
  { name: "Em/B",   notes: ["B1", "E2", "G2"]},
  { name: "Fm",     notes: ["F1", "G#1", "C2"]},
  { name: "Fm/Ab",  notes: ["G#1", "C2", "F2"]},
  { name: "Fm/C",   notes: ["C1", "F1", "G#1"]},
  { name: "F#m",    notes: ["F#1", "A1", "C#2"]},
  { name: "F#m/A",  notes: ["A1", "C#2", "F#2"]},
  { name: "F#m/C#", notes: ["C#1", "F#1", "A1"]},
  { name: "Gm",     notes: ["G1", "A#1", "D2"]},
  { name: "Gm/Bb",  notes: ["A#1", "D2", "G2"]},
  { name: "Gm/D",   notes: ["D1", "G1", "A#1"]},
  { name: "Abm",    notes: ["G#1", "B2", "D#2"]},
  { name: "Abm/Cb", notes: ["B1", "D#1", "G#1"]},
  { name: "Abm/Eb", notes: ["D#1", "G#1", "B2"]},
  { name: "Am",     notes: ["A1", "C2", "E2"]},
  { name: "Am/C",   notes: ["C1", "E1", "A1"]},
  { name: "Am/E",   notes: ["E1", "A1", "C2"]},
  { name: "Bbm",    notes: ["A#1", "C#2", "F2"]},
  { name: "Bbm/Db", notes: ["C#1", "F1", "A#1"]},
  { name: "Bbm/F",  notes: ["F1", "A#1", "C#2"]},
  { name: "Bm",     notes: ["B1", "D2", "F#2"]},
  { name: "Bm/D",   notes: ["D1", "F#1", "B1"]},
  { name: "Bm/F#",  notes: ["F#1", "B1", "D2"]},

  //--- dominant 7th ---
  { name: "C7/E",   notes: ["E1", "G1", "A#1"]},
  { name: "C7/G",   notes: ["G1", "A#1", "E1"]},
  { name: "C7/Bb",  notes: ["A#1", "E1", "G1"]},
  { name: "Db7/F",  notes: ["F1", "G#1", "B1"]},
  { name: "Db7/Ab", notes: ["G#1", "B1", "F1"]},
  { name: "Db7/Cb", notes: ["B1", "F1", "G#1"]},
  { name: "D7/F#",  notes: ["F#1", "A1", "C2"]},
  { name: "D7/A",   notes: ["A1", "C2", "F#2"]},
  { name: "D7/C",   notes: ["C1", "F#1", "A1"]},
  { name: "Eb7/G",  notes: ["G1", "A#1", "C#2"]},
  { name: "Eb7/Bb", notes: ["A#1", "C#2", "G2"]},
  { name: "Eb7/Db", notes: ["C#1", "G1", "A#1"]},
  { name: "E7/G#",  notes: ["G#1", "B1", "D2"]},
  { name: "E7/B",   notes: ["B1", "D2", "G#2"]},
  { name: "E7/D",   notes: ["D1", "G#1", "B1"]},
  { name: "F7/A",   notes: ["A1", "C2", "D#2"]},
  { name: "F7/C",   notes: ["C1", "D#1", "A1"]},
  { name: "F7/Eb",  notes: ["D#1", "A1", "C2"]},
  { name: "F#7/A#", notes: ["A#1", "C#2", "E2"]},
  { name: "F#7/C#", notes: ["C#1", "E1", "A#1"]},
  { name: "F#7/E",  notes: ["E1", "A#1", "C#2"]},
  { name: "G7/B",   notes: ["B1", "D2", "F2"]},
  { name: "G7/D",   notes: ["D1", "F1", "B1"]},
  { name: "G7/F",   notes: ["F1", "B1", "D2"]},
  { name: "Ab7/C",  notes: ["C1", "D#1", "F#1"]},
  { name: "Ab7/Eb", notes: ["D#1", "F#1", "C2"]},
  { name: "Ab7/Gb", notes: ["F#1", "C2", "D#2"]},
  { name: "A7/C#",  notes: ["C#1", "E1", "G1"]},
  { name: "A7/E",   notes: ["E1", "G1", "C#2"]},
  { name: "A7/G",   notes: ["G1", "C#2", "E2"]},
  { name: "Bb7/D",  notes: ["D1", "F1", "G#1"]},
  { name: "Bb7/F",  notes: ["F1", "G#1", "D2"]},
  { name: "Bb7/Ab", notes: ["G#1", "D2", "F2"]},
  { name: "B7/D#",  notes: ["D#1", "F#1", "A1"]},
  { name: "B7/F#",  notes: ["F#1", "A1", "D#2"]},
  { name: "B7/A",   notes: ["A1", "D#2", "F#2"]},

  //--- m7 ---
  { name: "Cm7/Eb",    notes: ["D#1", "G1", "A#1"]},
  { name: "Cm7/G",  notes: ["G1", "A#1", "D#2"]},
  { name: "Cm7/Bb", notes: ["A#1", "D#2", "G2"]},
  { name: "C#m7/E",     notes: ["E1", "G#1", "B1"]},
  { name: "C#m7/G#",  notes: ["G#1", "B1", "E2"]},
  { name: "C#m7/B",   notes: ["B1", "E2", "G#2"]},
  { name: "Dm7/F",     notes: ["F1", "A1", "C2"]},
  { name: "Dm7/A",   notes: ["A1", "C2", "F2"]},
  { name: "Dm7/C",   notes: ["C1", "F1", "A1"]},
  { name: "Ebm7/Gb",    notes: ["F#1", "A#1", "C#2"]},
  { name: "Ebm7/Bb", notes: ["A#1", "C#2", "F#2"]},
  { name: "Ebm7/Db", notes: ["C#1", "F#1", "A#1"]},
  { name: "Em7/G",     notes: ["G1", "B1", "D2"]},
  { name: "Em7/B",   notes: ["B1", "D2", "G2"]},
  { name: "Em7/D",   notes: ["D1", "G1", "B1"]},
  { name: "Fm7/Ab",    notes: ["G#1", "C2", "D#2"]},
  { name: "Fm7/C",  notes: ["C1", "D#1", "G#1"]},
  { name: "Fm7/Eb", notes: ["D#1", "G#1", "C2"]},
  { name: "F#m7/A",     notes: ["A1", "C#2", "E2"]},
  { name: "F#m7/C#",  notes: ["C#1", "E1", "A1"]},
  { name: "F#m7/E",   notes: ["E1", "A1", "C#2"]},
  { name: "Gm7/Bb",    notes: ["A#1", "D2", "F2"]},
  { name: "Gm7/D",  notes: ["D1", "F1", "A#1"]},
  { name: "Gm7/F",  notes: ["F1", "A#1", "D2"]},
  { name: "Abm7/Cb",     notes: ["B1", "D#2", "F#2"]},
  { name: "Abm7/Eb",  notes: ["D#1", "F#1", "B1"]},
  { name: "Abm7/Gb",  notes: ["F#1", "B1", "D#2"]},
  { name: "Am7/C",     notes: ["C1", "E1", "G1"]},
  { name: "Am7/E",   notes: ["E1", "G1", "C2"]},
  { name: "Am7/G",   notes: ["G1", "C2", "E2"]},
  { name: "Bbm7/Db",    notes: ["C#1", "F1", "G#1"]},
  { name: "Bbm7/F",  notes: ["F1", "G#1", "C#2"]},
  { name: "Bbm7/Ab", notes: ["G#1", "C#2", "F2"]},
  { name: "Bm7/D",     notes: ["D1", "F#1", "A1"]},
  { name: "Bm7/F#",  notes: ["F#1", "A1", "D2"]},
  { name: "Bm7/A",   notes: ["A1", "D2", "F#2"]},

  //--- maj7---

  //--- m7b5 ---

  //--- m6 ---

  //--- 7#5 ---

  //--- dominant 9 ---

  //--- m9 ---

  //--- maj9 ---

  //--- m11 ---

  //--- 13 ---

  //--- 7#9 ---

  //--- sus4 ---

  //--- 7sus4 ---

  //--- add9 ---



]