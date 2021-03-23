import cytoscape from 'cytoscape';

type Element = {
  data: {
    name: string;
    id: string;
    parent?: string;
    hasChild?: boolean;
    selectionId?: string;
    target?: string;
    source?: string;
  };
};

declare class DiagramVisualizer {
  layout: { name: string };
  cy: cytoscape.Core;

  constructor(
    public levels: String[],
    public getSuitableLevelKey: (
      context: object,
      level: number,
    ) => string | boolean,
    config: {
      containerId: string;
      onClick(e: object): void;
    },
  ) {}

  update(context: object, selectedPath: string[], selectedLevel: string): void;
  fitViewport(selectedLevel: string): void;
  computeElements(
    context: object,
    selectedPath: string[],
    level: number,
    parent: string,
    selectionPath: string,
  ): Array<Element>;
}

export default DiagramVisualizer;
