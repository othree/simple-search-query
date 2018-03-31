start
  = orQuery?

orQuery
  = left:andQuery Or right:orQuery { return {"op": "or", "left": left, "right": right}; }
  / andQuery

andQuery
  = left:notQuery And right:andQuery { return {"op": "and", "left": left, "right": right}; }
  / notQuery

notQuery
  = Not right:subQuery { return {"op": "noeq", "right": right}; }
  / subQuery

subQuery
  = '(' ws* query:orQuery ws* ')' { return query; }
  / queryValue

queryValue
  = value:Literal { return {"op": "eq", "right": value.join('')}; } 

Or
  = ws+ 'or'i ws+
  / ws* '|' ws*

And
  = ws+ 'and'i ws+
  / ws* '&' ws*

Not
  = 'not'i ws+
  / '!'

Literal
  = QuotedString / UnquotedString

QuotedString
  = DoubleQuotedString / SingleQuotedString

DoubleQuotedString
  = '"' value:DoubleQuotedCharacter* '"' { return value; }

SingleQuotedString
  = "'" value:SingleQuotedCharacter* "'" { return value; }

DoubleQuotedCharacter
  = '\\' char:[\\"] { return char; }
  / char:[^"] { return char; }

SingleQuotedCharacter
  = '\\' char:[\\'] { return char; }
  / char:[^'] { return char; }

UnquotedString
  = value:UnquotedCharacter+ { return value; }

UnquotedCharacter
  = char:[^'"()&| \t\r\n] { return char; }

ws "whitespace"
  = [ \t\r\n]
