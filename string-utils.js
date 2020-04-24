Object.defineProperty(String.prototype, "uc", {
    value: function uc() {
        return this.charAt(0).toUpperCase() + this.slice(1);
    },
    writable: true,
    configurable: true
});