import diffRet from './diffRet';
import diffGeneral from './diffGeneral';

let diff = (newTree, oldTree) => {
    // diff two node
    let nodeDiff = diffNode(newTree, oldTree);

    if (nodeDiff.type !== 'update') { // only compare updated node's childExp
        return {
            nodeDiff
        };
    }

    // diff childExps
    let childExpDiffs = [];
    let newItems = newTree.childExps;
    let oldItems = oldTree.childExps;
    let length = Math.max(newItems.length, oldItems.length);
    for (let i = 0; i < length; i++) {
        let newItem = newItems[i];
        let oldItem = oldItems[i];
        childExpDiffs.push(diffChildExp(newItem, oldItem));
    }

    return {
        nodeDiff,
        childExpDiffs
    };
};

let diffChildExp = (nem, old) => diffGeneral(nem, old, () => {
    if (
        (isArray(nem) && !isArray(old)) ||
        (!isArray(nem) && isArray(old))
    ) {
        return diffRet.replace(nem, old);
    } else if (isArray(nem)) {
        // diff a list of nodes by order or key
        return diffArrayNodes(nem, old);
    } else {
        return diffRet.update(nem, old, diff(nem, old));
    }
});

let diffArrayNodes = (newNodes, oldNodes) => {
    let diffs = [];
    let map1 = buildMap(newNodes);
    let map2 = buildMap(oldNodes);

    for (let key in map1) {
        let nem = map1[key];
        let old = map2[key];

        diffs.push(
            diffGeneral(nem, old, () => diffRet.update(nem, old, diff(nem, old)))
        );
    }

    for (let key in map2) {
        if (!map1[key]) {
            diffs.push(diffRet.remove(map1[key], map2[key]));
        }
    }
};

let diffNode = (newNode, oldNode) => diffGeneral(newNode, oldNode, () => {
    if (newNode.tagName !== oldNode.tagName) {
        return diffRet.replace(newNode, oldNode);
    }

    let diffAttrs = {};
    let newAttrs = newNode.attributes;
    let oldAttrs = oldNode.attributes;
    for (let name in newAttrs) {
        let nem = newAttrs[name];
        let old = oldAttrs[name];
        diffAttrs[name] = diffGeneral(nem, old, () => {
            return diffRet.update(nem, old);
        });
    }

    for (let name in oldAttrs) {
        if (!newAttrs[name] && oldAttrs[name]) {
            diffAttrs[name] = diffRet.remove(newAttrs[name], oldAttrs[name]);
        }
    }

    return diffRet.update(newNode, oldNode, diffAttrs);
});

let buildMap = (nodes) => {
    let map = {};
    for (let i = 0; i < nodes.length; i++) {
        let node = nodes[i];
        if (!node) continue;
        let key = node.attributes['key'];
        if (typeof key !== 'string' && typeof key !== 'number') {
            key = i;
        }
        while (map[key]) {
            key = key + '-';
        }
        map[key] = node;
    }

    return map;
};

let isArray = v => v && typeof v === 'object' && typeof v.length === 'number';

module.exports = diff;
