import {Injectable} from '@angular/core';
import Fuse from 'fuse.js';
import {FuseOptions} from 'fuse.js'

import _set = require('lodash.set');
import _get = require('lodash.get');


export interface AngularFusejsOptions<T> extends FuseOptions<T> {
  supportHighlight?: boolean;
  fusejsHighlightKey?: string;
  fusejsScoreKey?: string;
  minSearchTermLength?: number; // = 0;
  maximumScore?: number;
  highlightTag?: string;
}

@Injectable()
export class FusejsService<T> {
  private defaultOptions: AngularFusejsOptions<T> = {
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

  searchList(list: Array<T>, searchTerms: string, options: AngularFusejsOptions<T> = {}) {
    // https://stackoverflow.com/questions/35959372/property-assign-does-not-exist-on-type-objectconstructor
    // TODO : remove (<any>Object) hack by using right lib or polyfill ?
    const fuseOptions: AngularFusejsOptions<T> = (<any>Object).assign({}, this.defaultOptions, options);
    let result:any = [];

    if (searchTerms && searchTerms.length >= (fuseOptions?.minSearchTermLength || 0)) {
      if (fuseOptions.supportHighlight) {
        fuseOptions.includeMatches = true;
      }

      let fuse = new Fuse(list, fuseOptions);
      result = fuse.search(searchTerms);
      if (fuseOptions.supportHighlight) {
        result = this.handleHighlight(result, fuseOptions);
      }
    } else {
      result = this.deepClone(list);

      if (fuseOptions.supportHighlight) {
        result.forEach((element) => {
          element[fuseOptions.fusejsHighlightKey || '_'] = this.deepClone(element);
        });
      }
    }

    return result;
  }

  private deepClone(o) {
    var _out, v, _key;
    _out = Array.isArray(o) ? [] : {};
    for (_key in o) {
      v = o[_key];
      _out[_key] = (typeof v === "object") ? this.deepClone(v) : v;
    }
    return _out;
  }

  private handleHighlight(result, options: AngularFusejsOptions<T>) {
    if (options.maximumScore && options.includeScore) {
      result = result.filter((matchObject) => {
        return matchObject.score <= (options.maximumScore||0);
      })
    }

    return result.map((matchObject) => {
      const item = this.deepClone(matchObject.item);
      item[options.fusejsHighlightKey || "_"] = this.deepClone(item);
      item[options.fusejsScoreKey || "_"] = matchObject.score;
      for (let match of matchObject.matches) {
        const indices: number[][] = match.indices;

        let highlightOffset: number = 0;

        let key: string = match.key;
        if(_get(item[options.fusejsHighlightKey || "_"], key).constructor === Array) {
          key += `[${match.arrayIndex}]`
        }

        for (let indice of indices) {
          let initialValue: string = _get(item[options.fusejsHighlightKey || "_"], key) as string;

          const startOffset = indice[0] + highlightOffset;
          const endOffset = indice[1] + highlightOffset + 1;
          const tagStart = "<" + (options.highlightTag ?? "em") + ">";
          const tagEnd = "</" + (options.highlightTag ?? "em") + ">";
          let highlightedTerm = initialValue.substring(startOffset, endOffset);
          let newValue = initialValue.substring(0, startOffset) + tagStart + highlightedTerm + tagEnd + initialValue.substring(endOffset);
          highlightOffset += (tagStart + tagEnd).length;
          _set(item[options.fusejsHighlightKey || "_"], key, newValue);
        }
      }

      return item;
    });
  }
}
