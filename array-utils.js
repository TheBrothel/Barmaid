Object.defineProperty(Array.prototype, "random", {
    value: function random() {
        return this[Math.floor(Math.random() * this.length)];
    },
    writable: true,
    configurable: true
});