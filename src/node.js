/**
 * describe a node with nodeName and attributes and childs with childExps
 *
 * node : nodeName, attributes, childNodes
 *
 * childExps = [ expression ]
 *
 * n('div', {}, [
 *      null,
 *      n('div'),
 *      a ? n('span') : n('div'),
 *      [1, 2, 3].map(() => n('li'))
 * ])
 *
 * 1. childExps is a list of expressions.
 *
 * 2. try to keep the length of childExps fixed.
 *
 * 3. each expression generates null or a node or a list of nodes.
 *
 *   (1) null means there is no child for node
 *
 *   (2) a node means there is a child for node
 *
 *   (3) a list of node means there are a list of childs for node
 *
 * 4. similar for node
 *
 *    when we say two nodes are similar, we mean that these nodes came from a same tmplate. Node template is a function which generates a node with the same structure.
 *
 * 5. similarity rules
 *
 * (1) two nodes came from two expression of childExps, they are not similar.
 *
 * (2) for an expression, when return a list we consider that: these nodes are similar!
 *
 * (3) null is not similar to any node
 *
 * (4) two nodes came from one expression, if they do not have tags, they are similar.
 *
 * (5) two nodes came from one expression, if they do have different tags, they are not similar.
 *
 * (6) two nodes came from one expression, if they do have same tags, they are similar.
 *
 * TODO tag for node
 */
let n = (nodeName, attributes = {}, childExps = []) => {
    if (typeof nodeName !== 'string')
        throw new TypeError('Expect string for nodeName, but got ' + nodeName);
    if (!isArray(childExps))
        throw new TypeError('Expect Array for childExps, but got ' + childExps);
    if (typeof attributes !== 'object')
        throw new TypeError('Expect Object for attributes, but got ' + attributes);
    return {
        nodeName,
        attributes,
        childExps
    };
};

let isArray = v => v && typeof v === 'object' && typeof v.length === 'number';

module.exports = n;
