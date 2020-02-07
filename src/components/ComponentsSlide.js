import React, { useState } from 'react';
import { Song, Track, Instrument, Effect } from 'reactronica';

import CodeEditor from './CodeEditor';
// import StepsEditor from './StepsEditor';

import useSlideActions from '../hooks/useSlideActions';

const StepsEditorSlide = () => {
  // Reactronica State
  const [isPlaying, setIsPlaying] = useState(false);
  const [bpm, setBpm] = useState(120);
  const [steps, setSteps] = useState(['A3', 'E3', 'C3', null]);
  const [samplerSteps, setSamplerSteps] = useState([null, null, null, null]);
  const [synthType, setSynthType] = useState('synth');
  const [effects, setEffects] = useState([]);

  // Code State
  const [codeIndex, setCodeIndex] = useState(0);
  const [highlightedLines, setHighlightedLines] = useState([]);
  const [codeFontSize, setCodeFontSize] = useState(null);
  const [importCode, setImportCode] = useState('');

  const codeSteps = [
    {
      title: 'Start with a function component',
      code: `return (
  )`,
      action: index => {
        setImportCode('');
        setHighlightedLines([]);
        setCodeIndex(index);
      },
    },
    {
      title: 'Import Song component',
      code: `return (
  )`,
      action: index => {
        setImportCode(`import { Song } from 'reactronica';
        
`);
        setHighlightedLines([1]);
        setCodeIndex(index);
      },
    },
    {
      title: 'Add Song props',
      code: `return (
    <Song isPlaying={false} bpm={120}>
    </Song>
  )`,
      action: index => {
        setImportCode(`import { Song } from 'reactronica';
        
`);
        setHighlightedLines([5]);
        setCodeIndex(index);
      },
    },
    {
      title: 'Song needs a Track component',
      code: `return (
    <Song isPlaying={false} bpm={120}>
      <Track>
      </Track>
    </Song>
  )`,
      action: index => {
        setImportCode(`import { Song, Track } from 'reactronica';
        
`);
        setHighlightedLines([6, 7]);
        setCodeIndex(index);
      },
    },
    {
      title: 'Track needs an array of notes (steps)',
      code: `return (
    <Song isPlaying={false} bpm={120}>
      <Track
        steps={['A3', 'E3', 'C3', null]}
      >
      </Track>
    </Song>
  )`,
      action: index => {
        setImportCode(`import { Song, Track } from 'reactronica';
        
`);
        setHighlightedLines([7]);
        setCodeIndex(index);
      },
    },
    {
      title: 'Use the Instrument component play steps with a synth',
      code: `return (
    <Song isPlaying={false} bpm={120}>
      <Track
        steps={['A3', 'E3', 'C3', null]}
      >
        <Instrument type="synth" />
      </Track>
    </Song>
  )`,
      action: index => {
        setImportCode(`import { Song, Track, Instrument } from 'reactronica';
        
`);
        setIsPlaying(false);
        setHighlightedLines([9]);
        setCodeIndex(index);
      },
    },
    {
      title: 'Lets play!',
      code: `return (
    <Song isPlaying={true} bpm={120}>
      <Track
        steps={['A3', 'E3', 'C3', null]}
      >
        <Instrument type="synth" />
      </Track>
    </Song>
  )`,
      action: index => {
        setBpm(120);
        setIsPlaying(true);
        setHighlightedLines([5]);
        setCodeIndex(index);
      },
    },
    {
      title: 'Whoah, slow down the tempo',
      code: `return (
    <Song isPlaying={true} bpm={70}>
      <Track
        steps={['A3', 'E3', 'C3', null]}
      >
        <Instrument type="synth" />
      </Track>
    </Song>
  )`,
      action: index => {
        setBpm(70);
        setSteps(['A3', 'E3', 'C3', null]);
        setHighlightedLines([5]);
        setCodeIndex(index);
      },
    },
    {
      title: 'Change single notes to chords',
      code: `return (
    <Song isPlaying={true} bpm={70}>
      <Track
        steps={[['A3', 'E3', 'C3'], null, ['F3', 'A3', 'C3'], null]}
      >
        <Instrument type="synth" />
      </Track>
    </Song>
  )`,
      action: index => {
        setSteps([['A3', 'E3', 'C3'], null, ['F3', 'A3', 'C3'], null]);
        setSynthType('synth');
        setHighlightedLines([7]);
        setCodeIndex(index);
      },
    },
    {
      title: 'Change to Frequency Modulated Synth',
      code: `return (
    <Song isPlaying={true} bpm={70}>
      <Track
        steps={[['A3', 'E3', 'C3'], null, ['F3', 'A3', 'C3'], null]}
      >
        <Instrument type="fmSynth" />
      </Track>
    </Song>
  )`,
      action: index => {
        setImportCode(`import { Song, Track, Instrument } from 'reactronica';
        
`);
        setSynthType('fmSynth');
        setEffects([]);
        setHighlightedLines([9]);
        setCodeIndex(index);
      },
    },
    {
      title: 'Amplitude Modulated Synth',
      code: `return (
    <Song isPlaying={true} bpm={70}>
      <Track
        steps={[['A3', 'E3', 'C3'], null, ['F3', 'A3', 'C3'], null]}
      >
        <Instrument type="amSynth" />
      </Track>
    </Song>
  )`,
      action: index => {
        setSynthType('amSynth');
        setEffects([]);
        setHighlightedLines([9]);
        setCodeIndex(index);
      },
    },
    {
      title: 'Add Effect component inside Track',
      code: `return (
    <Song isPlaying={true} bpm={70}>
      <Track
        steps={[['A3', 'E3', 'C3'], null, ['F3', 'A3', 'C3'], null]}
      >
        <Instrument type="amSynth" />
        <Effect type="reverb" />
      </Track>
    </Song>
  )`,
      action: index => {
        setImportCode(`import { Song, Track, Instrument, Effect } from 'reactronica';
        
`);
        setCodeFontSize(null);
        setEffects([
          {
            type: 'freeverb',
          },
        ]);
        setHighlightedLines([10]);
        setCodeIndex(index);
      },
    },
    {
      title: 'Add another track',
      code: `return (
    <Song isPlaying={true} bpm={70}>
      <Track
        steps={[['A3', 'E3', 'C3'], null, ['F3', 'A3', 'C3'], null]}
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
        setHighlightedLines([12, 13]);
        setCodeIndex(index);
      },
    },
    {
      title: "This time we'll use a sampler Instrument",
      code: `return (
    <Song isPlaying={true} bpm={70}>
      <Track
        steps={[['A3', 'E3', 'C3'], null, ['F3', 'A3', 'C3'], null]}
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
        setHighlightedLines([13, 14, 15]);
        setCodeIndex(index);
      },
    },
    {
      title: 'Assign a kick sample to C3',
      code: `return (
    <Song isPlaying={true} bpm={70}>
      <Track
        steps={[['A3', 'E3', 'C3'], null, ['F3', 'A3', 'C3'], null]}
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
        setHighlightedLines([15, 16, 17]);
        setCodeIndex(index);
      },
    },
    {
      title: 'Update Track steps',
      code: `return (
    <Song isPlaying={true} bpm={70}>
      <Track
        steps={[['A3', 'E3', 'C3'], null, ['F3', 'A3', 'C3'], null]}
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
        setHighlightedLines([13]);
        setCodeIndex(index);
      },
    },
    {
      title: 'We assign a snare to D3',
      code: `return (
    <Song isPlaying={true} bpm={70}>
      <Track
        steps={[['A3', 'E3', 'C3'], null, ['F3', 'A3', 'C3'], null]}
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
        setHighlightedLines([19]);
        setCodeIndex(index);
      },
    },
    {
      title: 'Now we have a beat',
      code: `return (
    <Song isPlaying={true} bpm={70}>
      <Track
        steps={[['A3', 'E3', 'C3'], null, ['F3', 'A3', 'C3'], null]}
      >
        <Instrument type="amSynth" />
        <Effect type="reverb" />
      </Track>
      <Track
        steps={['C3', 'D3', 'C3', 'D3']}
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
        setIsPlaying(true);
        setSamplerSteps(['C3', 'D3', 'C3', 'D3']);
        setHighlightedLines([13]);
        setCodeIndex(index);
      },
    },
    {
      title: 'Bring on some hihats',
      code: `return (
    <Song isPlaying={true} bpm={70}>
      <Track
        steps={[['A3', 'E3', 'C3'], null, ['F3', 'A3', 'C3'], null]}
      >
        <Instrument type="amSynth" />
        <Effect type="reverb" />
      </Track>
      <Track
        steps={[['C3', 'E3'], 'D3', 'C3', 'D3']}
      >
        <Instrument
          type="sampler" 
          samples={{
            C3: '/audio/kick.wav',
            D3: '/audio/snare.wav',
            E3: '/audio/hihat-loop.wav',
          }}
        />
      </Track>
    </Song>
  )`,
      action: index => {
        setIsPlaying(true);
        setSamplerSteps([
          ['C3', { name: 'E3', duration: 4 }],
          'D3',
          'C3',
          'D3',
        ]);
        setHighlightedLines([13, 20]);
        setCodeIndex(index);
      },
    },
    {
      title: 'We need some bottom end',
      code: `return (
    <Song isPlaying={true} bpm={70}>
      <Track
        steps={[['A3', 'E3', 'C3'], null, ['F3', 'A3', 'C3'], null]}
      >
        <Instrument type="amSynth" />
        <Effect type="reverb" />
      </Track>
      <Track
        steps={[['C3', 'E3', 'F3'], 'D3', 'C3', 'D3']}
      >
        <Instrument
          type="sampler" 
          samples={{
            C3: '/audio/kick.wav',
            D3: '/audio/snare.wav',
            E3: '/audio/hihat-loop.wav',
            F3: '/audio/sub.wav',
          }}
        />
      </Track>
    </Song>
  )`,
      action: index => {
        setIsPlaying(true);
        setSamplerSteps([
          ['C3', { name: 'E3', duration: 4 }, { name: 'F3', duration: 4 }],
          'D3',
          'C3',
          'D3',
        ]);
        setHighlightedLines([13, 21]);
        setCodeIndex(index);
      },
    },
    {
      title: 'Stop the music',
      code: `return (
    <Song isPlaying={false} bpm={70}>
      <Track
        steps={[['A3', 'E3', 'C3'], null, ['F3', 'A3', 'C3'], null]}
      >
        <Instrument type="amSynth" />
        <Effect type="reverb" />
      </Track>
      <Track
        steps={['C3', 'D3', 'C3', 'D3']}
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
        setIsPlaying(false);
        setHighlightedLines([5]);
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
          width: '55%',
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
          code={`${importCode}const Example = () => {
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

      <Song isPlaying={isPlaying} bpm={bpm}>
        <Track
          steps={steps}
          // onStepPlay={(_, index) => setCurrentStepIndex(index)}
        >
          <Instrument type={synthType}></Instrument>

          {effects.map((effect, i) => {
            return (
              <Effect type={effect.type} id={i} key={i} wet={0.7}></Effect>
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
              E3: '/audio/KBH_hihat_loop_140_-3db.wav',
              F3: '/audio/ABR_808_sub_barri_glide_Am.wav',
            }}
          ></Instrument>
        </Track>
      </Song>
    </>
  );
};

export default StepsEditorSlide;
