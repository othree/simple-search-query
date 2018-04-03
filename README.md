# simple-search-query

Simple logic search query matcher. Excute query like:

* `XML and HTML` Looking for both keywords *XML* and *HTML*.
* `English and (not GB)` Looking for *English* and no *GB* present.

## Why

This is a simple practice to know how to use [PEG.js][]. And my target is to build a logical query can help people filter data. Using common syntax people can easily understand or already known.

## Usage

```js
import query from 'simple-search-query';

const q = query('XML or HTML');

console.log(q('XML/HTML')); // true
console.log(q('XSLT')); // false
console.log(q('XHTML')); // false, default matcher use word boundary
```

[PEG.js]:https://pegjs.org/