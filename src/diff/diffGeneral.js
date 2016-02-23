import diffRet from './diffRet';

let diffGeneral = (nem, old, update) => {
    let simpleRet = diffInSimple(nem, old);
    if (simpleRet !== false) {
        return simpleRet;
    }
    return update(nem, old);
};

let diffInSimple = (nem, old) => {
    if (!nem && !old) {
        return diffRet.update(nem, old, null);
    } else if (!nem) {
        return diffRet.remove(nem, old);
    } else if (!old) {
        return diffRet.add(nem, old);
    }

    return false;
};

module.exports = diffGeneral;
