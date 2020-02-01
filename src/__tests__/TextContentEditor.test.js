import React from 'react';
import { shallow, mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import TextContentEditor from '../components/TextContentEditor';

it('calls `setUpdatingState` method during text updating', () => {
  const setUpdatingState = jest.fn();
  const value = 'text';
  const component = shallow(
    <TextContentEditor
      setUpdatingState={setUpdatingState}
    />,
  );

  act(() => {
    component.find('textarea').simulate('change', { target: { value } });
  });
  expect(setUpdatingState).toHaveBeenCalledWith(true);
});

it('uses delay during uninterapted editing', () => {
  jest.useFakeTimers();
  const component = mount(
    <TextContentEditor
      status="success"
      setUpdatingState={() => 1}
      updateState={() => 1}
    />,
  );
  const textarea = component.find('textarea');
  expect(setTimeout).toHaveBeenCalledTimes(2);

  act(() => {
    textarea.simulate('change', { target: { value: 'text' } });
  });
  expect(setTimeout).toHaveBeenCalledTimes(3);

  act(() => {
    textarea.simulate('change', { target: { value: 'text-text' } });
  });
  expect(setTimeout).toHaveBeenCalledTimes(4);
});

it('calls `updateState` method once updating timeout is fired', () => {
  jest.useFakeTimers();
  const updateState = jest.fn();
  const value = 'text';
  const component = mount(
    <TextContentEditor
      status="success"
      setUpdatingState={() => 1}
      updateState={updateState}
    />,
  );

  act(() => {
    component.find('textarea').simulate('change', { target: { value } });
  });
  jest.runAllTimers();
  expect(updateState).toHaveBeenCalledWith(value);
});

it('sets cursor position according to nesting', () => {
  jest.useFakeTimers();
  const component = mount(
    <TextContentEditor
      status="success"
      setUpdatingState={() => 1}
      updateState={() => 1}
    />,
  );
  const textarea = component.find('textarea');

  act(() => {
    textarea.simulate('change', { target: { value: 'context:' } });
    textarea.simulate('keyUp', {
      target: {
        value: 'context:',
        selectionStart: 8,
      },
      keyCode: 13,
    });
  });

  expect(textarea.text().length).toEqual(10);
});
