import React, { useState, useEffect, useRef } from "react";
import { keyToNote, processPerformance, play } from "./constants.js";

const Capture = (props) => {
  const [recording, _setRecording] = useState(false);
  const recordingRef = useRef(recording);
  const setRecording = (bool) => {
    recordingRef.current = bool;
    _setRecording(bool);
  };

  const buffer = props.buffer;

  const clickRecord = () => {
    setRecording(true);
    buffer.current.length = 0;
  };

  const clickStop = () => {
    if (recordingRef.current) {
      setRecording(false);
      if (buffer.current.length > 0) {
        buffer.current = processPerformance(buffer.current);
      }
    }
  };

  const clickPlay = () => {
    play(buffer.current, props.synth);
  };

  const playKeyboard = (e) => {
    if (keyToNote[e.key]) {
      const note = keyToNote[e.key];
      if (e.type === "keydown") {
        props.synth.triggerAttackRelease(note, 0.1);
      }
      if (recordingRef.current) {
        buffer.current.push([Date.now(), note]);
      }
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", playKeyboard);
    return function cleanup() {
      document.addEventListener("keydown", playKeyboard);
    };
  }, []);

  return (
    <div>
      <button className="record" onClick={clickRecord}>
        record
      </button>
      <button className="stop" onClick={clickStop}>
        stop
      </button>
      <button className="play" onClick={clickPlay}>
        play
      </button>
      <button
        className="consoleLog"
        onClick={() => console.log(buffer.current)}
      >
        console log this performance
      </button>
    </div>
  );
};

export default Capture;
