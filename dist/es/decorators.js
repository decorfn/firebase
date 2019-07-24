export function FireFunction(options) {
    return function (target, key) {
        Object.getPrototypeOf(target[key]).options = options;
        Object.getPrototypeOf(target[key]).fName = key;
    };
}
export function CallMiddleware(middleware) {
    return function (target, key) {
        Object.getPrototypeOf(target[key]).middleware = middleware;
    };
}
//# sourceMappingURL=decorators.js.map