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

  const codeSteps = [
    {
      title: 'How does Reactronica work with UI components?',
      action: index => {
        setCodeIndex(index);
      },
    },
    {
      title: 'How does Reactronica work with UI components?',
      code: `return (
  <>
    <Song isPlaying={${isPlaying ? 'true' : 'false'}} bpm={70}>
      <Track>
        <Instrument type="synth" />
      </Track>
    </Song>
  </>
)`,
      action: index => {
        setShowStepsEditor(false);
        setHighlightedLines([]);
        setCodeIndex(index);
      },
    },
    {
      title: 'Lets add a step editor',
      code: `return (
  <>
    <Song isPlaying={${isPlaying ? 'true' : 'false'}} bpm={70}>
      <Track>
        <Instrument type="synth" />
      </Track>
    </Song>

    <StepsEditor />
  </>
)`,
      action: index => {
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
    <Song isPlaying={${isPlaying ? 'true' : 'false'}} bpm={70}>
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
    <Song isPlaying={${isPlaying ? 'true' : 'false'}} bpm={70}>
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
        setShowStepsEditorSteps(false);
        setHighlightedLines([7]);
        setCodeIndex(index);
      },
    },
    {
      title: 'Add steps to Steps editor props',
      code: `const [steps, setSteps] = useState(defaultSteps);

return (
  <>
    <Song isPlaying={${isPlaying ? 'true' : 'false'}} bpm={70}>
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
    <Song isPlaying={${isPlaying ? 'true' : 'false'}} bpm={70}>
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
    <Song isPlaying={${isPlaying ? 'true' : 'false'}} bpm={70}>
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
      title: 'Show playhead',
      code: `   <Song isPlaying={${isPlaying ? 'true' : 'false'}} bpm={70}>
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
        // alignItems: 'center',
      }}
    >
      <div
        style={{
          alignSelf: 'flex-start',
          width: '66%',
          marginRight: '3rem',
        }}
      >
        <h2 className="codeTitle">{title}</h2>

        {code && (
          <CodeEditor
            contentEditable={false}
            style={{
              minWidth: 'auto',
            }}
            highlightedLines={highlightedLines}
            code={code}
          />
        )}
      </div>

      <div
        style={{
          width: '50%',
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

      <Song isPlaying={isPlaying}>
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
