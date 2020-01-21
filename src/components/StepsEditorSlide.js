import React, { useState } from 'react';
import { Song, Track, Instrument } from 'reactronica';

import CodeEditor from './CodeEditor';
import StepsEditor from './StepsEditor';

import useSlideActions from '../hooks/useSlideActions';

const StepsEditorSlide = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  const [showCurrentStepState, setShowCurrentStepState] = useState(false);
  const [showOnStepPlay, setShowOnStepPlay] = useState(false);
  const [showCurrentStepProp, setShowCurrentStepProp] = useState(false);

  const [currentStepIndex, setCurrentStepIndex] = useState();
  const [highlightedLines, setHighlightedLines] = useState([]);

  const slideActions = [
    () => {
      setShowCurrentStepState(false);
      setHighlightedLines([]);
    },
    () => {
      setShowCurrentStepState(true);
      setShowOnStepPlay(false);
      setHighlightedLines([3]);
    },
    () => {
      setShowOnStepPlay(true);
      setShowCurrentStepProp(false);
      setHighlightedLines([10]);
    },
    () => {
      setShowCurrentStepProp(true);
      setHighlightedLines([18]);
    },
  ];

  useSlideActions(slideActions);

  const [steps] = useState([
    [
      {
        name: 'C3',
      },
    ],
    null,
    [
      {
        name: 'C3',
      },
    ],
    null,
    null,
    null,
    null,
    null,
  ]);

  return (
    <>
      <CodeEditor
        contentEditable={false}
        style={{
          minWidth: 'auto',
          width: '50%',
          marginRight: '2rem',
        }}
        highlightedLines={highlightedLines}
        code={`() => {
  const [steps, setSteps] = useState(defaultSteps);${
    showCurrentStepState
      ? `
  const [currentStep, setCurrentStep] = useState();`
      : ''
  }

  return (
    <>
      <Song isPlaying={${isPlaying}} bpm={100}>
        <Track 
          steps={steps}${
            showOnStepPlay
              ? `
          onStepPlay={(_, index) => setCurrentStep(index)}`
              : ''
          }
        >
          <Instrument type={"synth"} />
        </Track>
      </Song>

      <StepsEditor 
        steps={steps}${
          showCurrentStepProp
            ? `
        currentStep={currentStep}`
            : ''
        }        
        onClick={(steps) => setSteps(steps)} 
      />
    </>
  )
}`}
      />

      <div
        style={{
          width: '50%',
        }}
      >
        <StepsEditor
          defaultSteps={steps}
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
      </div>

      <Song isPlaying={isPlaying}>
        <Track
          steps={steps}
          onStepPlay={(_, index) => setCurrentStepIndex(index)}
        >
          <Instrument type="synth"></Instrument>
        </Track>
      </Song>
    </>
  );
};

export default StepsEditorSlide;
