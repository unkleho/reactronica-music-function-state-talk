import React, { useState } from 'react';
import { Song, Track, Instrument, Effect } from 'reactronica';

import CodeEditor from './CodeEditor';
// import StepsEditor from './StepsEditor';

import useSlideActions from '../hooks/useSlideActions';

const StepsEditorSlide = () => {
  // Reactronica State
  const [isPlaying, setIsPlaying] = useState(false);
  const [bpm, setBpm] = useState(120);
  const [steps, setSteps] = useState([
    'A3',
    'E3',
    'C3',
    null,
    'A3',
    'E3',
    'C3',
    null,
  ]);
  const [samplerSteps, setSamplerSteps] = useState([
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
  ]);
  const [synthType, setSynthType] = useState('synth');
  const [effects, setEffects] = useState([]);

  // Code State
  const [codeIndex, setCodeIndex] = useState(0);
  const [highlightedLines, setHighlightedLines] = useState([]);
  const [highlightedTokens, setHighlightedTokens] = useState([]);
  const [codeFontSize, setCodeFontSize] = useState(null);
  const [importCode, setImportCode] = useState('');
  const [actionSlug, setActionSlug] = useState();

  // Store callback in ref as it needs to reference latest state variables
  const handleSynthStepPlay = React.useRef();

  handleSynthStepPlay.current = (_, index) => {
    let tokenSteps;
    let tokenStep;
    let line;

    if (actionSlug === 'play-single-notes') {
      tokenSteps = [6, 9, 12, 15, 6, 9, 12, 15];
      tokenStep = tokenSteps[index];

      setHighlightedTokens([
        {
          line: 7,
          tokens: [tokenStep],
        },
      ]);
    } else if (actionSlug === 'play-two-chords') {
      tokenSteps = [[7, 10, 13], [17], [21, 24, 27], [31]];
      tokenStep = tokenSteps[index % 4];

      setHighlightedTokens([
        {
          line: 7,
          tokens: tokenStep,
        },
      ]);
    } else if (
      actionSlug === 'play-four-chords' ||
      actionSlug === 'play-four-chords-and-beat' ||
      actionSlug === 'play-four-chords-and-beat-hat' ||
      actionSlug === 'play-four-chords-and-beat-hat-sub'
    ) {
      tokenSteps = [[3, 6, 9], [13], [17, 20, 23], [27]];
      tokenStep = tokenSteps[index % 4];
      line = index >= 4 ? 9 : 8;

      const beatTokenSteps = [6, 9, 12, 15];
      const beatHatTokenSteps = [[7, 10], [14], [17], [20]];
      const beatHatSubTokenSteps = [[7, 10, 13], [17], [20], [23]];

      setHighlightedTokens([
        {
          line,
          tokens: tokenStep,
        },
        ...(actionSlug === 'play-four-chords-and-beat'
          ? [
              {
                line: 17,
                tokens: [beatTokenSteps[index % 4]],
              },
            ]
          : []),
        ...(actionSlug === 'play-four-chords-and-beat-hat'
          ? [
              {
                line: 17,
                tokens: beatHatTokenSteps[index % 4],
              },
            ]
          : []),
        ...(actionSlug === 'play-four-chords-and-beat-hat-sub'
          ? [
              {
                line: 17,
                tokens: beatHatSubTokenSteps[index % 4],
              },
            ]
          : []),
      ]);
    }
  };

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
      title: 'Give Track an array of notes (steps)',
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
        setActionSlug('play-single-notes');
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
        setSteps(['A3', 'E3', 'C3', null, 'A3', 'E3', 'C3', null]);
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
        setActionSlug('play-two-chords');
        setSteps([
          ['A3', 'E3', 'C3'],
          null,
          ['F3', 'A3', 'C3'],
          null,
          ['A3', 'E3', 'C3'],
          null,
          ['F3', 'A3', 'C3'],
          null,
          // ['D3', 'F3', 'A3'],
          // null,
          // ['E3', 'G3', 'B3'],
          // null,
        ]);
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
        setSteps([
          ['A3', 'E3', 'C3'],
          null,
          ['F3', 'A3', 'C3'],
          null,
          ['A3', 'E3', 'C3'],
          null,
          ['F3', 'A3', 'C3'],
          null,
        ]);
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
      title: 'Make this chord progression a little bit more interesting',
      code: `return (
    <Song isPlaying={true} bpm={70}>
      <Track
        steps={[
          ['A3', 'E3', 'C3'], null, ['F3', 'A3', 'C3'], null, 
          ['D3', 'F3', 'A3'], null, ['E3', 'G3', 'B3'], null,
        ]}
      >
        <Instrument type="amSynth" />
        <Effect type="reverb" />
      </Track>
    </Song>
  )`,
      action: index => {
        setActionSlug('play-four-chords');
        setSteps([
          ['A3', 'E3', 'C3'],
          null,
          ['F3', 'A3', 'C3'],
          null,
          ['D3', 'F3', 'A3'],
          null,
          ['E3', 'G3', 'B3'],
          null,
        ]);
        setCodeFontSize(null);
        setHighlightedLines([7, 8, 9, 10]);
        setCodeIndex(index);
      },
    },
    {
      title: 'Add another track',
      code: `return (
    <Song isPlaying={true} bpm={70}>
      <Track
        steps={[
          ['A3', 'E3', 'C3'], null, ['F3', 'A3', 'C3'], null, 
          ['D3', 'F3', 'A3'], null, ['E3', 'G3', 'B3'], null,
        ]}
      >
        <Instrument type="amSynth" />
        <Effect type="reverb" />
      </Track>

      <Track>
      </Track>
    </Song>
  )`,
      action: index => {
        setHighlightedLines([16, 17]);
        setCodeIndex(index);
      },
    },
    {
      title: "This time we'll use a sampler Instrument",
      code: `return (
    <Song isPlaying={true} bpm={70}>
      <Track
        steps={[
          ['A3', 'E3', 'C3'], null, ['F3', 'A3', 'C3'], null, 
          ['D3', 'F3', 'A3'], null, ['E3', 'G3', 'B3'], null,
        ]}
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
        setHighlightedLines([17, 18, 19]);
        setCodeIndex(index);
      },
    },
    {
      title: 'Assign a kick sample to C3',
      code: `return (
    <Song isPlaying={true} bpm={70}>
      <Track
        steps={[
          ['A3', 'E3', 'C3'], null, ['F3', 'A3', 'C3'], null, 
          ['D3', 'F3', 'A3'], null, ['E3', 'G3', 'B3'], null,
        ]}
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
        // setCodeFontSize('24px');
        setSamplerSteps([null, null, null, null, null, null, null, null]);
        setHighlightedLines([19, 20, 21]);
        setCodeIndex(index);
      },
    },
    {
      title: 'Update Track steps',
      code: `return (
    <Song isPlaying={true} bpm={70}>
      <Track
        steps={[
          ['A3', 'E3', 'C3'], null, ['F3', 'A3', 'C3'], null, 
          ['D3', 'F3', 'A3'], null, ['E3', 'G3', 'B3'], null,
        ]}
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
        setActionSlug('play-four-chords-and-beat');
        setSamplerSteps(['C3', null, 'C3', null, 'C3', null, 'C3', null]);
        setHighlightedLines([17]);
        setCodeIndex(index);
      },
    },
    {
      title: 'We assign a snare to D3',
      code: `return (
    <Song isPlaying={true} bpm={70}>
      <Track
        steps={[
          ['A3', 'E3', 'C3'], null, ['F3', 'A3', 'C3'], null, 
          ['D3', 'F3', 'A3'], null, ['E3', 'G3', 'B3'], null,
        ]}
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
        setSamplerSteps(['C3', null, 'C3', null, 'C3', null, 'C3', null]);
        setHighlightedLines([23]);
        setCodeIndex(index);
      },
    },
    {
      title: 'Now we have a beat',
      code: `return (
    <Song isPlaying={true} bpm={70}>
      <Track
        steps={[
          ['A3', 'E3', 'C3'], null, ['F3', 'A3', 'C3'], null, 
          ['D3', 'F3', 'A3'], null, ['E3', 'G3', 'B3'], null,
        ]}
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
        setSamplerSteps(['C3', 'D3', 'C3', 'D3', 'C3', 'D3', 'C3', 'D3']);
        setHighlightedLines([17]);
        setCodeIndex(index);
      },
    },
    {
      title: 'Bring on some hihats',
      code: `return (
    <Song isPlaying={true} bpm={70}>
      <Track
        steps={[
          ['A3', 'E3', 'C3'], null, ['F3', 'A3', 'C3'], null, 
          ['D3', 'F3', 'A3'], null, ['E3', 'G3', 'B3'], null,
        ]}
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
        setActionSlug('play-four-chords-and-beat-hat');
        setIsPlaying(true);
        setSamplerSteps([
          ['C3', { name: 'E3', duration: 4 }],
          'D3',
          'C3',
          'D3',
          ['C3', { name: 'E3', duration: 4 }],
          'D3',
          'C3',
          'D3',
        ]);
        setHighlightedLines([17, 24]);
        setCodeIndex(index);
      },
    },
    {
      title: 'We need some bottom end',
      code: `return (
    <Song isPlaying={true} bpm={70}>
      <Track
        steps={[
          ['A3', 'E3', 'C3'], null, ['F3', 'A3', 'C3'], null, 
          ['D3', 'F3', 'A3'], null, ['E3', 'G3', 'B3'], null,
        ]}
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
        setActionSlug('play-four-chords-and-beat-hat-sub');
        setIsPlaying(true);
        setSamplerSteps([
          [
            'C3',
            { name: 'E3', duration: 4 },
            { name: 'F3', duration: 4, velocity: 0.5 },
          ],
          'D3',
          'C3',
          'D3',
          [
            'C3',
            { name: 'E3', duration: 4 },
            { name: 'F3', duration: 4, velocity: 0.5 },
          ],
          'D3',
          'C3',
          'D3',
        ]);
        setHighlightedLines([17, 25]);
        setCodeIndex(index);
      },
    },
    {
      title: 'Stop the music',
      code: `return (
    <Song isPlaying={false} bpm={70}>
      <Track
        steps={[
          ['A3', 'E3', 'C3'], null, ['F3', 'A3', 'C3'], null, 
          ['D3', 'F3', 'A3'], null, ['E3', 'G3', 'B3'], null,
        ]}
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
            D3: '/audio/snare.wav'
            E3: '/audio/hihat-loop.wav',
            F3: '/audio/sub.wav',
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
          width: '100%',
          maxWidth: 1050,
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
          highlightedTokens={highlightedTokens}
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
          onStepPlay={(_, index) => handleSynthStepPlay.current(_, index)}
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
