import React from 'react';
import { Song, Track, Instrument } from 'reactronica';

import SheetMusic from './SheetMusic';

const SheetMusicSlide = () => {
  const [notes, setNotes] = React.useState();

  return (
    <>
      <SheetMusic
        onEvent={event => {
          if (event && event.note) {
            setNotes([{ name: `${event.note}3` }]);
          }
        }}
        onLineEnd={() => {
          console.log('hi');

          setNotes([]);
        }}
      />

      <Song>
        <Track>
          <Instrument type="synth" notes={notes}></Instrument>
        </Track>
      </Song>
    </>
  );
};

export default SheetMusicSlide;
