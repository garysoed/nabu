start = _ root:root _ { return root }
root = object / list / string / number / boolean

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
 * Lists
 */
list = "[" _ entries:listEntryWithComma* lastEntry:listEntry? _ "]" {
  const result = [];
  for (const {entry} of entries) {
    result.push(entry);
  }

  if (lastEntry !== null) {
    result.push(lastEntry.entry);
  }

  return result;
}

listEntryWithComma = entry:listEntry _ "," _ { return entry }

listEntry = entry:start { return {entry} }


/**
 * Strings
 */
string = "\"" content:([^"]*) "\"" { return content.join('') }

/**
 * Numbers
 */
number = numberNeg / numberPos

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

/**
 * Booleans
 */
boolean = booleanTrue / booleanFalse

booleanTrue = ("true" / "TRUE" / "T") { return true }

booleanFalse = ("false" / "FALSE" / "F") { return false }

/**
 * General, basic components
 */
_ "whitespace" = whitespace*

whitespace = [ \r\t\n]