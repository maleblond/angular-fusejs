"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FusejsService = void 0;
var core_1 = require("@angular/core");
var fuse_js_1 = __importDefault(require("fuse.js"));
var _set = require("lodash.set");
var _get = require("lodash.get");
var FusejsService = /** @class */ (function () {
    function FusejsService() {
        this.defaultOptions = {
            supportHighlight: true,
            shouldSort: false,
            threshold: 0.6,
            location: 0,
            distance: 100,
            maxPatternLength: 32,
            minMatchCharLength: 2,
            includeScore: true,
            minSearchTermLength: 3,
            fusejsHighlightKey: 'fuseJsHighlighted',
            fusejsScoreKey: 'fuseJsScore',
        };
    }
    FusejsService.prototype.searchList = function (list, searchTerms, options) {
        var _this = this;
        if (options === void 0) { options = {}; }
        // https://stackoverflow.com/questions/35959372/property-assign-does-not-exist-on-type-objectconstructor
        // TODO : remove (<any>Object) hack by using right lib or polyfill ?
        var fuseOptions = Object.assign({}, this.defaultOptions, options);
        var result = [];
        if (searchTerms && searchTerms.length >= fuseOptions.minSearchTermLength) {
            if (fuseOptions.supportHighlight) {
                fuseOptions.includeMatches = true;
            }
            var fuse = new fuse_js_1.default(list, fuseOptions);
            result = fuse.search(searchTerms);
            if (fuseOptions.supportHighlight) {
                result = this.handleHighlight(result, fuseOptions);
            }
        }
        else {
            result = this.deepClone(list);
            if (fuseOptions.supportHighlight) {
                result.forEach(function (element) {
                    element[fuseOptions.fusejsHighlightKey] = _this.deepClone(element);
                });
            }
        }
        return result;
    };
    FusejsService.prototype.deepClone = function (o) {
        var _out, v, _key;
        _out = Array.isArray(o) ? [] : {};
        for (_key in o) {
            v = o[_key];
            _out[_key] = (typeof v === "object") ? this.deepClone(v) : v;
        }
        return _out;
    };
    FusejsService.prototype.handleHighlight = function (result, options) {
        var _this = this;
        if (options.maximumScore && options.includeScore) {
            result = result.filter(function (matchObject) {
                return matchObject.score <= options.maximumScore;
            });
        }
        return result.map(function (matchObject) {
            var item = _this.deepClone(matchObject.item);
            item[options.fusejsHighlightKey] = _this.deepClone(item);
            item[options.fusejsScoreKey] = matchObject.score;
            for (var _i = 0, _a = matchObject.matches; _i < _a.length; _i++) {
                var match = _a[_i];
                var indices = match.indices;
                var highlightOffset = 0;
                var key = match.key;
                if (_get(item[options.fusejsHighlightKey], key).constructor === Array) {
                    key += "[" + match.arrayIndex + "]";
                }
                for (var _b = 0, indices_1 = indices; _b < indices_1.length; _b++) {
                    var indice = indices_1[_b];
                    var initialValue = _get(item[options.fusejsHighlightKey], key);
                    var startOffset = indice[0] + highlightOffset;
                    var endOffset = indice[1] + highlightOffset + 1;
                    var highlightedTerm = initialValue.substring(startOffset, endOffset);
                    var newValue = initialValue.substring(0, startOffset) + '<em>' + highlightedTerm + '</em>' + initialValue.substring(endOffset);
                    highlightOffset += '<em></em>'.length;
                    _set(item[options.fusejsHighlightKey], key, newValue);
                }
            }
            return item;
        });
    };
    FusejsService = __decorate([
        core_1.Injectable()
    ], FusejsService);
    return FusejsService;
}());
exports.FusejsService = FusejsService;
