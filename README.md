# simple-search-query

Simple logic search query matcher. Execute query like:

* `XML and HTML` Looking for both keywords *XML* and *HTML*.
* `English and (not GB)` Looking for *English* and no *GB* present.

## Why

This is a simple practice to know how to use [PEG.js][]. And my target is to build a logical query can help people filter data. Using common syntax people can easily understand or already known.

## Usage

```js
import query from 'simple-search-query';

const q = query('XML or HTML or "Foo Bar"');

q('XML/HTML'); // true
q('XSLT'); // false
q('XHTML'); // false, default matcher use word boundary
```

## Reference

### function `query`

Default export from **simple-search-query**.

#### syntax

```js
query(query_string)
query(query_string, options)
```

Return a `q` function can be used to search by the given query_string.

#### parameters

*   `query_string`: The logic query string from the user or other input.
*   `options`: Optional default options object.

### function `q`

#### syntax

```js
q(text);
q(text, options);

```

#### parameters

*   `text`: Text to search.  
*   `options`: Optional options object.

### Options Object

*   `i`: Ignore case, default `true`.  
*   `matcher`: Matcher function, default matcher function use regexp and word boundary like:

    ```js
    () => !!(new RegExp(`\\b${query}\\b`)).test(entry)
    ```
   
    There are two more built-in matcher functions:
    
    `has`: Not care about word boundary, use `indexOf`. Since CJK characters do not work well with word boundary. `has` might be a good choice to search them.  
    `eqeq`: Full match, use `===`.

    If you want to assign the default matcher in options, use `default`.
   
    It's also possible to send custom matcher function, and the function will receive following arguments in order:

    1.  `entry`: Text to search.
    2.  `query`: The item from parse query string. For example: `XML or HTML or "Foo Bar"`. The matcher function will be called three times
        with different query argument. One is `XML`, second is `HTML`. The last one is `Foo Bar`.
        
    3.  `options`: Options object.

    Custom matcher function needs to handle ignore case setting in options object itself.
    The custom matcher function should return a boolean value, then q function will handle the rest (logic part of the query string).


## Query String Syntax

Supports logic:

* `and`, `&` infix
* `or`, `|` infix
* `not`, `!` prefix

Supports subquery, use `()` to wrap subexpression.

Supports quoted string, both double and single quoted string.

[PEG.js]:https://pegjs.org/
