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
  React.useEffect(() => {
    if (highlightedLines && highlightedLines[0]) {
      console.log(highlightedLines[0]);
      const firstHighlight = highlightedLines[0] - 1;
      const lines = document.getElementsByClassName('token-line');

      console.log(lines[firstHighlight]);
      lines[firstHighlight].scrollIntoView({
        block: 'center',
        behavior: 'smooth',
      });
    }
  }, [highlightedLines]);

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
            transition: 0.5s;
          }
        `
          : ''}

        {highlightedLines.map(line => {
          return `.code-editor .token-line:nth-child(${line}) {
            // background-color: #161616;
            opacity: 1;
            transition: 0.5s;
          }`;
        })}

        {`
        .code-editor pre {
          max-height: 760px;
          overflow: auto;
          pointer-events: all !important;          
        }

        .code-editor pre::-webkit-scrollbar {
          display: none;
        }
        `}
      </style>
    </>
  );
};

export default CodeEditor;
