import React from 'react';
import { parse } from '../utils/yaml-parser';

export default ({
  updateState,
}) => (
  <textarea
    className="text-content-editor"
    onChange={e => updateState(parse(e.target.value))}
  ></textarea>
)
