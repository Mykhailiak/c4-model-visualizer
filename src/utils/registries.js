const innerLevelKeys = ['container', 'component', 'class'];

export const registerRelations = (data, path = []) => {
  let registry = [];

  Object.entries(data).forEach(([key, value]) => {
    const levelProp = innerLevelKeys.find((k) => k in value);
    const computedPath = path.concat(key);

    if (levelProp) {
      registry = registry.concat(
        registerRelations(value[levelProp], computedPath),
      );
    }

    if (value.relations) {
      registry = registry.concat({
        ...value.relations,
        parents: computedPath,
      });
    }
  });

  return registry;
};

export const registerEntities = (data, path = []) => {
  let registry = {};

  Object.entries(data).forEach(([key, value]) => {
    const levelProp = innerLevelKeys.find((k) => k in value);
    const computedPath = path.concat(key);

    if (levelProp) {
      registry = {
        ...registry,
        ...registerEntities(value[levelProp], computedPath),
      };
    }

    registry[key] = computedPath;
  });

  return registry;
};

const getClosestAvailableNode = (nodesList, availableNodes) =>
  [...nodesList].reverse().find((n) => availableNodes.includes(n));

// It's used for filtering out self-dependencies on high-level
// when children of entity depend on each other
const avoidSelfRedundantDependency = (availableNodes) => (relation) => {
  if (relation.target === relation.key && relation.parents.length > 1) {
    return relation.parents
      .slice(1)
      .some((node) => availableNodes.includes(node));
  }

  return true;
};

export const bindRegistriesBySelectedLevel = (context, availableNodes) => {
  const relationsRegistry = registerRelations(context);
  const entitiesRegistry = registerEntities(context);

  const relationsBindedToEntities = relationsRegistry
    .reduce((acc, relation) => {
      const key = getClosestAvailableNode(relation.parents, availableNodes);

      Object.entries(relation.to).forEach(([targetKey, description]) => {
        acc.push({
          key,
          description,
          parents: relation.parents,
          target: getClosestAvailableNode(
            entitiesRegistry[targetKey],
            availableNodes,
          ),
        });
      });

      return acc;
    }, [])
    .filter(avoidSelfRedundantDependency(availableNodes));

  return relationsBindedToEntities;
};
