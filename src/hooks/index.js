import React from 'react';

/**
 * Call function on key press
 */
export function useKeyPress(targetKey, callback) {
  // Add event listeners
  React.useEffect(() => {
    const upHandler = ({ key }) => {
      if (key === targetKey) {
        callback();
      }
    };

    window.addEventListener('keyup', upHandler);
    // Remove event listeners on cleanup
    return () => {
      window.removeEventListener('keyup', upHandler);
    };
  }, [targetKey, callback]); // Empty array ensures that effect is only run on mount and unmount
}
