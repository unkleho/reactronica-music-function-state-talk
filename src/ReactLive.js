import React from 'react';
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live';

import codeTheme from './codeTheme';

const ReactLive = ({ code, scope = {}, showPreview = true }) => {
  return (
    <div className="react-live">
      <LiveProvider
        code={code}
        scope={{
          useRef: React.useRef,
          useState: React.useState,
          useEffect: React.useEffect,
          ...scope,
        }}
        theme={codeTheme}
        language="jsx"
      >
        <LiveEditor className="code-theme react-live__editor" />

        <div
          className="react-live__preview-pane"
          style={{ display: showPreview ? 'flex' : 'none' }}
        >
          <LiveError className="react-live__error" />
          <LivePreview className="react-live__preview" />
        </div>
      </LiveProvider>
    </div>
  );
};

export default ReactLive;
