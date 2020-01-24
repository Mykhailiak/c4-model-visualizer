import React from 'react';
import { shallow } from 'enzyme';
import { Alert } from 'antd';
import ContentStatus from '../components/ContentStatus';

it('displays success message if provided `type` is `success`', () => {
  const contentStatus = shallow(<ContentStatus type="success" />);
  const alert = (
    <Alert
      className="content-status-alert"
      type="success"
      message="Valid input"
      showIcon
    />
  );

  expect(contentStatus.contains(alert)).toEqual(true);
});

it('displays error message if provided `type` is `error`', () => {
  const contentStatus = shallow(<ContentStatus type="error" />);
  const alert = (
    <Alert
      className="content-status-alert"
      type="error"
      message="Syntax error"
      showIcon
    />
  );

  expect(contentStatus.contains(alert)).toEqual(true);
});

it('is empty if type is not provided', () => {
  const contentStatus = shallow(<ContentStatus />);

  expect(contentStatus.type()).toEqual(null);
});
