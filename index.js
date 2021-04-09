"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FusejsModule = void 0;
var core_1 = require("@angular/core");
var fusejs_pipe_1 = require("./src/fusejs.pipe");
var fusejs_service_1 = require("./src/fusejs.service");
var FusejsModule = /** @class */ (function () {
    function FusejsModule() {
    }
    FusejsModule = __decorate([
        core_1.NgModule({
            providers: [
                fusejs_service_1.FusejsService
            ],
            declarations: [
                fusejs_pipe_1.FusejsPipe,
            ],
            exports: [
                fusejs_pipe_1.FusejsPipe,
            ]
        })
    ], FusejsModule);
    return FusejsModule;
}());
exports.FusejsModule = FusejsModule;
__exportStar(require("./src/fusejs.service"), exports);
__exportStar(require("./src/fusejs.pipe"), exports);
