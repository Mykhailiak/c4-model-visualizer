import React from 'react';

export default ({
  updateState,
}) => (
  <textarea
    className="text-content-editor"
    onChange={(e) => updateState(e.target.value)}
  />
);
