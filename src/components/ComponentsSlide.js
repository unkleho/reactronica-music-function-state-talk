import React, { useState } from 'react';
import { Song, Track, Instrument, Effect } from 'reactronica';

import CodeEditor from './CodeEditor';
// import StepsEditor from './StepsEditor';

import useSlideActions from '../hooks/useSlideActions';

const StepsEditorSlide = () => {
  // Reactronica State
  const [isPlaying, setIsPlaying] = useState(false);
  const [steps, setSteps] = useState(['A3', 'C3', 'E3', null]);
  const [samplerSteps, setSamplerSteps] = useState([null, null, null, null]);
  const [synthType, setSynthType] = useState('synth');
  const [effects, setEffects] = useState([]);

  // Code State
  const [codeIndex, setCodeIndex] = useState(0);
  // const [currentStepIndex, setCurrentStepIndex] = useState();
  const [highlightedLines, setHighlightedLines] = useState([]);

  const codeSteps = [
    {
      title: 'Start with function component',
      code: `return (
  )`,
      action: index => {
        setHighlightedLines([]);
        setCodeIndex(index);
      },
    },
    {
      title: 'Add Song component',
      code: `return (
    <Song isPlaying={false} bpm={70}>
    </Song>
  )`,
      action: index => {
        setHighlightedLines([3, 4]);
        setCodeIndex(index);
      },
    },
    {
      title: 'Add Track component',
      code: `return (
    <Song isPlaying={false} bpm={70}>
      <Track
      >
      </Track>
    </Song>
  )`,
      action: index => {
        setHighlightedLines([4, 5, 6]);
        setCodeIndex(index);
      },
    },
    {
      title: 'Add steps',
      code: `return (
    <Song isPlaying={false} bpm={70}>
      <Track
        steps={['A3', 'C3', 'E3', null]}
      >
      </Track>
    </Song>
  )`,
      action: index => {
        setHighlightedLines([5]);
        setCodeIndex(index);
      },
    },
    {
      title: 'Add Instrument component',
      code: `return (
    <Song isPlaying={false} bpm={70}>
      <Track
        steps={['A3', 'C3', 'E3', null]}
      >
        <Instrument type="synth"></Instrument>
      </Track>
    </Song>
  )`,
      action: index => {
        setIsPlaying(false);
        setHighlightedLines([7]);
        setCodeIndex(index);
      },
    },
    {
      title: 'Lets play!',
      code: `return (
    <Song isPlaying={true} bpm={70}>
      <Track
        steps={['A3', 'C3', 'E3', null]}
      >
        <Instrument type="synth"></Instrument>
      </Track>
    </Song>
  )`,
      action: index => {
        setIsPlaying(true);
        setHighlightedLines([3]);
        setCodeIndex(index);
      },
    },
    {
      title: 'Change single notes to chords',
      code: `return (
    <Song isPlaying={true} bpm={70}>
      <Track
        steps={[['A3', 'C3', 'E3'], null, ['F3', 'A3', 'C3'], null]}
      >
        <Instrument type="synth"></Instrument>
      </Track>
    </Song>
  )`,
      action: index => {
        setSteps([['A3', 'C3', 'E3'], null, ['F3', 'A3', 'C3'], null]);
        setSynthType('synth');
        setHighlightedLines([5]);
        setCodeIndex(index);
      },
    },
    {
      title: 'Change synth to amSynth',
      code: `return (
    <Song isPlaying={true} bpm={70}>
      <Track
        steps={[['A3', 'C3', 'E3'], null, ['F3', 'A3', 'C3'], null]}
      >
        <Instrument type="amSynth"></Instrument>
      </Track>
    </Song>
  )`,
      action: index => {
        setSynthType('amSynth');
        setEffects([]);
        setHighlightedLines([5]);
        setCodeIndex(index);
      },
    },
    {
      title: 'Add Effect component inside Track',
      code: `return (
    <Song isPlaying={true} bpm={70}>
      <Track
        steps={[['A3', 'C3', 'E3'], null, ['F3', 'A3', 'C3'], null]}
      >
        <Instrument type="amSynth"></Instrument>
        <Effect type="freeverb" />
      </Track>
    </Song>
  )`,
      action: index => {
        setEffects([
          {
            type: 'freeverb',
          },
        ]);
        setHighlightedLines([8]);
        setCodeIndex(index);
      },
    },
    {
      title: 'Add another track with a kick sample',
      code: `return (
    <Song isPlaying={true} bpm={70}>
      <Track
        steps={[['A3', 'C3', 'E3'], null, ['F3', 'A3', 'C3'], null]}
      >
        <Instrument type="amSynth"></Instrument>
      </Track>
      <Track
        steps={['C3', null, 'C3', null]}
      >
        <Instrument type="sampler" 
          samples={{
            C3: '/audio/kick.wav',
          }}
        />
      </Track>
    </Song>
  )`,
      action: index => {
        setEffects([]);
        setSamplerSteps(['C3', null, 'C3', null]);
        setHighlightedLines([12, 13, 14, 15, 16]);
        setCodeIndex(index);
      },
    },
    {
      title: 'Add a snare sample',
      code: `return (
    <Song isPlaying={true} bpm={70}>
      <Track
        steps={[['A3', 'C3', 'E3'], null, ['F3', 'A3', 'C3'], null]}
      >
        <Instrument type="amSynth"></Instrument>
      </Track>
      <Track
        steps={['C3', null, 'C3', null]}
      >
        <Instrument type="sampler" 
          samples={{
            C3: '/audio/kick.wav',
            D3: '/audio/snare.wav'
          }}
        />
      </Track>
    </Song>
  )`,
      action: index => {
        setSamplerSteps(['C3', null, 'C3', null]);
        setHighlightedLines([15]);
        setCodeIndex(index);
      },
    },
    {
      title: 'Multi tracks with sampler',
      code: `return (
    <Song isPlaying={true} bpm={70}>
      <Track
        steps={[['A3', 'C3', 'E3'], null, ['F3', 'A3', 'C3'], null]}
      >
        <Instrument type="amSynth"></Instrument>
      </Track>
      <Track
        steps={['C3', 'D3', 'C3', 'D3']}
      >
        <Instrument type="sampler" 
          samples={{
            C3: '/audio/kick.wav',
            D3: '/audio/snare.wav'
          }}
        />
      </Track>
    </Song>
  )`,
      action: index => {
        setSamplerSteps(['C3', 'D3', 'C3', 'D3']);
        setHighlightedLines([10]);
        setCodeIndex(index);
      },
    },
  ];

  // Derive actions from codeSteps
  const slideActions = codeSteps.map(codeStep => {
    return codeStep.action;
  });

  // Pass slideActions into hook to allow control from up/down keyboard events
  useSlideActions(slideActions);

  const code = codeSteps[codeIndex].code;
  const title = codeSteps[codeIndex] && codeSteps[codeIndex].title;

  return (
    <>
      <CodeEditor
        contentEditable={false}
        style={{
          minWidth: 'auto',
          width: '50%',
          fontSize: '32px',
          margin: '0 auto',
          // marginRight: '2rem',
        }}
        highlightedLines={highlightedLines}
        code={`() => {
  ${code}
}`}
      />

      {title && (
        <h2
          style={{ marginBottom: '3rem', fontWeight: '500', fontSize: '32px' }}
        >
          {title}
        </h2>
      )}

      <div
        style={{
          width: '50%',
          display: 'none',
        }}
      >
        {/* <StepsEditor
          // defaultSteps={steps}
          startNote="C3"
          endNote="B3"
          // currentStepIndex={showOnStepPlay ? currentStepIndex : undefined}
          style={{
            marginBottom: '1rem',
          }}
          onStepEditorClick={(steps, step, index) => {
            console.log('Update steps', steps, step, index);
          }}
        /> */}

        <button
          className="demoButton"
          onClick={() => {
            setIsPlaying(!isPlaying);
          }}
        >
          {isPlaying ? 'Stop' : 'Play'}
        </button>
      </div>

      <Song isPlaying={isPlaying} bpm={70}>
        <Track
          steps={steps}
          // onStepPlay={(_, index) => setCurrentStepIndex(index)}
        >
          <Instrument type={synthType}></Instrument>

          {effects.map((effect, i) => {
            return <Effect type={effect.type} id={i} key={i}></Effect>;
          })}
        </Track>
        <Track
          steps={samplerSteps}
          // onStepPlay={(_, index) => setCurrentStepIndex(index)}
        >
          <Instrument
            type="sampler"
            samples={{
              C3: '/audio/kick.wav',
              D3: '/audio/snare.wav',
            }}
          ></Instrument>
        </Track>
      </Song>
    </>
  );
};

export default StepsEditorSlide;
