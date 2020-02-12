import React from 'react';
import { Editor } from 'react-live';
import codeTheme from '../codeTheme';

const CodeEditor = ({
  contentEditable = false,
  code,
  style,
  language = 'jsx',
  highlightedLines = [],
  highlightedTokens = [],
  // highlightedTokens = [
  //   {
  //     line: 5,
  //     tokens: [8],
  //   },
  // ],
  className,
}) => {
  React.useEffect(() => {
    if (highlightedLines && highlightedLines[0]) {
      const firstHighlight = highlightedLines[0] - 1;
      const lines = document.getElementsByClassName('token-line');

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
            transition: 0.1s;
          }
        `
          : ''}

        {highlightedLines.map(line => {
          return `.code-editor .token-line:nth-child(${line}) {
            opacity: 1;
            transition: 0.5s;
          }`;
        })}

        {highlightedTokens.map(lineToken => {
          return lineToken.tokens.map(token => {
            return `.code-editor .token-line:nth-child(${lineToken.line}) .token:nth-child(${token}) {
              text-decoration: underline;
            }`;
          });
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
