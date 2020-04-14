Object.defineProperty(Array.prototype, "random", {
    value: function random() {
        return this[Math.floor(Math.random() * this.length)];
    },
    writable: true,
    configurable: true
});

Object.defineProperty(Array.prototype, "last", {
    value: function last(index) {
        return this[this.length - (index || 1)];
    },
    writable: true,
    configurable: true
});