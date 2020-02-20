import React from 'react';

import abcjs from 'abcjs';

const SheetMusic = ({
  isPlaying,
  tunebookString,
  bpm,
  scale = 1,
  className,
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
      staffwidth: 1200,
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
            // const note = tunebookString[event.startChar];
            const note = tunebookString.slice(event.startChar, event.endChar);

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
          note.classList.remove('abcjs-note-playing');
        }

        for (let rest of rests) {
          rest.classList.remove('abcjs-note-playing');
        }

        event.elements.forEach(element => {
          element[0].classList.add('abcjs-note-playing');
        });
      },
    });
    /* eslint-disable */
  }, [JSON.stringify(tunebookString)]);
  /* eslint-enable */

  React.useEffect(() => {
    if (isPlaying) {
      timer.current.start();
    } else {
      timer.current.stop();
    }
  }, [isPlaying]);

  return (
    <>
      <div id="paper" ref={paper} className={className || ''}></div>

      <style>
        {`
          #paper {
            width: 1300px;
            margin: 0 auto 2rem auto;
            background-color: #DDD;
            border-radius: 8px;
          }

          #paper .abcjs-note, #paper .abcjs-rest {
            transition: 0.2s;
          }

          #paper .abcjs-note-playing {
            fill: #d10fc9;
          }
        `}
      </style>
    </>
  );
};

export default SheetMusic;
