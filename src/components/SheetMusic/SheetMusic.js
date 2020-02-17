import React from 'react';

import abcjs from 'abcjs';

const SheetMusic = ({
  tunebookString = 'X:1\nK:D\nDDAA|BBA2|\n',
  onBeat,
  onEvent,
  onLineEnd,
}) => {
  const paper = React.useRef();

  React.useEffect(() => {
    const tune = abcjs.renderAbc('paper', tunebookString, {
      add_classes: true,
    });

    const timer = new abcjs.TimingCallbacks(tune[0], {
      qpm: 50,
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

        for (let note of notes) {
          note.classList.remove('abc-js-note-playing');
        }

        event.elements.forEach(element => {
          element[0].classList.add('abc-js-note-playing');
        });
      },
    });

    timer.start();
  }, [JSON.stringify(tunebookString)]);

  return (
    <>
      <div id="paper" ref={paper}></div>

      <style>
        {`
          #paper svg {
            background-color: #DDD;
          }

          #paper .abc-js-note-playing {
            fill: #0fa6d1;
            stroke: #0fa6d1;
          }
        `}
      </style>
    </>
  );
};

export default SheetMusic;
