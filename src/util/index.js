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

export {mapComputed}
