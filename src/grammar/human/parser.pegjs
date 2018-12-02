start = _ root:root _ { return root }
root = object / array / string / number / boolean / null / undefined

/**
 * Objects
 */
object = "{" _ entries:objectEntryWithComma* lastEntry:objectEntry? _ "}" {
  const result: any = {};
  for (const {key, value} of entries) {
    result[key] = value;
  }

  if (lastEntry !== null) {
    result[lastEntry.key] = lastEntry.value;
  }

  return result;
}

objectEntryWithComma = entry:objectEntry _ "," _ { return entry }

objectEntry = key:objectIdentifier _ ":" _ value:start { return {key, value} }

objectIdentifier = entries:[a-zA-Z0-9_]+ { return entries.join('') }

/**
 * Arrays
 */
array = "[" _ entries:arrayEntry* _ "]" {
  const result = [];
  for (const {entry} of entries) {
    result.push(entry);
  }

  return result;
}

arrayEntry = entry:start { return {entry} }


/**
 * Strings
 */
string = "\"" content:([^"]*) "\"" { return content.join('') }

/**
 * Numbers
 */
number = numberNeg / numberPos / numberHex / numberOct / numberBin / zero

numberNeg = "-" positive:numberPos { return -1 * positive }

numberPos = numberPosDecimal / numberPosInt

numberInt = zero / numberPosInt

numberPosInt = lead:[1-9] rest:[0-9]*
{
  return parseInt(`${lead}${rest.join('')}`, 10);
}

numberPosDecimal = lead:numberInt? "." zeros:"0"* decimal:numberPosInt
{
  return parseFloat(`${lead || '0'}.${zeros.join('')}${decimal}`);
}

zero = "0" { return 0 }

numberHex = "0x" digits:[0-9abcdef]+ { return Number.parseInt(`0x${digits.join('')}`, 16) }

numberOct = "0o" digits:[0-7]+ { return Number.parseInt(digits.join(''), 8) }

numberBin = "0b" digits:[01]+ { return Number.parseInt(digits.join(''), 2) }

/**
 * Booleans
 */
boolean = booleanTrue / booleanFalse

booleanTrue = ("true" / "TRUE" / "T") { return true }

booleanFalse = ("false" / "FALSE" / "F") { return false }

/**
 * Nulls
 */
null = ("NULL" / "null") { return null }

/**
 * Undefineds
 */
undefined = "undefined" { return undefined }

/**
 * General, basic components
 */
_ "whitespace" = whitespace*

whitespace = [ \r\t\n]