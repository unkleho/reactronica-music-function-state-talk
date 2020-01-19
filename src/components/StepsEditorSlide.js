import React, { useState } from 'react';
// import { CodePane } from 'spectacle';
import { Song, Track, Instrument } from 'reactronica';
import { Editor } from 'react-live';
import codeTheme from '../codeTheme';

import StepsEditor from './StepsEditor';

const StepsEditorSlide = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showOnStepPlay, setShowOnStepPlay] = useState(true);
  const [currentStepIndex, setCurrentStepIndex] = useState();
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
      <Editor
        contentEditable={false}
        style={{
          fontSize: 24,
          minWidth: 'auto',
          width: '50%',
        }}
        code={`() => {
  const [steps, setSteps] = useState(defaultSteps);
  const [currentStep, setCurrentStep] = useState();

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
        language="jsx"
        theme={codeTheme}
        // className="code-theme react-live__editor"
      ></Editor>

      {/* <CodePane
        theme="external"
        style={{
          fontSize: 24,
          minWidth: 'auto',
          width: '50%',
        }}
        lang="jsx"
        className="code-theme"
        source={`() => {
  const [steps, setSteps] = useState(defaultSteps);
  const [currentStep, setCurrentStep] = useState();

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
      ></CodePane> */}

      <div
        style={{
          width: '50%',
        }}
      >
        <StepsEditor
          defaultSteps={steps}
          startNote="C3"
          endNote="B3"
          currentStepIndex={currentStepIndex}
        ></StepsEditor>

        <button
          className="demoButton"
          onClick={() => {
            setIsPlaying(!isPlaying);
          }}
        >
          {isPlaying ? 'Stop' : 'Play'}
        </button>

        <button
          className="demoButton"
          onClick={() => {
            setShowOnStepPlay(!showOnStepPlay);
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
