import test from 'tape';
import query from '../';

test('timing test', function (t) {
  t.plan(3);

  const q = query('HTML or XHTML');

  t.ok(q('HTML'));
  t.ok(q('XHTML'));
  t.notOk(q('XML'));
});
