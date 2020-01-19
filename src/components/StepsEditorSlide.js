import React from 'react';
import { CodePane } from 'spectacle';

import StepsEditor from './StepsEditor';

const StepsEditorSlide = () => {
  return (
    <>
      <CodePane
        theme="external"
        style={{
          fontSize: 24,
          minWidth: 'auto',
          width: '50%',
        }}
        lang="jsx"
        className="code-theme"
        source={`() => {
  return (
    <>
      <Song isPlaying={true} bpm={100}>
      <Track 
        steps={['C3', null, 'G3', null]} 
      >
        <Instrument 
          type={"synth"}
        />
      </Track>
    </Song>
  </>
  )
}`}
      ></CodePane>

      <div
        style={{
          width: '50%',
        }}
      >
        <StepsEditor
          defaultSteps={[null]}
          startNote="C3"
          endNote="B3"
        ></StepsEditor>
      </div>
    </>
  );
};

export default StepsEditorSlide;
