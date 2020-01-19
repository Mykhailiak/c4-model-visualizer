import React, { useState, useEffect, createRef } from 'react';
import ContentStatus from './ContentStatus';

const DELAY = 3000;
const ENTER_KEY_CODE = 13;
const INDENT_SIZE = 2;
const DEPTH_INDICATOR = ':';
let timerId;

export default ({
  updateState,
  setUpdatingState,
  status,
}) => {
  const [text, setText] = useState();
  const [cursorPosition, setCursorPosition] = useState(null);
  const onChangeHandler = (e) => {
    const { value } = e.target;

    setText(value);
    clearTimeout(timerId);
    setUpdatingState(true);
    timerId = setTimeout(() => updateState(value), DELAY);
  };
  const textareaRef = createRef();
  const onKeyUp = (e) => {
    const { keyCode, target } = e;
    if (keyCode === ENTER_KEY_CODE) {
      setText((value) => {
        const { selectionStart } = target;
        const end = selectionStart - 1;
        const prevLine = value
          .slice(value.lastIndexOf('\n', end - 1), end)
          .replace(/\n/g, '');
        const headSpaces = prevLine.match(/^\s+/);
        const increaseDepth = (prevLine || DEPTH_INDICATOR).slice(-1) === DEPTH_INDICATOR;
        const parentOffset = (headSpaces || [''])[0].length;
        const offset = increaseDepth ? parentOffset + INDENT_SIZE : parentOffset;
        const computedSelectionPosition = selectionStart + offset;

        setCursorPosition([computedSelectionPosition, computedSelectionPosition]);

        return value
          .slice(0, selectionStart)
          .concat(' '.repeat(offset))
          .concat(value.slice(selectionStart));
      });
    }
  };

  useEffect(() => {
    if (cursorPosition) {
      textareaRef.current.setSelectionRange(...cursorPosition);
      setCursorPosition(null);
    }
  }, [cursorPosition, textareaRef]);

  return (
    <>
      <textarea
        value={text}
        className="text-content-editor"
        onChange={onChangeHandler}
        onKeyUp={onKeyUp}
        ref={textareaRef}
      />
      <ContentStatus type={status} />
    </>
  );
};
