import React from 'react';
import { shallow } from 'enzyme';
import { Spin } from 'antd';
import Sidebar from '../components/Sidebar';

it('displays spinner if content is being updated', () => {
  const component = shallow(<Sidebar updatingContent />);

  expect(component.find(Spin).exists()).toEqual(true);
});

it('doesn\'t display any content if content is not being updated', () => {
  const component = shallow(<Sidebar updatingContent={false} />);

  expect(component.find(Spin).exists()).toEqual(false);
});
