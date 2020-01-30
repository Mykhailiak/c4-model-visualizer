import React from 'react';
import { shallow } from 'enzyme';
import TextContentEditor from '../components/TextContentEditor';

it('calls `setUpdatingState` method during text updating', () => {
  const setUpdatingState = jest.fn();
  const value = 'text';
  const component = shallow(
    <TextContentEditor
      setUpdatingState={setUpdatingState}
    />,
  );

  component.find('textarea').simulate('change', { target: { value } });

  expect(setUpdatingState).toHaveBeenCalledWith(true);
});
