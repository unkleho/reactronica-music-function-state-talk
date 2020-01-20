import React, { useState } from 'react';
import { Song, Track, Instrument } from 'reactronica';

import CodeEditor from './CodeEditor';
import StepsEditor from './StepsEditor';

const StepsEditorSlide = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showOnStepPlay, setShowOnStepPlay] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState();
  const [highlightedLines, setHighlightedLines] = useState([]);
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
    showOnStepPlay
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
          showOnStepPlay
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
        />

        <button
          className="demoButton"
          onClick={() => {
            setIsPlaying(!isPlaying);
            setHighlightedLines([7]);
          }}
        >
          {isPlaying ? 'Stop' : 'Play'}
        </button>

        <button
          className="demoButton"
          onClick={() => {
            setShowOnStepPlay(!showOnStepPlay);
            setHighlightedLines([3, 10, 18]);
          }}
        >
          {showOnStepPlay ? 'Hide' : 'Show'} onStepPlay
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
