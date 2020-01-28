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
  const [highlightedLines, setHighlightedLines] = useState([]);
  const [codeFontSize, setCodeFontSize] = useState(null);

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
    <Song>
    </Song>
  )`,
      action: index => {
        setHighlightedLines([3, 4]);
        setCodeIndex(index);
      },
    },
    {
      title: 'Add Song props',
      code: `return (
    <Song isPlaying={false} bpm={70}>
    </Song>
  )`,
      action: index => {
        setHighlightedLines([3]);
        setCodeIndex(index);
      },
    },
    {
      title: 'Add Track component',
      code: `return (
    <Song isPlaying={false} bpm={70}>
      <Track>
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
        <Instrument type="synth" />
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
        <Instrument type="synth" />
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
        <Instrument type="synth" />
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
        <Instrument type="amSynth" />
      </Track>
    </Song>
  )`,
      action: index => {
        setSynthType('amSynth');
        setEffects([]);
        setHighlightedLines([7]);
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
        <Instrument type="amSynth" />
        <Effect type="reverb" />
      </Track>
    </Song>
  )`,
      action: index => {
        setCodeFontSize(null);
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
      title: 'Add another track',
      code: `return (
    <Song isPlaying={true} bpm={70}>
      <Track
        steps={[['A3', 'C3', 'E3'], null, ['F3', 'A3', 'C3'], null]}
      >
        <Instrument type="amSynth" />
        <Effect type="reverb" />
      </Track>
      <Track>
      </Track>
    </Song>
  )`,
      action: index => {
        // setEffects([]);
        setHighlightedLines([9, 10, 11]);
        setCodeIndex(index);
      },
    },
    {
      title: 'Add sampler Instrument',
      code: `return (
    <Song isPlaying={true} bpm={70}>
      <Track
        steps={[['A3', 'C3', 'E3'], null, ['F3', 'A3', 'C3'], null]}
      >
        <Instrument type="amSynth" />
        <Effect type="reverb" />
      </Track>
      <Track>
        <Instrument 
          type="sampler" 
        />
      </Track>
    </Song>
  )`,
      action: index => {
        // setEffects([]);
        setCodeFontSize('24px');
        // setSamplerSteps(['C3', null, 'C3', null]);
        setHighlightedLines([11, 12, 13]);
        setCodeIndex(index);
      },
    },
    {
      title: 'Add a kick sample',
      code: `return (
    <Song isPlaying={true} bpm={70}>
      <Track
        steps={[['A3', 'C3', 'E3'], null, ['F3', 'A3', 'C3'], null]}
      >
        <Instrument type="amSynth" />
        <Effect type="reverb" />
      </Track>
      <Track>
        <Instrument
          type="sampler" 
          samples={{
            C3: '/audio/kick.wav',
          }}
        />
      </Track>
    </Song>
  )`,
      action: index => {
        // setEffects([]);
        setCodeFontSize('24px');
        setSamplerSteps(undefined);
        setHighlightedLines([13, 14, 15]);
        setCodeIndex(index);
      },
    },
    {
      title: 'Update sampler steps',
      code: `return (
    <Song isPlaying={true} bpm={70}>
      <Track
        steps={[['A3', 'C3', 'E3'], null, ['F3', 'A3', 'C3'], null]}
      >
        <Instrument type="amSynth" />
        <Effect type="reverb" />
      </Track>
      <Track
        steps={['C3', null, 'C3', null]}
      >
        <Instrument
          type="sampler" 
          samples={{
            C3: '/audio/kick.wav',
          }}
        />
      </Track>
    </Song>
  )`,
      action: index => {
        // setEffects([]);
        setCodeFontSize('24px');
        setSamplerSteps(['C3', null, 'C3', null]);
        setHighlightedLines([11]);
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
        <Instrument type="amSynth" />
        <Effect type="reverb" />
      </Track>
      <Track
        steps={['C3', null, 'C3', null]}
      >
        <Instrument 
          type="sampler" 
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
        setHighlightedLines([17]);
        setCodeIndex(index);
      },
    },
    {
      title: 'Update drum steps',
      code: `return (
    <Song isPlaying={true} bpm={70}>
      <Track
        steps={[['A3', 'C3', 'E3'], null, ['F3', 'A3', 'C3'], null]}
      >
        <Instrument type="amSynth" />
        <Effect type="reverb" />
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
        setIsPlaying(true);
        setSamplerSteps(['C3', 'D3', 'C3', 'D3']);
        setHighlightedLines([11]);
        setCodeIndex(index);
      },
    },
    {
      title: 'Stop the music',
      code: `return (
    <Song isPlaying={false} bpm={70}>
      <Track
        steps={[['A3', 'C3', 'E3'], null, ['F3', 'A3', 'C3'], null]}
      >
        <Instrument type="amSynth" />
        <Effect type="reverb" />
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
        setIsPlaying(false);
        setHighlightedLines([3]);
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
      <div
        style={{
          width: '50%',
          margin: '0 auto',
        }}
      >
        <CodeEditor
          contentEditable={false}
          style={{
            minWidth: 'auto',
            fontSize: codeFontSize || '32px',
          }}
          highlightedLines={highlightedLines}
          code={`() => {
  ${code}
}`}
        />

        {title && <h2 className="codeTitle">{title}</h2>}
      </div>

      <div
        style={{
          width: '50%',
          display: 'none',
        }}
      >
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
            return (
              <Effect type={effect.type} id={i} key={i} wet={0.5}></Effect>
            );
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
