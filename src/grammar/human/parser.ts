/* eslint-disable */
// @ts-nocheck

// Generated by PEG.js v. 0.10.0 (ts-pegjs plugin v. 0.2.2 )
//
// https://pegjs.org/   https://github.com/metadevpro/ts-pegjs

'use strict';

export interface IFilePosition {
  offset: number;
  line: number;
  column: number;
}

export interface IFileRange {
  start: IFilePosition;
  end: IFilePosition;
}

export interface ILiteralExpectation {
  type: `literal`;
  text: string;
  ignoreCase: boolean;
}

export type IClassParts = Array<string | IClassParts>;

export interface IClassExpectation {
  type: `class`;
  parts: IClassParts;
  inverted: boolean;
  ignoreCase: boolean;
}

export interface IAnyExpectation {
  type: `any`;
}

export interface IEndExpectation {
  type: `end`;
}

export interface IOtherExpectation {
  type: `other`;
  description: string;
}

export type Expectation =
  | ILiteralExpectation
  | IClassExpectation
  | IAnyExpectation
  | IEndExpectation
  | IOtherExpectation;

export class SyntaxError extends Error {
  public static buildMessage(expected: Expectation[], found: string | null) {
    function hex(ch: string): string {
      return ch.charCodeAt(0).toString(16).toUpperCase();
    }

    function literalEscape(s: string): string {
      return s
        .replace(/\\/g, `\\\\`)
        .replace(/"/g, `\\"`)
        .replace(/\0/g, `\\0`)
        .replace(/\t/g, `\\t`)
        .replace(/\n/g, `\\n`)
        .replace(/\r/g, `\\r`)
        .replace(/[\x00-\x0F]/g, (ch) => `\\x0` + hex(ch))
        .replace(/[\x10-\x1F\x7F-\x9F]/g, (ch) => `\\x` + hex(ch));
    }

    function classEscape(s: string): string {
      return s
        .replace(/\\/g, `\\\\`)
        .replace(/\]/g, `\\]`)
        .replace(/\^/g, `\\^`)
        .replace(/-/g, `\\-`)
        .replace(/\0/g, `\\0`)
        .replace(/\t/g, `\\t`)
        .replace(/\n/g, `\\n`)
        .replace(/\r/g, `\\r`)
        .replace(/[\x00-\x0F]/g, (ch) => `\\x0` + hex(ch))
        .replace(/[\x10-\x1F\x7F-\x9F]/g, (ch) => `\\x` + hex(ch));
    }

    function describeExpectation(expectation: Expectation) {
      switch (expectation.type) {
        case `literal`:
          return `"` + literalEscape(expectation.text) + `"`;
        case `class`:
          const escapedParts = expectation.parts.map((part) => {
            return Array.isArray(part)
              ? classEscape(part[0] as string) +
                  `-` +
                  classEscape(part[1] as string)
              : classEscape(part);
          });

          return `[` + (expectation.inverted ? `^` : ``) + escapedParts + `]`;
        case `any`:
          return `any character`;
        case `end`:
          return `end of input`;
        case `other`:
          return expectation.description;
      }
    }

    function describeExpected(expected1: Expectation[]) {
      const descriptions = expected1.map(describeExpectation);
      let i;
      let j;

      descriptions.sort();

      if (descriptions.length > 0) {
        for (i = 1, j = 1; i < descriptions.length; i++) {
          if (descriptions[i - 1] !== descriptions[i]) {
            descriptions[j] = descriptions[i];
            j++;
          }
        }
        descriptions.length = j;
      }

      switch (descriptions.length) {
        case 1:
          return descriptions[0];

        case 2:
          return descriptions[0] + ` or ` + descriptions[1];

        default:
          return (
            descriptions.slice(0, -1).join(`, `) +
            `, or ` +
            descriptions[descriptions.length - 1]
          );
      }
    }

    function describeFound(found1: string | null) {
      return found1 ? `"` + literalEscape(found1) + `"` : `end of input`;
    }

    return (
      `Expected ` +
      describeExpected(expected) +
      ` but ` +
      describeFound(found) +
      ` found.`
    );
  }

  public message: string;
  public expected: Expectation[];
  public found: string | null;
  public location: IFileRange;
  public name: string;

  constructor(
    message: string,
    expected: Expectation[],
    found: string | null,
    location: IFileRange,
  ) {
    super();
    this.message = message;
    this.expected = expected;
    this.found = found;
    this.location = location;
    this.name = `SyntaxError`;

    if (typeof (Error as any).captureStackTrace === `function`) {
      (Error as any).captureStackTrace(this, SyntaxError);
    }
  }
}

function peg$parse(input: string, options?: IParseOptions) {
  options = options !== undefined ? options : {};

  const peg$FAILED = {};

  const peg$startRuleFunctions: {[id: string]: any} = {start: peg$parsestart};
  let peg$startRuleFunction: () => any = peg$parsestart;

  const peg$c0 = function (root: any) {
    return root;
  };
  const peg$c1 = `{`;
  const peg$c2 = peg$literalExpectation(`{`, false);
  const peg$c3 = `}`;
  const peg$c4 = peg$literalExpectation(`}`, false);
  const peg$c5 = function (entries: any, lastEntry: any) {
    const result: any = {};
    for (const {key, value} of entries) {
      result[key] = value;
    }

    if (lastEntry !== null) {
      result[lastEntry.key] = lastEntry.value;
    }

    return result;
  };
  const peg$c6 = `,`;
  const peg$c7 = peg$literalExpectation(`,`, false);
  const peg$c8 = function (entry: any) {
    return entry;
  };
  const peg$c9 = `:`;
  const peg$c10 = peg$literalExpectation(`:`, false);
  const peg$c11 = function (key: any, value: any) {
    return {key, value};
  };
  const peg$c12 = /^[a-zA-Z0-9_]/;
  const peg$c13 = peg$classExpectation(
    [[`a`, `z`], [`A`, `Z`], [`0`, `9`], `_`],
    false,
    false,
  );
  const peg$c14 = function (entries: any) {
    return entries.join(``);
  };
  const peg$c15 = `[`;
  const peg$c16 = peg$literalExpectation(`[`, false);
  const peg$c17 = `]`;
  const peg$c18 = peg$literalExpectation(`]`, false);
  const peg$c19 = function (entries: any) {
    const result = [];
    for (const {entry} of entries) {
      result.push(entry);
    }

    return result;
  };
  const peg$c20 = function (entry: any) {
    return {entry};
  };
  const peg$c21 = `'`;
  const peg$c22 = peg$literalExpectation(`'`, false);
  const peg$c23 = /^[^']/;
  const peg$c24 = peg$classExpectation([`'`], true, false);
  const peg$c25 = function (content: any) {
    return content.join(``);
  };
  const peg$c26 = `-`;
  const peg$c27 = peg$literalExpectation(`-`, false);
  const peg$c28 = function (positive: any) {
    return -1 * positive;
  };
  const peg$c29 = /^[1-9]/;
  const peg$c30 = peg$classExpectation([[`1`, `9`]], false, false);
  const peg$c31 = /^[0-9]/;
  const peg$c32 = peg$classExpectation([[`0`, `9`]], false, false);
  const peg$c33 = function (lead: any, rest: any) {
    return parseInt(`${lead}${rest.join(``)}`, 10);
  };
  const peg$c34 = `.`;
  const peg$c35 = peg$literalExpectation(`.`, false);
  const peg$c36 = `0`;
  const peg$c37 = peg$literalExpectation(`0`, false);
  const peg$c38 = function (lead: any, zeros: any, decimal: any) {
    return parseFloat(`${lead || `0`}.${zeros.join(``)}${decimal}`);
  };
  const peg$c39 = function () {
    return 0;
  };
  const peg$c40 = `0x`;
  const peg$c41 = peg$literalExpectation(`0x`, false);
  const peg$c42 = /^[0-9abcdef]/;
  const peg$c43 = peg$classExpectation(
    [[`0`, `9`], `a`, `b`, `c`, `d`, `e`, `f`],
    false,
    false,
  );
  const peg$c44 = function (digits: any) {
    return Number.parseInt(`0x${digits.join(``)}`, 16);
  };
  const peg$c45 = `0o`;
  const peg$c46 = peg$literalExpectation(`0o`, false);
  const peg$c47 = /^[0-7]/;
  const peg$c48 = peg$classExpectation([[`0`, `7`]], false, false);
  const peg$c49 = function (digits: any) {
    return Number.parseInt(digits.join(``), 8);
  };
  const peg$c50 = `0b`;
  const peg$c51 = peg$literalExpectation(`0b`, false);
  const peg$c52 = /^[01]/;
  const peg$c53 = peg$classExpectation([`0`, `1`], false, false);
  const peg$c54 = function (digits: any) {
    return Number.parseInt(digits.join(``), 2);
  };
  const peg$c55 = `true`;
  const peg$c56 = peg$literalExpectation(`true`, false);
  const peg$c57 = `TRUE`;
  const peg$c58 = peg$literalExpectation(`TRUE`, false);
  const peg$c59 = `T`;
  const peg$c60 = peg$literalExpectation(`T`, false);
  const peg$c61 = function () {
    return true;
  };
  const peg$c62 = `false`;
  const peg$c63 = peg$literalExpectation(`false`, false);
  const peg$c64 = `FALSE`;
  const peg$c65 = peg$literalExpectation(`FALSE`, false);
  const peg$c66 = `F`;
  const peg$c67 = peg$literalExpectation(`F`, false);
  const peg$c68 = function () {
    return false;
  };
  const peg$c69 = `NULL`;
  const peg$c70 = peg$literalExpectation(`NULL`, false);
  const peg$c71 = `null`;
  const peg$c72 = peg$literalExpectation(`null`, false);
  const peg$c73 = function () {
    return null;
  };
  const peg$c74 = `undefined`;
  const peg$c75 = peg$literalExpectation(`undefined`, false);
  const peg$c76 = function () {
    return undefined;
  };
  const peg$c77 = peg$otherExpectation(`whitespace`);
  const peg$c78 = /^[ \r\t\n]/;
  const peg$c79 = peg$classExpectation([` `, `\r`, `\t`, `\n`], false, false);

  let peg$currPos = 0;
  let peg$savedPos = 0;
  const peg$posDetailsCache = [{line: 1, column: 1}];
  let peg$maxFailPos = 0;
  let peg$maxFailExpected: any[] = [];
  let peg$silentFails = 0;

  let peg$result;

  if (options.startRule !== undefined) {
    if (!(options.startRule in peg$startRuleFunctions)) {
      throw new Error(
        `Can't start parsing from rule "` + options.startRule + `".`,
      );
    }

    peg$startRuleFunction = peg$startRuleFunctions[options.startRule];
  }

  function text(): string {
    return input.substring(peg$savedPos, peg$currPos);
  }

  function location(): IFileRange {
    return peg$computeLocation(peg$savedPos, peg$currPos);
  }

  function expected(description: string, location1?: IFileRange) {
    location1 =
      location1 !== undefined
        ? location1
        : peg$computeLocation(peg$savedPos, peg$currPos);

    throw peg$buildStructuredError(
      [peg$otherExpectation(description)],
      input.substring(peg$savedPos, peg$currPos),
      location1,
    );
  }

  function error(message: string, location1?: IFileRange) {
    location1 =
      location1 !== undefined
        ? location1
        : peg$computeLocation(peg$savedPos, peg$currPos);

    throw peg$buildSimpleError(message, location1);
  }

  function peg$literalExpectation(
    text1: string,
    ignoreCase: boolean,
  ): ILiteralExpectation {
    return {type: `literal`, text: text1, ignoreCase: ignoreCase};
  }

  function peg$classExpectation(
    parts: IClassParts,
    inverted: boolean,
    ignoreCase: boolean,
  ): IClassExpectation {
    return {
      type: `class`,
      parts: parts,
      inverted: inverted,
      ignoreCase: ignoreCase,
    };
  }

  function peg$anyExpectation(): IAnyExpectation {
    return {type: `any`};
  }

  function peg$endExpectation(): IEndExpectation {
    return {type: `end`};
  }

  function peg$otherExpectation(description: string): IOtherExpectation {
    return {type: `other`, description: description};
  }

  function peg$computePosDetails(pos: number) {
    let details = peg$posDetailsCache[pos];
    let p;

    if (details) {
      return details;
    } else {
      p = pos - 1;
      while (!peg$posDetailsCache[p]) {
        p--;
      }

      details = peg$posDetailsCache[p];
      details = {
        line: details.line,
        column: details.column,
      };

      while (p < pos) {
        if (input.charCodeAt(p) === 10) {
          details.line++;
          details.column = 1;
        } else {
          details.column++;
        }

        p++;
      }

      peg$posDetailsCache[pos] = details;

      return details;
    }
  }

  function peg$computeLocation(startPos: number, endPos: number): IFileRange {
    const startPosDetails = peg$computePosDetails(startPos);
    const endPosDetails = peg$computePosDetails(endPos);

    return {
      start: {
        offset: startPos,
        line: startPosDetails.line,
        column: startPosDetails.column,
      },
      end: {
        offset: endPos,
        line: endPosDetails.line,
        column: endPosDetails.column,
      },
    };
  }

  function peg$fail(expected1: Expectation) {
    if (peg$currPos < peg$maxFailPos) {
      return;
    }

    if (peg$currPos > peg$maxFailPos) {
      peg$maxFailPos = peg$currPos;
      peg$maxFailExpected = [];
    }

    peg$maxFailExpected.push(expected1);
  }

  function peg$buildSimpleError(message: string, location1: IFileRange) {
    return new SyntaxError(message, [], ``, location1);
  }

  function peg$buildStructuredError(
    expected1: Expectation[],
    found: string | null,
    location1: IFileRange,
  ) {
    return new SyntaxError(
      SyntaxError.buildMessage(expected1, found),
      expected1,
      found,
      location1,
    );
  }

  function peg$parsestart(): any {
    let s0, s1, s2, s3;

    s0 = peg$currPos;
    s1 = peg$parse_();
    if (s1 !== peg$FAILED) {
      s2 = peg$parseroot();
      if (s2 !== peg$FAILED) {
        s3 = peg$parse_();
        if (s3 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c0(s2);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parseroot(): any {
    let s0;

    s0 = peg$parseobject();
    if (s0 === peg$FAILED) {
      s0 = peg$parsearray();
      if (s0 === peg$FAILED) {
        s0 = peg$parsestring();
        if (s0 === peg$FAILED) {
          s0 = peg$parsenumber();
          if (s0 === peg$FAILED) {
            s0 = peg$parseboolean();
            if (s0 === peg$FAILED) {
              s0 = peg$parsenull();
              if (s0 === peg$FAILED) {
                s0 = peg$parseundefined();
              }
            }
          }
        }
      }
    }

    return s0;
  }

  function peg$parseobject(): any {
    let s0, s1, s2, s3, s4, s5, s6;

    s0 = peg$currPos;
    if (input.charCodeAt(peg$currPos) === 123) {
      s1 = peg$c1;
      peg$currPos++;
    } else {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) {
        peg$fail(peg$c2);
      }
    }
    if (s1 !== peg$FAILED) {
      s2 = peg$parse_();
      if (s2 !== peg$FAILED) {
        s3 = [];
        s4 = peg$parseobjectEntryWithComma();
        while (s4 !== peg$FAILED) {
          s3.push(s4);
          s4 = peg$parseobjectEntryWithComma();
        }
        if (s3 !== peg$FAILED) {
          s4 = peg$parseobjectEntry();
          if (s4 === peg$FAILED) {
            s4 = null;
          }
          if (s4 !== peg$FAILED) {
            s5 = peg$parse_();
            if (s5 !== peg$FAILED) {
              if (input.charCodeAt(peg$currPos) === 125) {
                s6 = peg$c3;
                peg$currPos++;
              } else {
                s6 = peg$FAILED;
                if (peg$silentFails === 0) {
                  peg$fail(peg$c4);
                }
              }
              if (s6 !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$c5(s3, s4);
                s0 = s1;
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parseobjectEntryWithComma(): any {
    let s0, s1, s2, s3, s4;

    s0 = peg$currPos;
    s1 = peg$parseobjectEntry();
    if (s1 !== peg$FAILED) {
      s2 = peg$parse_();
      if (s2 !== peg$FAILED) {
        if (input.charCodeAt(peg$currPos) === 44) {
          s3 = peg$c6;
          peg$currPos++;
        } else {
          s3 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c7);
          }
        }
        if (s3 !== peg$FAILED) {
          s4 = peg$parse_();
          if (s4 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c8(s1);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parseobjectEntry(): any {
    let s0, s1, s2, s3, s4, s5;

    s0 = peg$currPos;
    s1 = peg$parseobjectIdentifier();
    if (s1 !== peg$FAILED) {
      s2 = peg$parse_();
      if (s2 !== peg$FAILED) {
        if (input.charCodeAt(peg$currPos) === 58) {
          s3 = peg$c9;
          peg$currPos++;
        } else {
          s3 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c10);
          }
        }
        if (s3 !== peg$FAILED) {
          s4 = peg$parse_();
          if (s4 !== peg$FAILED) {
            s5 = peg$parsestart();
            if (s5 !== peg$FAILED) {
              peg$savedPos = s0;
              s1 = peg$c11(s1, s5);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parseobjectIdentifier(): any {
    let s0, s1, s2;

    s0 = peg$currPos;
    s1 = [];
    if (peg$c12.test(input.charAt(peg$currPos))) {
      s2 = input.charAt(peg$currPos);
      peg$currPos++;
    } else {
      s2 = peg$FAILED;
      if (peg$silentFails === 0) {
        peg$fail(peg$c13);
      }
    }
    if (s2 !== peg$FAILED) {
      while (s2 !== peg$FAILED) {
        s1.push(s2);
        if (peg$c12.test(input.charAt(peg$currPos))) {
          s2 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s2 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c13);
          }
        }
      }
    } else {
      s1 = peg$FAILED;
    }
    if (s1 !== peg$FAILED) {
      peg$savedPos = s0;
      s1 = peg$c14(s1);
    }
    s0 = s1;

    return s0;
  }

  function peg$parsearray(): any {
    let s0, s1, s2, s3, s4, s5;

    s0 = peg$currPos;
    if (input.charCodeAt(peg$currPos) === 91) {
      s1 = peg$c15;
      peg$currPos++;
    } else {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) {
        peg$fail(peg$c16);
      }
    }
    if (s1 !== peg$FAILED) {
      s2 = peg$parse_();
      if (s2 !== peg$FAILED) {
        s3 = [];
        s4 = peg$parsearrayEntry();
        while (s4 !== peg$FAILED) {
          s3.push(s4);
          s4 = peg$parsearrayEntry();
        }
        if (s3 !== peg$FAILED) {
          s4 = peg$parse_();
          if (s4 !== peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 93) {
              s5 = peg$c17;
              peg$currPos++;
            } else {
              s5 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c18);
              }
            }
            if (s5 !== peg$FAILED) {
              peg$savedPos = s0;
              s1 = peg$c19(s3);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parsearrayEntry(): any {
    let s0, s1;

    s0 = peg$currPos;
    s1 = peg$parsestart();
    if (s1 !== peg$FAILED) {
      peg$savedPos = s0;
      s1 = peg$c20(s1);
    }
    s0 = s1;

    return s0;
  }

  function peg$parsestring(): any {
    let s0, s1, s2, s3;

    s0 = peg$currPos;
    if (input.charCodeAt(peg$currPos) === 39) {
      s1 = peg$c21;
      peg$currPos++;
    } else {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) {
        peg$fail(peg$c22);
      }
    }
    if (s1 !== peg$FAILED) {
      s2 = [];
      if (peg$c23.test(input.charAt(peg$currPos))) {
        s3 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s3 = peg$FAILED;
        if (peg$silentFails === 0) {
          peg$fail(peg$c24);
        }
      }
      while (s3 !== peg$FAILED) {
        s2.push(s3);
        if (peg$c23.test(input.charAt(peg$currPos))) {
          s3 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s3 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c24);
          }
        }
      }
      if (s2 !== peg$FAILED) {
        if (input.charCodeAt(peg$currPos) === 39) {
          s3 = peg$c21;
          peg$currPos++;
        } else {
          s3 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c22);
          }
        }
        if (s3 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c25(s2);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parsenumber(): any {
    let s0;

    s0 = peg$parsenumberNeg();
    if (s0 === peg$FAILED) {
      s0 = peg$parsenumberPos();
      if (s0 === peg$FAILED) {
        s0 = peg$parsenumberHex();
        if (s0 === peg$FAILED) {
          s0 = peg$parsenumberOct();
          if (s0 === peg$FAILED) {
            s0 = peg$parsenumberBin();
            if (s0 === peg$FAILED) {
              s0 = peg$parsezero();
            }
          }
        }
      }
    }

    return s0;
  }

  function peg$parsenumberNeg(): any {
    let s0, s1, s2;

    s0 = peg$currPos;
    if (input.charCodeAt(peg$currPos) === 45) {
      s1 = peg$c26;
      peg$currPos++;
    } else {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) {
        peg$fail(peg$c27);
      }
    }
    if (s1 !== peg$FAILED) {
      s2 = peg$parsenumberPos();
      if (s2 !== peg$FAILED) {
        peg$savedPos = s0;
        s1 = peg$c28(s2);
        s0 = s1;
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parsenumberPos(): any {
    let s0;

    s0 = peg$parsenumberPosDecimal();
    if (s0 === peg$FAILED) {
      s0 = peg$parsenumberPosInt();
    }

    return s0;
  }

  function peg$parsenumberInt(): any {
    let s0;

    s0 = peg$parsezero();
    if (s0 === peg$FAILED) {
      s0 = peg$parsenumberPosInt();
    }

    return s0;
  }

  function peg$parsenumberPosInt(): any {
    let s0, s1, s2, s3;

    s0 = peg$currPos;
    if (peg$c29.test(input.charAt(peg$currPos))) {
      s1 = input.charAt(peg$currPos);
      peg$currPos++;
    } else {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) {
        peg$fail(peg$c30);
      }
    }
    if (s1 !== peg$FAILED) {
      s2 = [];
      if (peg$c31.test(input.charAt(peg$currPos))) {
        s3 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s3 = peg$FAILED;
        if (peg$silentFails === 0) {
          peg$fail(peg$c32);
        }
      }
      while (s3 !== peg$FAILED) {
        s2.push(s3);
        if (peg$c31.test(input.charAt(peg$currPos))) {
          s3 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s3 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c32);
          }
        }
      }
      if (s2 !== peg$FAILED) {
        peg$savedPos = s0;
        s1 = peg$c33(s1, s2);
        s0 = s1;
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parsenumberPosDecimal(): any {
    let s0, s1, s2, s3, s4;

    s0 = peg$currPos;
    s1 = peg$parsenumberInt();
    if (s1 === peg$FAILED) {
      s1 = null;
    }
    if (s1 !== peg$FAILED) {
      if (input.charCodeAt(peg$currPos) === 46) {
        s2 = peg$c34;
        peg$currPos++;
      } else {
        s2 = peg$FAILED;
        if (peg$silentFails === 0) {
          peg$fail(peg$c35);
        }
      }
      if (s2 !== peg$FAILED) {
        s3 = [];
        if (input.charCodeAt(peg$currPos) === 48) {
          s4 = peg$c36;
          peg$currPos++;
        } else {
          s4 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c37);
          }
        }
        while (s4 !== peg$FAILED) {
          s3.push(s4);
          if (input.charCodeAt(peg$currPos) === 48) {
            s4 = peg$c36;
            peg$currPos++;
          } else {
            s4 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c37);
            }
          }
        }
        if (s3 !== peg$FAILED) {
          s4 = peg$parsenumberPosInt();
          if (s4 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c38(s1, s3, s4);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parsezero(): any {
    let s0, s1;

    s0 = peg$currPos;
    if (input.charCodeAt(peg$currPos) === 48) {
      s1 = peg$c36;
      peg$currPos++;
    } else {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) {
        peg$fail(peg$c37);
      }
    }
    if (s1 !== peg$FAILED) {
      peg$savedPos = s0;
      s1 = peg$c39();
    }
    s0 = s1;

    return s0;
  }

  function peg$parsenumberHex(): any {
    let s0, s1, s2, s3;

    s0 = peg$currPos;
    if (input.substr(peg$currPos, 2) === peg$c40) {
      s1 = peg$c40;
      peg$currPos += 2;
    } else {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) {
        peg$fail(peg$c41);
      }
    }
    if (s1 !== peg$FAILED) {
      s2 = [];
      if (peg$c42.test(input.charAt(peg$currPos))) {
        s3 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s3 = peg$FAILED;
        if (peg$silentFails === 0) {
          peg$fail(peg$c43);
        }
      }
      if (s3 !== peg$FAILED) {
        while (s3 !== peg$FAILED) {
          s2.push(s3);
          if (peg$c42.test(input.charAt(peg$currPos))) {
            s3 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s3 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c43);
            }
          }
        }
      } else {
        s2 = peg$FAILED;
      }
      if (s2 !== peg$FAILED) {
        peg$savedPos = s0;
        s1 = peg$c44(s2);
        s0 = s1;
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parsenumberOct(): any {
    let s0, s1, s2, s3;

    s0 = peg$currPos;
    if (input.substr(peg$currPos, 2) === peg$c45) {
      s1 = peg$c45;
      peg$currPos += 2;
    } else {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) {
        peg$fail(peg$c46);
      }
    }
    if (s1 !== peg$FAILED) {
      s2 = [];
      if (peg$c47.test(input.charAt(peg$currPos))) {
        s3 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s3 = peg$FAILED;
        if (peg$silentFails === 0) {
          peg$fail(peg$c48);
        }
      }
      if (s3 !== peg$FAILED) {
        while (s3 !== peg$FAILED) {
          s2.push(s3);
          if (peg$c47.test(input.charAt(peg$currPos))) {
            s3 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s3 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c48);
            }
          }
        }
      } else {
        s2 = peg$FAILED;
      }
      if (s2 !== peg$FAILED) {
        peg$savedPos = s0;
        s1 = peg$c49(s2);
        s0 = s1;
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parsenumberBin(): any {
    let s0, s1, s2, s3;

    s0 = peg$currPos;
    if (input.substr(peg$currPos, 2) === peg$c50) {
      s1 = peg$c50;
      peg$currPos += 2;
    } else {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) {
        peg$fail(peg$c51);
      }
    }
    if (s1 !== peg$FAILED) {
      s2 = [];
      if (peg$c52.test(input.charAt(peg$currPos))) {
        s3 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s3 = peg$FAILED;
        if (peg$silentFails === 0) {
          peg$fail(peg$c53);
        }
      }
      if (s3 !== peg$FAILED) {
        while (s3 !== peg$FAILED) {
          s2.push(s3);
          if (peg$c52.test(input.charAt(peg$currPos))) {
            s3 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s3 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c53);
            }
          }
        }
      } else {
        s2 = peg$FAILED;
      }
      if (s2 !== peg$FAILED) {
        peg$savedPos = s0;
        s1 = peg$c54(s2);
        s0 = s1;
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parseboolean(): any {
    let s0;

    s0 = peg$parsebooleanTrue();
    if (s0 === peg$FAILED) {
      s0 = peg$parsebooleanFalse();
    }

    return s0;
  }

  function peg$parsebooleanTrue(): any {
    let s0, s1;

    s0 = peg$currPos;
    if (input.substr(peg$currPos, 4) === peg$c55) {
      s1 = peg$c55;
      peg$currPos += 4;
    } else {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) {
        peg$fail(peg$c56);
      }
    }
    if (s1 === peg$FAILED) {
      if (input.substr(peg$currPos, 4) === peg$c57) {
        s1 = peg$c57;
        peg$currPos += 4;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) {
          peg$fail(peg$c58);
        }
      }
      if (s1 === peg$FAILED) {
        if (input.charCodeAt(peg$currPos) === 84) {
          s1 = peg$c59;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c60);
          }
        }
      }
    }
    if (s1 !== peg$FAILED) {
      peg$savedPos = s0;
      s1 = peg$c61();
    }
    s0 = s1;

    return s0;
  }

  function peg$parsebooleanFalse(): any {
    let s0, s1;

    s0 = peg$currPos;
    if (input.substr(peg$currPos, 5) === peg$c62) {
      s1 = peg$c62;
      peg$currPos += 5;
    } else {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) {
        peg$fail(peg$c63);
      }
    }
    if (s1 === peg$FAILED) {
      if (input.substr(peg$currPos, 5) === peg$c64) {
        s1 = peg$c64;
        peg$currPos += 5;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) {
          peg$fail(peg$c65);
        }
      }
      if (s1 === peg$FAILED) {
        if (input.charCodeAt(peg$currPos) === 70) {
          s1 = peg$c66;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c67);
          }
        }
      }
    }
    if (s1 !== peg$FAILED) {
      peg$savedPos = s0;
      s1 = peg$c68();
    }
    s0 = s1;

    return s0;
  }

  function peg$parsenull(): any {
    let s0, s1;

    s0 = peg$currPos;
    if (input.substr(peg$currPos, 4) === peg$c69) {
      s1 = peg$c69;
      peg$currPos += 4;
    } else {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) {
        peg$fail(peg$c70);
      }
    }
    if (s1 === peg$FAILED) {
      if (input.substr(peg$currPos, 4) === peg$c71) {
        s1 = peg$c71;
        peg$currPos += 4;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) {
          peg$fail(peg$c72);
        }
      }
    }
    if (s1 !== peg$FAILED) {
      peg$savedPos = s0;
      s1 = peg$c73();
    }
    s0 = s1;

    return s0;
  }

  function peg$parseundefined(): any {
    let s0, s1;

    s0 = peg$currPos;
    if (input.substr(peg$currPos, 9) === peg$c74) {
      s1 = peg$c74;
      peg$currPos += 9;
    } else {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) {
        peg$fail(peg$c75);
      }
    }
    if (s1 !== peg$FAILED) {
      peg$savedPos = s0;
      s1 = peg$c76();
    }
    s0 = s1;

    return s0;
  }

  function peg$parse_(): any {
    let s0, s1;

    peg$silentFails++;
    s0 = [];
    s1 = peg$parsewhitespace();
    while (s1 !== peg$FAILED) {
      s0.push(s1);
      s1 = peg$parsewhitespace();
    }
    peg$silentFails--;
    if (s0 === peg$FAILED) {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) {
        peg$fail(peg$c77);
      }
    }

    return s0;
  }

  function peg$parsewhitespace(): any {
    let s0;

    if (peg$c78.test(input.charAt(peg$currPos))) {
      s0 = input.charAt(peg$currPos);
      peg$currPos++;
    } else {
      s0 = peg$FAILED;
      if (peg$silentFails === 0) {
        peg$fail(peg$c79);
      }
    }

    return s0;
  }

  peg$result = peg$startRuleFunction();

  if (peg$result !== peg$FAILED && peg$currPos === input.length) {
    return peg$result;
  } else {
    if (peg$result !== peg$FAILED && peg$currPos < input.length) {
      peg$fail(peg$endExpectation());
    }

    throw peg$buildStructuredError(
      peg$maxFailExpected,
      peg$maxFailPos < input.length ? input.charAt(peg$maxFailPos) : null,
      peg$maxFailPos < input.length
        ? peg$computeLocation(peg$maxFailPos, peg$maxFailPos + 1)
        : peg$computeLocation(peg$maxFailPos, peg$maxFailPos),
    );
  }
}

export interface IParseOptions {
  filename?: string;
  startRule?: string;
  tracer?: any;
  [key: string]: any;
}
export type ParseFunction = (input: string, options?: IParseOptions) => any;
export const parse: ParseFunction = peg$parse;
