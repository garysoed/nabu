import { assert, should, test } from 'gs-testing';

import { render } from './renderer';

test('grammar.human.renderer', () => {
  test('render', () => {
    should('render undefined correctly', () => {
      assert(render(undefined)).to.equal('undefined');
    });

    should('render null correctly', () => {
      assert(render(null)).to.equal('null');
    });

    should('render numbers correctly', () => {
      assert(render(12.34)).to.equal('12.34');
    });

    should('render strings correctly', () => {
      assert(render('string')).to.equal('\'string\'');
    });
  });

  test('renderArray', () => {
    should('render arrays correctly', () => {
      assert(render([1, '2', [3, 4], {a: 5, b: '6'}])).to.equal('[1 \'2\' [3 4] {a: 5, b: \'6\'}]');
    });
  });

  test('renderBoolean', () => {
    should('render true correctly', () => {
      assert(render(true)).to.equal('T');
    });

    should('render false correctly', () => {
      assert(render(false)).to.equal('F');
    });
  });

  test('renderObject', () => {
    should('render objects correctly', () => {
      assert(render({a: 1, b: {c: [1, 2, 3]}})).to.equal('{a: 1, b: {c: [1 2 3]}}');
    });
  });
});
