import n from './node';
import diff from './diff';

// test
let log = console.log; //eslint-disable-line
let builder = (list = [1, 2, 3]) =>
    n('body', {}, [n('div', {}, [
        n('div'), list.map((item) => n('div', {
            v: item
        }))
    ])]);

let t1 = builder();
let t2 = builder([1, 2, 4, 5, 7]);

log(diff(t1, null));
log(diff(t2, t1));

module.exports = {
    n,
    diff
};
