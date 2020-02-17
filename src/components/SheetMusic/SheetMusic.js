import React, { useRef } from 'react';

import abcjs from 'abcjs';

const SheetMusic = ({
  isPlaying,
  tunebookString,
  bpm,
  scale = 1,
  onBeat,
  onEvent,
  onLineEnd,
}) => {
  const paper = React.useRef();
  const timer = React.useRef();

  React.useEffect(() => {
    const tune = abcjs.renderAbc('paper', tunebookString, {
      add_classes: true,
      scale,
      staffwidth: 1000,
    });

    timer.current = new abcjs.TimingCallbacks(tune[0], {
      qpm: bpm,
      beatSubdivisions: 4,
      beatCallback: (beatNumber, totalBeats, totalTime) => {
        if (typeof onBeat === 'function') {
          onBeat(beatNumber, totalBeats, totalTime);
        }
      },
      lineEndCallback: info => {
        if (typeof onLineEnd === 'function') {
          onLineEnd(info);
        }
      },
      eventCallback: event => {
        if (typeof onEvent === 'function') {
          if (event === null) {
            onEvent(null);
          } else {
            // Event.midiPitches isn't working, so we need to work out pitch from ABC notation
            const note = tunebookString[event.startChar];

            onEvent({
              ...event,
              note,
            });
          }
        }

        if (!event) {
          return null;
        }

        const notes = document.getElementsByClassName('abcjs-note');
        const rests = document.getElementsByClassName('abcjs-rest');

        for (let note of notes) {
          note.classList.remove('abc-js-note-playing');
        }

        for (let rest of rests) {
          rest.classList.remove('abc-js-note-playing');
        }

        event.elements.forEach(element => {
          element[0].classList.add('abc-js-note-playing');
        });
      },
    });

    // timer.start();
  }, [JSON.stringify(tunebookString)]);

  React.useEffect(() => {
    if (isPlaying) {
      timer.current.start();
    } else {
      timer.current.stop();
    }
  }, [isPlaying]);

  return (
    <>
      <div id="paper" ref={paper}></div>

      <style>
        {`
          #paper svg {
            background-color: #DDD;
            // width: 770px;
          }

          #paper .abc-js-note-playing {
            fill: #0fa6d1;
            // stroke: #0fa6d1;
          }
        `}
      </style>
    </>
  );
};

export default SheetMusic;
