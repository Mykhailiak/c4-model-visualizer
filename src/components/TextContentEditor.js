import React from 'react';
import ContentStatus from './ContentStatus';

const DELAY = 3000;
let timerId;

export default ({
  updateState,
  setUpdatingState,
  status,
}) => {
  const onChangeHandler = (e) => {
    const { value } = e.target;

    clearTimeout(timerId);
    setUpdatingState(true);
    timerId = setTimeout(() => updateState(value), DELAY);
  };

  return (
    <>
      <textarea
        className="text-content-editor"
        onChange={onChangeHandler}
      />
      <ContentStatus type={status} />
    </>
  );
};
