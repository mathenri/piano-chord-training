// Returns a random element from a given array.
export function getRandomElement(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}

// Removes the given element from the given array.
export function removeElement(arr, elem) {
  const index = arr.indexOf(elem);
  if (index > -1) {
    arr.splice(index, 1);
  }
}

// Sorts an array of note names in note order
export function sortByNoteOrder(arr, order) {
  arr.sort(function(a, b){
      return order.indexOf(a) - order.indexOf(b)
  })
}

export function rootNoteTranslation(rootNote) {
  switch(rootNote) {
    case "B#":
      return "C"
    case "C#":
      return "Db"
    case "D#":
      return "Eb"
    case "Fb":
      return "E"
    case "E#":
      return "F"
    case "Gb":
      return "F#"
    case "G#":
      return "Ab"
    case "A#":
      return "Bb"
    case "Cb":
      return "B"
    default:
      return rootNote
  }
}