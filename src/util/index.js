const mapComputed = (propName) => {
    return {
        // getter
        get: function () {
            return this[propName]
        },
        // setter
        set: function (newValue) {
            this.$emit('update:' + propName, newValue);
        }
    }
}

const cleanEmpty = (obj, isCleanArray = true) => {
    if (Array.isArray(obj) && isCleanArray) {
        return obj
            .map(v => (v && typeof v === 'object') ? cleanEmpty(v) : v)
            .filter(v => !(v == null || v === '' || v.length === 0));
    } else {
        return Object.entries(obj)
            .map(([k, v]) => [k, v && typeof v === 'object' ? cleanEmpty(v) : v])
            .reduce((a, [k, v]) => ((v == null || v === '' || v.length === 0) ? a : (a[k] = v, a)), {});
    }
}

export {mapComputed, cleanEmpty}
