import React from 'react';

export default ({
  updateState,
}) => (
  <textarea
    className="text-content-editor"
    onChange={updateState}
  ></textarea>
)

// Content
// [
//     {
//         data: { id: 'a' }
//     },
//     {
//         data: { id: 'b' }
//     },
//     {
//         data: { id: 'c' }
//     },
//     {
//         data: { id: 'd' }
//     },
//     {
//         data: { id: 'e' }
//     },
//     {
//         data: { id: 'ab', source: 'a', target: 'b' }
//     },
//     {
//         data: { id: 'ac', source: 'a', target: 'c' }
//     },
//     {
//         data: { id: 'cd', source: 'c', target: 'd' }
//     },
//     {
//         data: { id: 'ce', source: 'c', target: 'e' }
//     },
//     {
//         data: { id: 'bd', source: 'b', target: 'd' }
//     }
// ]
