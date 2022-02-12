import expect from 'expect.js';
import * as Engine from '../engine.js';
import data from './tree.js';

const prevTree = JSON.parse(data);
const nextTree = JSON.parse(data);
nextTree.children[0].children = 1;

describe('Engine', () => {
  describe('correctly runs diffs', () => {
    it('on functionally identical parents', () => {
      const prev = prevTree.children[0];
      const next = nextTree.children[0];
      const diff = Engine.getDiff(next, prev);
      console.log(diff);
    })
  })
})

