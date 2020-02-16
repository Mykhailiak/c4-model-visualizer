import React from 'react';
import { shallow } from 'enzyme';
import DiagramVisualizer from 'c4-model-visualizer-core/diagram';
import Diagram from '../components/Diagram';

jest.mock('c4-model-visualizer-core/diagram');

afterEach(() => {
  DiagramVisualizer.mockClear();
});

it('renders diagram and fits view according right level', () => {
  const component = shallow(
    <Diagram
      data={{}}
      selectedLevel="context"
    />,
  );

  component.setProps({
    data: { context: { foo: { name: 'Foo' } } },
  });

  expect(component.instance().diagram.update).toHaveBeenCalled();
});
