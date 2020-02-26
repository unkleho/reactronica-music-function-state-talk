import React from 'react';
import { Song, Track, Instrument } from 'reactronica';

import { MainHeading, Text, SubHeading } from '../App';
import WaveAnimation from '../components/WaveAnimation/WaveAnimation';

const IntroSlide = () => {
  const [notes, setNotes] = React.useState([]);

  return (
    <>
      <Text>
        <strong>Music</strong> as a Function of <strong>State</strong>
      </Text>
      <MainHeading>Reactronica</MainHeading>
      <WaveAnimation
        onMouseDown={() => {
          setNotes([
            {
              name: 'A3',
            },
            {
              name: 'C3',
            },
            {
              name: 'E3',
            },
          ]);
        }}
        onMouseUp={() => {
          setNotes([]);
        }}
        // strokeColour={notes.length > 0 ? 'red' : undefined}
        transform={notes.length > 0 ? 'scale(1,2)' : undefined}
      ></WaveAnimation>
      <br />
      <br />
      <SubHeading size={5}>
        Kaho Cheung / <a href="https://twitter.com/unkleho">@unkleho</a>
      </SubHeading>
      <br></br>
      <Text fontSize="2rem">DX Lab, State Library of NSW</Text>

      <Song>
        <Track>
          <Instrument type="synth" notes={notes} />
        </Track>
      </Song>
    </>
  );
};

export default IntroSlide;
