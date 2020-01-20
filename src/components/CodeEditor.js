import React from 'react';
import { Editor } from 'react-live';
import codeTheme from '../codeTheme';

const CodeEditor = ({
  contentEditable,
  code,
  style,
  language = 'jsx',
  highlightedLines = [],
  className,
}) => {
  return (
    <>
      <Editor
        contentEditable={contentEditable}
        theme={codeTheme}
        code={code}
        style={{
          fontSize: 24,
          ...style,
        }}
        language={language}
        className={['code-editor', className].join(' ')}
      />

      <style jsx>
        {highlightedLines.map(line => {
          return `.code-editor .token-line:nth-child(${line}) {
            background-color: #161616;
          }`;
        })}
      </style>
    </>
  );
};

export default CodeEditor;
