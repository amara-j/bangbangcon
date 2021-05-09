const keyToNote = {
  a: "C4",
  w: "C#4",
  s: "D4",
  e: "D#4",
  d: "E4",
  f: "F4",
  t: "F#4",
  g: "G4",
  y: "G#4",
  h: "A4",
  u: "A#4",
  j: "B4",
  k: "C5",
  o: "C#5",
  l: "D5",
  p: "D#5",
  ";": "E5",
};

const play = (array, synth) => {
  array.forEach((element) =>
    setTimeout(function () {
      synth.triggerAttackRelease(element[1], 0.1);
    }, element[0])
  );
};

const processPerformance = (array) => {
  let subtractMe = array[0][0];
  let relativeArray = array;
  relativeArray.forEach((element) => (element[0] -= subtractMe));
  return relativeArray;
};

export { keyToNote, processPerformance, play };
