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

  // Code State
  // const [showCurrentStepState, setShowCurrentStepState] = useState(false);
  const [showOnStepPlay, setShowOnStepPlay] = useState(false);
  // const [showCurrentStepProp, setShowCurrentStepProp] = useState(false);

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
        // setShowOnStepPlay(false);
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
        <Track steps={steps}>
          <Instrument type="synth" />
        </Track>
      </Song>

      <StepsEditor />
    </>
      )`,
      action: index => {
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
        <Track steps={steps}>
          <Instrument type="synth" />
        </Track>
      </Song>

      <StepsEditor steps={steps} />
    </>
      )`,
      action: index => {
        setHighlightedLines([12]);
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
  // const title = codeSteps[codeIndex] && codeSteps[codeIndex].title;

  const [steps, setSteps] = useState(undefined);

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <CodeEditor
        contentEditable={false}
        style={{
          minWidth: 'auto',
          width: '50%',
          marginRight: '2rem',
        }}
        highlightedLines={highlightedLines}
        code={`() => {
  ${code}
}`}
        //         code={`() => {
        //   const [steps, setSteps] = useState(defaultSteps);${
        //     showCurrentStepState
        //       ? `
        //   const [currentStep, setCurrentStep] = useState();`
        //       : ''
        //   }

        //   return (
        //     <>
        //       <Song isPlaying={${isPlaying}} bpm={100}>
        //         <Track
        //           steps={steps}${
        //             showOnStepPlay
        //               ? `
        //           onStepPlay={(_, index) => setCurrentStep(index)}`
        //               : ''
        //           }
        //         >
        //           <Instrument type={"synth"} />
        //         </Track>
        //       </Song>

        //       <StepsEditor
        //         steps={steps}${
        //           showCurrentStepProp
        //             ? `
        //         currentStep={currentStep}`
        //             : ''
        //         }
        //         onClick={(steps) => setSteps(steps)}
        //       />
        //     </>
        //   )
        // }`}
      />

      <div
        style={{
          width: '50%',
        }}
      >
        {showStepsEditor && (
          <>
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
          </>
        )}
      </div>

      <Song isPlaying={isPlaying}>
        <Track
          steps={steps}
          onStepPlay={(_, index) => setCurrentStepIndex(index)}
        >
          <Instrument type="synth"></Instrument>
        </Track>
      </Song>
    </div>
  );
};

export default StepsEditorSlide;
