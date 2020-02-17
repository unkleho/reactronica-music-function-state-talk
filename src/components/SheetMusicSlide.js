import React from 'react';
import { Song, Track, Instrument } from 'reactronica';

import SheetMusic from './SheetMusic';

const SheetMusicSlide = () => {
  const [isPlaying, setIsPlaying] = React.useState();
  const [samplesLoaded, setSamplesLoaded] = React.useState(false);
  const [notes, setNotes] = React.useState();
  const handleEvent = React.useRef();
  const bpm = 80;

  handleEvent.current = event => {
    if (event && event.note && event.note !== 'z') {
      let octave = 3;
      let { note } = event;
      let duration = '4n';

      if (['c', 'd', 'e', 'f', 'g', 'a', 'b'].includes(event.note)) {
        octave = 4;
      }

      if (note.includes('/')) {
        duration = '8n';
        note = note.replace('/', '');
      }

      setNotes([{ name: `${event.note}${octave}`, duration }]);
    }
  };

  return (
    <>
      <SheetMusic
        isPlaying={samplesLoaded}
        bpm={bpm}
        scale={1.5}
        tunebookString={`X:1\nM:4/4\nK:A\nL:1/4\n|:EA/c/BG/F/|Eec2|AG/B/EF|G2z2:|\n`}
        onEvent={handleEvent.current}
        onLineEnd={() => {
          setNotes([]);
        }}
      />

      <p style={{ fontSize: '0.5em' }}>
        Excerpt from Our Sailor Prince by J.C. Neild Jr, 1867, State Library of
        NSW.
        <br />
        <a href="https://collection.sl.nsw.gov.au/digital/file/06ddDNk67LV8G">
          collection.sl.nsw.gov.au/digital/file/06ddDNk67LV8G
        </a>
      </p>

      <br />

      {/* <button
        className="demoButton"
        onClick={() => {
          setIsPlaying(!isPlaying);
        }}
      >
        {isPlaying ? 'Stop' : 'Play'}
      </button> */}

      <Song bpm={bpm}>
        <Track>
          <Instrument
            type="sampler"
            notes={notes}
            samples={{
              'C#3': '/audio/piano/Player_dyn2_rr1_020.wav',
              'D#3': '/audio/piano/Player_dyn2_rr1_022.wav',
              F3: '/audio/piano/Player_dyn2_rr1_024.wav',
            }}
            onLoad={() => {
              setSamplesLoaded(true);
            }}
          ></Instrument>
        </Track>
      </Song>
    </>
  );
};

export default SheetMusicSlide;
