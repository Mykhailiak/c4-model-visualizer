import React from 'react';
import ContentStatus from './ContentStatus';

export default ({
  updateState,
  status,
}) => (
  <>
    <textarea
      className="text-content-editor"
      onChange={(e) => updateState(e.target.value)}
    />
    <ContentStatus type={status} />
  </>
);
