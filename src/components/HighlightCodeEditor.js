import React from 'react';

import CodeEditor from './CodeEditor';
import useSlideActions from '../hooks/useSlideActions';

const HighlightCodeEditor = ({
  code,
  /** eg. [[0,1], [2,3,4]] */
  ranges = [],
  language = 'jsx',
  onRangeChange,
}) => {
  const [highlightedLines, setHighlightedLines] = React.useState();

  const slideActions = ranges.map((range, index) => {
    return () => {
      setHighlightedLines(range);

      if (typeof onRangeChange === 'function') {
        onRangeChange(range, index);
      }
    };
  });

  useSlideActions(slideActions);

  return (
    <CodeEditor
      code={code}
      highlightedLines={highlightedLines}
      language={language}
    ></CodeEditor>
  );
};

export default HighlightCodeEditor;
