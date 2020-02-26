import React, { useState } from 'react';
import { Song, Track, Instrument, Effect } from 'reactronica';

import CodeEditor from './CodeEditor';
import StepsEditor from './StepsEditor';

import useSlideActions from '../hooks/useSlideActions';

const StepsEditorSlide = () => {
  // Reactronica State
  const [isPlaying, setIsPlaying] = useState(false);
  const [notes, setNotes] = useState([]);
  const [samplerSteps] = useState([
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

  // StepsEditor State
  const [showStepsEditor, setShowStepsEditor] = useState(false);
  const [showStepsEditorSteps, setShowStepsEditorSteps] = useState(false);

  // Code State
  // const [showCurrentStepState, setShowCurrentStepState] = useState(false);
  const [showOnStepPlay, setShowOnStepPlay] = useState(false);

  // Slides State
  const [codeIndex, setCodeIndex] = useState(0);
  const [currentStepIndex, setCurrentStepIndex] = useState();
  const [highlightedLines, setHighlightedLines] = useState([]);
  const [layout, setLayout] = useState('1-column');

  const codeSteps = [
    // ------------------------------------------------------------------------
    {
      title: 'How does Reactronica work with UI components?',
      code: `import { Song, Track, Instrument, Effect } from 'reactronica';

const Example = () => {
  return (
    <Song isPlaying={${isPlaying ? 'true' : 'false'}} bpm={70}>
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
  )
}`,
      action: index => {
        setLayout('1-column');
        setHighlightedLines([]);
        setCodeIndex(index);
      },
    },
    // ------------------------------------------------------------------------
    // Move code to left
    // ------------------------------------------------------------------------
    {
      title: 'How does Reactronica work with UI components?',
      code: null,
      action: index => {
        setLayout('2-column');
        setHighlightedLines([]);
        // setCodeIndex(index);
      },
    },
    // ------------------------------------------------------------------------
    {
      title: 'Refactor synth steps to state',
      code: `import { Song, Track, Instrument, Effect } from 'reactronica';

const Example = () => {
  const [synthSteps, setSynthSteps] = useState([
    ['A3', 'E3', 'C3'], null, ['F3', 'A3', 'C3'], null, 
    ['D3', 'F3', 'A3'], null, ['E3', 'G3', 'B3'], null,
  ]);

  return (
    <Song isPlaying={${isPlaying ? 'true' : 'false'}} bpm={70}>
      <Track
        steps={synthSteps}
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
  )
}`,
      action: index => {
        setSteps([null, null, null, null, null, null, null, null]);
        setShowOnStepPlay(false);
        setHighlightedLines([3, 4, 5, 6]);
        setCodeIndex(index);
      },
    },
    // ------------------------------------------------------------------------
    {
      title: 'Refactor synth steps to state',
      code: null,
      action: index => {
        setShowStepsEditor(false);
        setSteps([null, null, null, null, null, null, null, null]);
        setShowOnStepPlay(false);
        setHighlightedLines([11]);
        // setCodeIndex(index);
      },
    },
    // ------------------------------------------------------------------------
    {
      title: 'Add piano roll UI',
      code: `import { Song, Track, Instrument, Effect } from 'reactronica';

const Example = () => {
  const [synthSteps, setSynthSteps] = useState([
    ['A3', 'E3', 'C3'], null, ['F3', 'A3', 'C3'], null, 
    ['D3', 'F3', 'A3'], null, ['E3', 'G3', 'B3'], null,
  ]);

  return (
    <>
      <Song isPlaying={${isPlaying ? 'true' : 'false'}} bpm={70}>
        <Track
          steps={synthSteps}
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

      <PianoRoll />
    </>
  )
}`,
      action: index => {
        setShowStepsEditor(true);
        setSteps([null, null, null, null, null, null, null, null]);
        setShowOnStepPlay(false);
        setHighlightedLines([33]);
        setCodeIndex(index);
      },
    },
    // ------------------------------------------------------------------------
    {
      title: 'Give piano roll some props',
      code: `import { Song, Track, Instrument, Effect } from 'reactronica';

const Example = () => {
  const [synthSteps, setSynthSteps] = useState([
    ['A3', 'E3', 'C3'], null, ['F3', 'A3', 'C3'], null, 
    ['D3', 'F3', 'A3'], null, ['E3', 'G3', 'B3'], null,
  ]);

  return (
    <>
      <Song isPlaying={${isPlaying ? 'true' : 'false'}} bpm={70}>
        <Track
          steps={synthSteps}
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

      <PianoRoll 
        steps={synthSteps} 
      />
    </>
  )
}`,
      action: index => {
        setIsPlaying(false);
        setSteps(exampleSteps);
        setShowStepsEditorSteps(true);
        setShowOnStepPlay(false);
        setHighlightedLines([34]);
        setCodeIndex(index);
      },
    },
    // ------------------------------------------------------------------------
    {
      title: 'Have a listen',
      code: null,
      action: () => {
        setHighlightedLines([10]);
        setIsPlaying(true);
      },
    },
    // ------------------------------------------------------------------------
    {
      title: 'Add currentStep',
      code: `import { Song, Track, Instrument, Effect } from 'reactronica';

const Example = () => {
  const [synthSteps, setSynthSteps] = useState([
    ['A3', 'E3', 'C3'], null, ['F3', 'A3', 'C3'], null, 
    ['D3', 'F3', 'A3'], null, ['E3', 'G3', 'B3'], null,
  ]);
  const [currentStep, setCurrentStep] = useState();

  return (
    <>
      <Song isPlaying={${isPlaying ? 'true' : 'false'}} bpm={70}>
        <Track
          steps={synthSteps}
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

      <PianoRoll 
        steps={synthSteps} 
      />
    </>
  )
}`,
      action: index => {
        setSteps(exampleSteps);
        setShowStepsEditorSteps(true);
        setShowOnStepPlay(false);
        setHighlightedLines([7]);
        setCodeIndex(index);
      },
    },
    // ------------------------------------------------------------------------
    {
      title: 'Set currentStep with Track callback',
      code: `import { Song, Track, Instrument, Effect } from 'reactronica';

const Example = () => {
  const [synthSteps, setSynthSteps] = useState([
    ['A3', 'E3', 'C3'], null, ['F3', 'A3', 'C3'], null, 
    ['D3', 'F3', 'A3'], null, ['E3', 'G3', 'B3'], null,
  ]);
  const [currentStep, setCurrentStep] = useState();

  return (
    <>
      <Song isPlaying={${isPlaying ? 'true' : 'false'}} bpm={70}>
        <Track
          steps={synthSteps}
          onStepPlay={(_, i) => setCurrentStep(i)}
        >
          <Instrument 
            type="synth" ${
              notes.length > 0
                ? `
            notes={[{ name: '${notes[0].name}' }]}`
                : ''
            }
          />
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

      <PianoRoll 
        steps={synthSteps} 
        currentStep={currentStep}
      />
    </>
  )
}`,
      action: index => {
        setSteps(exampleSteps);
        setShowStepsEditorSteps(true);
        setShowOnStepPlay(false);
        setHighlightedLines([14]);
        setCodeIndex(index);
      },
    },
    // ------------------------------------------------------------------------
    {
      title: 'Playhead moves with the music',
      code: `import { Song, Track, Instrument, Effect } from 'reactronica';

const Example = () => {
  const [synthSteps, setSynthSteps] = useState([
    ['A3', 'E3', 'C3'], null, ['F3', 'A3', 'C3'], null, 
    ['D3', 'F3', 'A3'], null, ['E3', 'G3', 'B3'], null,
  ]);
  const [currentStep, setCurrentStep] = useState();

  return (
    <>
      <Song isPlaying={${isPlaying ? 'true' : 'false'}} bpm={70}>
        <Track
          steps={synthSteps}
          onStepPlay={(_, i) => setCurrentStep(i)}
        >
          <Instrument 
            type="synth" ${
              notes.length > 0
                ? `
            notes={[{ name: '${notes[0].name}' }]}`
                : ''
            }
          />
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

      <PianoRoll 
        steps={synthSteps} 
        currentStep={currentStep}
      />
    </>
  )
}`,
      action: index => {
        setShowOnStepPlay(true);
        setHighlightedLines([39]);
        setCodeIndex(index);
      },
    },
    // ------------------------------------------------------------------------
    {
      title: 'Notes can be played in realtime',
      code: `import { Song, Track, Instrument, Effect } from 'reactronica';

const Example = () => {
  const [synthSteps, setSynthSteps] = useState([
    ['A3', 'E3', 'C3'], null, ['F3', 'A3', 'C3'], null, 
    ['D3', 'F3', 'A3'], null, ['E3', 'G3', 'B3'], null,
  ]);
  const [currentStep, setCurrentStep] = useState();

  return (
    <>
      <Song isPlaying={${isPlaying ? 'true' : 'false'}} bpm={70}>
        <Track
          steps={synthSteps}
          onStepPlay={(_, i) => setCurrentStep(i)}
        >
          <Instrument 
            type="synth" ${
              notes.length > 0
                ? `
            notes={[{ name: '${notes[0].name}' }]}`
                : ''
            }
          />
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

      <PianoRoll 
        steps={synthSteps} 
        currentStep={currentStep}
      />
    </>
  )
}`,
      action: index => {
        // setShowOnStepPlay(true);
        // setHighlightedLines([14]);
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

  const [steps, setSteps] = useState(undefined);

  return (
    <div
      style={{
        display: 'flex',
        maxWidth: layout === '2-column' ? '100%' : 1050,
        width: '100%',
        margin: '0 auto',
        transition: '0.5s',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: 1050,
        }}
      >
        <CodeEditor
          contentEditable={false}
          style={{
            minWidth: 'auto',
          }}
          highlightedLines={highlightedLines}
          code={code}
        />

        <h2 className="codeTitle">{title}</h2>
      </div>

      <div
        style={{
          display: showStepsEditor ? 'block' : 'none',
          flex: 1,
          marginLeft: '3rem',
        }}
      >
        {showStepsEditor && (
          <>
            <StepsEditor
              defaultSteps={
                showStepsEditorSteps
                  ? steps
                  : [null, null, null, null, null, null, null, null]
              }
              startNote="C3"
              endNote="B3"
              currentStepIndex={showOnStepPlay ? currentStepIndex : undefined}
              style={{
                marginBottom: '1rem',
              }}
              onStepEditorClick={(steps, step, index) => {
                const newSteps = steps.map(stepNotes => {
                  if (stepNotes === null) {
                    return null;
                  }

                  return stepNotes.map(stepNote => {
                    return {
                      ...stepNote,
                      duration: 0.2,
                    };
                  });
                });
                setSteps(newSteps);
                console.log('Update steps', steps, step, index);
              }}
              onKeyboardDown={note => {
                setNotes([
                  {
                    name: note,
                  },
                ]);
                setHighlightedLines([18]);
              }}
              onKeyboardUp={note => {
                setNotes([]);
                setHighlightedLines([]);
              }}
            />

            <button
              className="demoButton"
              onClick={() => {
                setIsPlaying(!isPlaying);
              }}
            >
              {isPlaying ? 'Stop' : 'Play'}
            </button>
          </>
        )}
      </div>

      <Song isPlaying={isPlaying} bpm={70}>
        <Track
          steps={steps}
          onStepPlay={(_, index) => setCurrentStepIndex(index)}
        >
          <Instrument type="amSynth" notes={notes}></Instrument>

          <Effect type={'freeverb'} id={1} wet={0.7}></Effect>
        </Track>

        <Track
          steps={samplerSteps}
          // onStepPlay={(_, index) => setCurrentStepIndex(index)}
        >
          <Instrument
            type="sampler"
            samples={{
              C3: `${process.env.PUBLIC_URL}/audio/kick.wav`,
              D3: `${process.env.PUBLIC_URL}/audio/snare.wav`,
              E3: `${process.env.PUBLIC_URL}/audio/KBH_hihat_loop_140_-3db.wav`,
              F3: `${process.env.PUBLIC_URL}/audio/ABR_808_sub_barri_glide_Am.wav`,
            }}
          ></Instrument>
        </Track>
      </Song>
    </div>
  );
};

const exampleSteps = [
  [
    {
      name: 'A3',
      // duration: 0.2,
    },
    {
      name: 'C3',
      // duration: 0.2,
    },
    {
      name: 'E3',
      // duration: 0.2,
    },
  ],
  null,
  // [
  //   {
  //     name: 'A3',
  //     duration: 0.2,
  //   },
  //   {
  //     name: 'C3',
  //     duration: 0.2,
  //   },
  //   {
  //     name: 'E3',
  //     duration: 0.2,
  //   },
  // ],
  [
    {
      name: 'F3',
      // duration: 0.2,
    },
    {
      name: 'A3',
      // duration: 0.2,
    },
    {
      name: 'C3',
      // duration: 0.2,
    },
  ],
  null,
  // [
  //   {
  //     name: 'F3',
  //     duration: 0.2,
  //   },
  //   {
  //     name: 'A3',
  //     duration: 0.2,
  //   },
  //   {
  //     name: 'C3',
  //     duration: 0.2,
  //   },
  // ],
  [
    {
      name: 'D3',
      // duration: 0.2,
    },
    {
      name: 'F3',
      // duration: 0.2,
    },
    {
      name: 'A3',
      // duration: 0.2,
    },
  ],
  null,
  // [
  //   {
  //     name: 'D3',
  //     duration: 0.2,
  //   },
  //   {
  //     name: 'F3',
  //     duration: 0.2,
  //   },
  //   {
  //     name: 'A3',
  //     duration: 0.2,
  //   },
  // ],
  [
    {
      name: 'E3',
      // duration: 0.2,
    },
    {
      name: 'G3',
      // duration: 0.2,
    },
    {
      name: 'B3',
      // duration: 0.2,
    },
  ],
  null,
  // [
  //   {
  //     name: 'E3',
  //     duration: 0.2,
  //   },
  //   {
  //     name: 'G3',
  //     duration: 0.2,
  //   },
  //   {
  //     name: 'B3',
  //     duration: 0.2,
  //   },
  // ],
];

// const exampleStepsMeloncholy = [
//   [
//     {
//       name: 'A3',
//       duration: 1,
//     },
//     {
//       name: 'C3',
//       duration: 1,
//     },
//     {
//       name: 'E3',
//       duration: 1,
//     },
//   ],
//   null,
//   [
//     {
//       name: 'G3',
//       duration: 1,
//     },
//     {
//       name: 'B3',
//       duration: 1,
//     },
//     {
//       name: 'D3',
//       duration: 1,
//     },
//   ],
//   null,
//   [
//     {
//       name: 'A#3',
//       duration: 1,
//     },
//     {
//       name: 'D3',
//       duration: 1,
//     },
//     {
//       name: 'F3',
//       duration: 1,
//     },
//   ],
//   null,
//   [
//     {
//       name: 'A3',
//       duration: 1,
//     },
//     {
//       name: 'C3',
//       duration: 1,
//     },
//     {
//       name: 'E3',
//       duration: 1,
//     },
//   ],
//   null,
// ];

export default StepsEditorSlide;
