var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import * as functions from 'firebase-functions';
var FunctionsIndex = /** @class */ (function () {
    function FunctionsIndex() {
    }
    return FunctionsIndex;
}());
export { FunctionsIndex };
var Controller = /** @class */ (function (_super) {
    __extends(Controller, _super);
    function Controller() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Controller;
}(FunctionsIndex));
export function start(controllers, middleClass) {
    var _this = this;
    var _loop_1 = function (controller) {
        var prot = Object.getPrototypeOf(controller);
        var methods = Object.getOwnPropertyNames(prot);
        var _loop_2 = function (fn) {
            if (fn === 'constructor') {
                //
            }
            else {
                var options = Object.getPrototypeOf(controller[fn]).options;
                var middleware_1 = Object.getPrototypeOf(controller[fn])
                    .middleware;
                var cName = controller.constructor.name;
                if (options.type === 'onCall') {
                    exports[cName.charAt(0).toLowerCase() +
                        cName.slice(1) +
                        '_' +
                        fn.charAt(0).toUpperCase() +
                        fn.slice(1)] = functions
                        .region(options.region)
                        .https.onCall(function (data, context) { return __awaiter(_this, void 0, void 0, function () {
                        var myMiddle, _i, middleware_2, midfn, err_1;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    _a.trys.push([0, 5, , 6]);
                                    if (!(middleware_1 &&
                                        middleware_1.length > 0 &&
                                        middleClass)) return [3 /*break*/, 4];
                                    myMiddle = new middleClass();
                                    _i = 0, middleware_2 = middleware_1;
                                    _a.label = 1;
                                case 1:
                                    if (!(_i < middleware_2.length)) return [3 /*break*/, 4];
                                    midfn = middleware_2[_i];
                                    return [4 /*yield*/, myMiddle[midfn](data, context)];
                                case 2:
                                    _a.sent();
                                    _a.label = 3;
                                case 3:
                                    _i++;
                                    return [3 /*break*/, 1];
                                case 4: return [2 /*return*/, controller[fn](data, context)];
                                case 5:
                                    err_1 = _a.sent();
                                    console.log(err_1);
                                    throw new functions.https.HttpsError('unknown', 'An uknown error has occured');
                                case 6: return [2 /*return*/];
                            }
                        });
                    }); });
                }
            }
        };
        for (var _i = 0, methods_1 = methods; _i < methods_1.length; _i++) {
            var fn = methods_1[_i];
            _loop_2(fn);
        }
    };
    for (var _i = 0, controllers_1 = controllers; _i < controllers_1.length; _i++) {
        var controller = controllers_1[_i];
        _loop_1(controller);
    }
}
//# sourceMappingURL=Main.js.map