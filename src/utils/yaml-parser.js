export const parse = (yamlString = '') => {
  const entries = yamlString.split(/\n/).map(p => p.split(/:\s?/));

  return Object.fromEntries(entries);
};


```
name: Example
description: Displays a Title, Image, and Text on the front end.
type: particle

title:
type: input.checkbox
label: Your label.
  description: Your description.
    default: true
```
