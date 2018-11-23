import { assert, match, should, test } from 'gs-testing/export/main';
import { parse } from './human';

test('grammar.human', () => {
  should(`parse null correctly`, () => {
    assert(parse('NULL')).to.beNull();
    assert(parse('null')).to.beNull();
  });

  should(`parse undefined correctly`, () => {
    assert(parse('undefined')).toNot.beDefined();
  });

  should(`parse booleans correctly`, () => {
    assert(parse('TRUE')).to.equal(true);
    assert(parse('true')).to.equal(true);
    assert(parse('T')).to.equal(true);
    assert(parse('FALSE')).to.equal(false);
    assert(parse('false')).to.equal(false);
    assert(parse('F')).to.equal(false);
  });

  should(`parse strings correctly`, () => {
    assert(parse('"b\'a\'c"')).to.equal('b\'a\'c');
  });

  should(`parse numbers correctly`, () => {
    assert(parse('123')).to.equal(123);
    assert(parse('123.456')).to.equal(123.456);
    assert(parse('123.001')).to.equal(123.001);
    assert(parse('0.001')).to.equal(0.001);
    assert(parse('.001')).to.equal(0.001);
    assert(parse('-123')).to.equal(-123);
    assert(parse('-123.456')).to.equal(-123.456);
    assert(parse('-123.001')).to.equal(-123.001);
    assert(parse('-0.001')).to.equal(-0.001);
    assert(parse('-.001')).to.equal(-0.001);
  });

  should(`parse lists correctly`, () => {
    const INPUT = `
[
  "string"
  123
  [1 2 3]
]
    `;

    assert(parse(INPUT) as any[]).to.haveExactElements([
      'string',
      123,
      match.anyArrayThat().haveExactElements([1, 2, 3]),
    ]);
  });

  should(`parse correctly`, () => {
    const INPUT = `
{
  object: {
    string: "string",
    number: 123,
    decimal: 123.456,
  },
  list: [
    "string"
    .234
    0.002
  ],
  null: null,
  undefined: undefined,
}
    `;
    assert(parse(INPUT)).to.equal(match.anyObjectThat().haveProperties({
      list: match.anyArrayThat().haveExactElements([
        'string',
        0.234,
        0.002,
      ]),
      null: null,
      object: match.anyObjectThat().haveProperties({
        decimal: 123.456,
        number: 123,
        string: 'string',
      }),
      undefined,
    }));
  });
});
