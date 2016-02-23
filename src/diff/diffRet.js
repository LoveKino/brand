module.exports = {
    add: (newItem, oldItem) => {
        return {
            type: 'add',
            newItem,
            oldItem
        };
    },
    remove: (newItem, oldItem) => {
        return {
            type: 'remove',
            newItem,
            oldItem
        };
    },
    update: (newItem, oldItem, diffs) => {
        return {
            type: 'update',
            newItem,
            oldItem,
            diffs
        };
    },
    replace: (newItem, oldItem) => {
        return {
            type: 'replace',
            newItem,
            oldItem
        };
    }
};
