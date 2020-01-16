import React, { useState } from 'react';
import ContentStatus from './ContentStatus';

const DELAY = 3000;
let timerId;

export default ({
  updateState,
  setUpdatingState,
  status,
}) => {
  const [text, setText] = useState();
  const onChangeHandler = (e) => {
    const { value } = e.target;

    setText(value);
    clearTimeout(timerId);
    setUpdatingState(true);
    timerId = setTimeout(() => updateState(value), DELAY);
  };

  const onKeyUp = (e) => {
    e.persist();

    if (e.keyCode === 13) {
      setText((value) => {
        const { selectionStart } = e.target;
        const end = selectionStart - 2;
        const headSpaces = value
          .slice(value.lastIndexOf('\n', end), end)
          .replace(/\n/g, '')
          .match(/^\s+/);
        const parentOffset = (headSpaces || [''])[0].length;
        // const newSelectionStartPosition = selectionStart + parentOffset;
        // e.target.setSelectionRange(newSelectionStartPosition, newSelectionStartPosition + 1);

        const result = value
          .slice(0, selectionStart)
          .concat(' '.repeat(parentOffset + 2))
          .concat(value.slice(selectionStart));

        return result;
      });
    }
  };

  return (
    <>
      <textarea
        value={text}
        className="text-content-editor"
        onChange={onChangeHandler}
        onKeyUp={onKeyUp}
      />
      <ContentStatus type={status} />
    </>
  );
};
