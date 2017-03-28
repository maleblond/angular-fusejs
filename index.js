"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var fusejs_pipe_1 = require("./src/fusejs.pipe");
var fusejs_service_1 = require("./src/fusejs.service");
var FusejsModule = (function () {
    function FusejsModule() {
    }
    return FusejsModule;
}());
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
exports.FusejsModule = FusejsModule;
__export(require("./src/fusejs.service"));
__export(require("./src/fusejs.pipe"));
