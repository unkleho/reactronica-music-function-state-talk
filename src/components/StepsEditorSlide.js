import React, { useState } from 'react';
import { Song, Track, Instrument } from 'reactronica';

import CodeEditor from './CodeEditor';
import StepsEditor from './StepsEditor';

import useSlideActions from '../hooks/useSlideActions';

const StepsEditorSlide = () => {
  // Reactronica State
  const [isPlaying, setIsPlaying] = useState(false);

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
        setHighlightedLines([10]);
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
        setSteps([
          [
            {
              name: 'A3',
            },
            {
              name: 'C3',
            },
            {
              name: 'E3',
            },
          ],
          null,
          [
            {
              name: 'G3',
            },
            {
              name: 'B3',
            },
            {
              name: 'D3',
            },
          ],
          null,
          [
            {
              name: 'A#3',
            },
            {
              name: 'D3',
            },
            {
              name: 'F3',
            },
          ],
          null,
          [
            {
              name: 'A3',
            },
            {
              name: 'C3',
            },
            {
              name: 'E3',
            },
          ],
          null,
        ]);
        setHighlightedLines([2]);
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
        setHighlightedLines([8]);
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
        setHighlightedLines([14]);
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
        setHighlightedLines([3]);
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
        setHighlightedLines([10]);
        setCodeIndex(index);
      },
    },
    {
      title: 'Show playhead',
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

      <StepsEditor 
        steps={steps}
        currentStep={currentStep}
      />
    </>
  )`,
      action: index => {
        setShowOnStepPlay(true);
        setHighlightedLines([18]);
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
        alignItems: 'center',
      }}
    >
      <div
        style={{
          width: '66%',
          marginRight: '3rem',
        }}
      >
        <CodeEditor
          contentEditable={false}
          style={{
            minWidth: 'auto',
          }}
          highlightedLines={highlightedLines}
          code={`() => {
  ${code}
}`}
        />
        <h2 style={{ textAlign: 'left', fontSize: 32 }}>{title}</h2>
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
          <Instrument type="fmSynth"></Instrument>
        </Track>
      </Song>
    </div>
  );
};

export default StepsEditorSlide;
