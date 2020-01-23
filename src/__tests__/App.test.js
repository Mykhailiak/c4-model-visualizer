import React from 'react';
import ReactDOM from 'react-dom';
import App from '../components/App';

jest.mock('../components/Diagram', () => function DummyDiagram() {
  return <div id="dummy-diagram" />;
});

let container;

beforeEach(() => {
  container = document.createElement('div');
});

afterEach(() => {
  ReactDOM.unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it('renders without errors', () => {
  ReactDOM.render(<App />, container);
});
