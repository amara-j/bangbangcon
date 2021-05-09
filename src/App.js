import { useRef } from "react";
import Capture from "./Capture.js";
import "./App.css";
import { Synth } from "tone";

const App = () => {
  const buffer1 = useRef([]);
  const buffer2 = useRef([]);

  const synth1 = new Synth().toDestination();
  const synth2 = new Synth().toDestination();

  const compareNotes = (a, b) => {
    for (let i = 0; i < a.length; i++) {
      if (a[i][1] !== b[i][1]) {
        return false;
      }
      return true;
    }
  };

  const compareRhythm = (a, b, threshold) => {
    for (let i = 0; i < a.length; i++) {
      if (Math.abs(a[i][0] - b[i][0]) > threshold) {
        return false;
      }
      return true;
    }
  };

  const comparePerformances = (a, b) => {
    const backBeatThreshold = 500;
    if (a.length !== b.length) {
      return false;
    }
    let sameNotes = compareNotes(a, b);
    if (sameNotes === false) {
      return false;
    }
    let sameRhythm = compareRhythm(a, b, backBeatThreshold);
    if (sameRhythm === false) {
      return false;
    }
    return true;
  };

  return (
    <div>
      <div className="capture1Container">
        <Capture buffer={buffer1} synth={synth1} />
      </div>
      <div className="capture2Container">
        <Capture buffer={buffer2} synth={synth2} />
      </div>
      <div className="compareContainer">
        <button
          className="compare"
          onClick={() =>
            console.log(comparePerformances(buffer1.current, buffer2.current))
          }
        >
          compare!
        </button>
      </div>
      <div className="instructionsContainer">
        <div className="instructions">
          welcome! the top two letter rows of your computer keyboard correspond
          to a piano keyboard– try playing something! make two recordings using
          the two rows of record/stop/play buttons. press the compare button to
          see if the two recordings are similar enough. if they are, you'll see
          "true" in the console :)
        </div>
      </div>
    </div>
  );
};

export default App;
