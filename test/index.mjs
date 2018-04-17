import test from 'tape';
import query from '../';

test('Basic Test', function (t) {
  t.plan(3);

  const q = query('XML or XHTML');

  t.notOk(q('HTML'));
  t.ok(q('XHTML'));
  t.ok(q('XML'));
});

test('Not Query', function (t) {
  t.plan(3);

  const q = query('not XML and not XHTML');

  t.ok(q('HTML'));
  t.notOk(q('XHTML'));
  t.notOk(q('XML'));
});

test('Has Matcher', function (t) {
  t.plan(3);

  const q = query('XML or HTML');

  t.ok(q('HTML', {matcher: 'has'}));
  t.ok(q('XHTML', {matcher: 'has'}));
  t.ok(q('XML', {matcher: 'has'}));
});

test('Eqeq Matcher', function (t) {
  t.plan(3);

  const q = query('XML or HTML');

  t.ok(q('HTML', {matcher: 'eqeq'}));
  t.notOk(q('XHTML', {matcher: 'eqeq'}));
  t.ok(q('XML', {matcher: 'eqeq'}));
});

test('Default Options', function (t) {
  t.plan(3);

  const q = query('XML or HTML', {matcher: 'eqeq'});

  t.ok(q('HTML'));
  t.notOk(q('XHTML'));
  t.ok(q('XHTML', {matcher: 'has'}));
});

test('Not Ignore Case', function (t) {
  t.plan(4);

  const q = query('XML or XHTML', {i: false});

  t.notOk(q('xhtml'));
  t.notOk(q('XHTml'));
  t.notOk(q('xml'));
  t.ok(q('XML'));
});

test('Custom Matcher', function (t) {
  t.plan(4);

  const q = query('HTML and XHTML', {i: false, matcher: () => true});

  t.ok(q('xhtml'));
  t.ok(q('XSL'));
  t.ok(q('xml'));
  t.ok(q('foo bar'));
});

test('Quoted String', function (t) {
  t.plan(4);

  const q = query('"foo bar" or XHTML');

  t.ok(q('xhtml'));
  t.ok(q('foo bar'));
  t.notOk(q('foo  bar'));
  t.notOk(q('foo barr'));
});
