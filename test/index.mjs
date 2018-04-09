import test from 'tape';
import query from '../';

test('Basic Test', function (t) {
  t.plan(3);

  const q = query('XML or XHTML');

  t.notOk(q('HTML'));
  t.ok(q('XHTML'));
  t.ok(q('XML'));
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

