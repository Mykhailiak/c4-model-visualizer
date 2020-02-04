import React from 'react';
import { shallow } from 'enzyme';
import cytoscape from 'cytoscape';
import Diagram from '../components/Diagram';

jest.mock('cytoscape', () => {
  const cytoscapeMock = jest.fn();
  cytoscapeMock.api = {
    json: jest.fn(),
    ready: jest.fn(),
    fit: jest.fn(),
    layout: { run: jest.fn() },
  };
  cytoscapeMock.use = jest.fn();

  return cytoscapeMock.mockReturnValue(cytoscapeMock.api);
});

afterEach(() => {
  cytoscape.api.json.mockClear();
  cytoscape.api.ready.mockClear();
  cytoscape.api.fit.mockClear();
  cytoscape.api.layout.run.mockClear();
  cytoscape.mockClear();
});

it('sets up custom cytoscape diagram layout', () => {
  shallow(
    <Diagram
      data={{}}
      selectedLevel="context"
    />,
  );

  expect(cytoscape.use).toHaveBeenCalled();
});

it('initializes cytoscape instance', () => {
  shallow(
    <Diagram
      data={{}}
      selectedLevel="context"
    />,
  );

  expect(cytoscape).toHaveBeenCalledWith({
    style: expect.any(Array),
    maxZoom: 6,
    minZoom: 1,
    userZoomingEnabled: true,
    userPanningEnabled: true,
    boxSelectionEnabled: false,
    autounselectify: true,
    container: null, // it's always null in test mode
    elements: [],
    layout: { name: 'dagre' },
  });
});

it('renders diagram and fits view according right level', () => {
  const diagram = shallow(
    <Diagram
      data={{}}
      selectedLevel="context"
    />,
  );

  diagram.setProps({
    data: { context: { foo: { name: 'Foo' } } },
  });

  expect(cytoscape.api.json).toHaveBeenCalledWith({
    elements: [{ data: { id: 'foo', name: 'Foo', parent: undefined } }],
  });
  expect(cytoscape.api.ready).toHaveBeenCalledWith(expect.any(Function));
  expect(cytoscape.api.fit).toHaveBeenCalledWith('#context');
});

it('renders diagram and does not fit view if selected level is not provided', () => {
  const diagram = shallow(
    <Diagram
      data={{}}
      selectedLevel={undefined}
    />,
  );

  diagram.setProps({
    data: { context: { foo: { name: 'Foo' } } },
  });

  expect(cytoscape.api.json).toHaveBeenCalledWith({
    elements: [{ data: { id: 'foo', name: 'Foo', parent: undefined } }],
  });
  expect(cytoscape.api.ready).toHaveBeenCalledWith(expect.any(Function));
  expect(cytoscape.api.fit.mock.calls.length).toBe(0);
});

it('renders elements which is related', () => {
  const diagram = shallow(
    <Diagram
      data={{}}
      selectedLevel="context"
    />,
  );
  const parent = undefined;

  diagram.setProps({
    data: {
      context: {
        foo: { name: 'Foo', relations: { to: { bar: 'Knows about bar' } } },
        bar: { name: 'Bar' },
      },
    },
  });

  expect(cytoscape.api.json).toHaveBeenCalledWith({
    elements: [
      { data: { id: 'foo', name: 'Foo', parent } },
      {
        data: {
          parent,
          id: 'foo_bar',
          name: 'Knows about bar',
          source: 'foo',
          target: 'bar',
        },
      },
      { data: { id: 'bar', name: 'Bar', parent } },
    ],
  });
});

it('renders nodes with key as a name if `name` does not exist', () => {
  const diagram = shallow(
    <Diagram
      data={{}}
      selectedLevel="context"
    />,
  );
  const parent = undefined;

  diagram.setProps({
    data: {
      context: {
        foo: {},
        bar: {},
      },
    },
  });

  expect(cytoscape.api.json).toHaveBeenCalledWith({
    elements: [
      { data: { id: 'foo', name: 'foo', parent } },
      { data: { id: 'bar', name: 'bar', parent } },
    ],
  });
});
