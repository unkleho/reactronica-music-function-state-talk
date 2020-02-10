import React, { useState } from 'react';
import { Song, Track, Instrument } from 'reactronica';

import CodeEditor from './CodeEditor';
import StepsEditor from './StepsEditor';

import useSlideActions from '../hooks/useSlideActions';

const StepsEditorSlide = () => {
  // Reactronica State
  const [isPlaying, setIsPlaying] = useState(false);
  const [notes, setNotes] = useState([]);

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
    // {
    //   title: 'How does Reactronica work with UI components?',
    //   action: index => {
    //     setCodeIndex(index);
    //   },
    // },
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
        setShowStepsEditor(false);
        setHighlightedLines([]);
        setCodeIndex(index);
      },
    },
    {
      title: 'Lets add a step editor UI',
      code: `import { Song, Track, Instrument, Effect } from 'reactronica';

const Example = () => {
  return (
    <>
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

      <StepsEditor />
    </>
  )
}`,
      action: index => {
        setLayout('2-column');
        setShowStepsEditor(true);
        setSteps([null, null, null, null, null, null, null, null]);
        setShowOnStepPlay(false);
        setHighlightedLines([9]);
        setCodeIndex(index);
      },
    },
    {
      title: 'Add some state for steps',
      code: `const [steps, setSteps] = useState(defaultSteps);

return (
  <>
    <Song isPlaying={${isPlaying ? 'true' : 'false'}} bpm={100}>
      <Track>
        <Instrument type="synth" />
      </Track>
    </Song>

    <StepsEditor />
  </>
)`,
      action: index => {
        setShowStepsEditor(true);
        setSteps(exampleSteps);
        setHighlightedLines([1]);
        setCodeIndex(index);
      },
    },
    {
      title: 'Add steps to Track props',
      code: `const [steps, setSteps] = useState(defaultSteps);

return (
  <>
    <Song isPlaying={${isPlaying ? 'true' : 'false'}} bpm={100}>
      <Track 
        steps={steps}
      >
        <Instrument type="synth" />
      </Track>
    </Song>

    <StepsEditor />
  </>
)`,
      action: index => {
        setIsPlaying(false);
        setShowStepsEditorSteps(false);
        setHighlightedLines([7]);
        setCodeIndex(index);
      },
    },
    {
      title: 'Have a listen',
      code: `const [steps, setSteps] = useState(defaultSteps);

return (
  <>
    <Song isPlaying={${isPlaying ? 'true' : 'false'}} bpm={100}>
      <Track 
        steps={steps}
      >
        <Instrument type="synth" />
      </Track>
    </Song>

    <StepsEditor />
  </>
)`,
      action: index => {
        setIsPlaying(true);
        setShowStepsEditorSteps(false);
        setHighlightedLines([5]);
        setCodeIndex(index);
      },
    },
    {
      title: 'Add steps to Steps editor props',
      code: `const [steps, setSteps] = useState(defaultSteps);

return (
  <>
    <Song isPlaying={${isPlaying ? 'true' : 'false'}} bpm={100}>
      <Track 
        steps={steps}
      >
        <Instrument type="synth" />
      </Track>
    </Song>

    <StepsEditor steps={steps} />
  </>
)`,
      action: index => {
        setShowStepsEditorSteps(true);
        setHighlightedLines([13]);
        setCodeIndex(index);
      },
    },
    {
      title: 'Add state for currentStep',
      code: `const [steps, setSteps] = useState(defaultSteps);
const [currentStep, setCurrentStep] = useState();

return (
  <>
    <Song isPlaying={${isPlaying ? 'true' : 'false'}} bpm={100}>
      <Track 
        steps={steps}
      >
        <Instrument type="synth" />
      </Track>
    </Song>

    <StepsEditor steps={steps} />
  </>
)`,
      action: index => {
        setHighlightedLines([2]);
        setCodeIndex(index);
      },
    },
    {
      title: 'Set currentStep with Track callback',
      code: `const [steps, setSteps] = useState(defaultSteps);
const [currentStep, setCurrentStep] = useState();

return (
  <>
    <Song isPlaying={${isPlaying ? 'true' : 'false'}} bpm={100}>
      <Track 
        steps={steps} 
        onStepPlay={(_, i) => setCurrentStep(i)}
      >
        <Instrument type="synth" />
      </Track>
    </Song>

    <StepsEditor steps={steps} />
  </>
)`,
      action: index => {
        setShowOnStepPlay(false);
        setHighlightedLines([9]);
        setCodeIndex(index);
      },
    },
    {
      title: 'Playhead moves with the music',
      code: `   <Song isPlaying={${isPlaying ? 'true' : 'false'}} bpm={100}>
      <Track 
        steps={steps} 
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
      </Track>
    </Song>

    <StepsEditor 
      steps={steps}
      currentStep={currentStep}
    />
  </>
)`,
      action: index => {
        setShowOnStepPlay(true);
        setHighlightedLines([14]);
        setCodeIndex(index);
      },
    },
    {
      title: 'Add more notes',
      code: `   <Song isPlaying={${isPlaying ? 'true' : 'false'}} bpm={100}>
      <Track 
        steps={steps} 
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
      </Track>
    </Song>

    <StepsEditor 
      steps={steps}
      currentStep={currentStep}
    />
  </>
)`,
      action: index => {
        setShowOnStepPlay(true);
        setHighlightedLines([14]);
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
        // flexWrap: 'wrap',
        // alignItems: 'center',
      }}
    >
      <div
        style={{
          // alignSelf: 'flex-start',
          width: '100%',
          maxWidth: 1050,
          // flex: 1,
        }}
      >
        {/* {code && ( */}
        <CodeEditor
          contentEditable={false}
          style={{
            minWidth: 'auto',
          }}
          highlightedLines={highlightedLines}
          code={code}
        />

        <h2 className="codeTitle">{title}</h2>
        {/* )} */}
      </div>

      <div
        style={{
          display: 'none',
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
                setHighlightedLines([15, 8]);
              }}
              onKeyboardUp={note => {
                setNotes([]);
                setHighlightedLines([14]);
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

      <Song isPlaying={isPlaying} bpm={100}>
        <Track
          steps={steps}
          onStepPlay={(_, index) => setCurrentStepIndex(index)}
        >
          <Instrument type="amSynth" notes={notes}></Instrument>
        </Track>
      </Song>
    </div>
  );
};

const exampleSteps = [
  [
    {
      name: 'A3',
      duration: 0.2,
    },
    {
      name: 'C3',
      duration: 0.2,
    },
    {
      name: 'E3',
      duration: 0.2,
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
      duration: 0.2,
    },
    {
      name: 'A3',
      duration: 0.2,
    },
    {
      name: 'C3',
      duration: 0.2,
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
      duration: 0.2,
    },
    {
      name: 'F3',
      duration: 0.2,
    },
    {
      name: 'A3',
      duration: 0.2,
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
      duration: 0.2,
    },
    {
      name: 'G3',
      duration: 0.2,
    },
    {
      name: 'B3',
      duration: 0.2,
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
