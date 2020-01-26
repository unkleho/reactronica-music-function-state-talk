import React from 'react';
import { Editor } from 'react-live';
import codeTheme from '../codeTheme';

const CodeEditor = ({
  contentEditable = false,
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
          fontSize: 32,
          padding: 8,
          ...style,
        }}
        language={language}
        className={['code-editor', className].join(' ')}
      />

      <style>
        {highlightedLines.length > 0
          ? `
          .code-editor .token-line {
            opacity: 0.4;
            transition: 0.7s;
          }
        `
          : ''}

        {highlightedLines.map(line => {
          return `.code-editor .token-line:nth-child(${line}) {
            // background-color: #161616;
            opacity: 1;
            transition: 0.7s;
          }`;
        })}
      </style>
    </>
  );
};

export default CodeEditor;
