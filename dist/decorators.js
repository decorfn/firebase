"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function FireFunction(options) {
    return function (target, key) {
        Object.getPrototypeOf(target[key]).options = options;
        Object.getPrototypeOf(target[key]).fName = key;
    };
}
exports.FireFunction = FireFunction;
function CallMiddleware(middleware) {
    return function (target, key) {
        Object.getPrototypeOf(target[key]).middleware = middleware;
    };
}
exports.CallMiddleware = CallMiddleware;
//# sourceMappingURL=decorators.js.map