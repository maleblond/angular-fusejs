import {Injectable} from '@angular/core'
import * as Fuse from 'fuse.js'
import FuseOptions = Fuse.FuseOptions;

import _set = require('lodash.set');
import _get = require('lodash.get');


export interface AngularFusejsOptions extends FuseOptions {
  supportHighlight?: boolean;
  fusejsHighlightKey?: string;
  fusejsScoreKey?: string;
  minSearchTermLength?: number;
  maximumScore?: number;
}

@Injectable()
export class FusejsService {
  private defaultOptions: AngularFusejsOptions = {
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

  searchList(list: Array<any>, searchTerms: string, options: AngularFusejsOptions = {}) {
    const fuseOptions: AngularFusejsOptions = Object.assign({}, this.defaultOptions, options);
    let result = [];

    if (searchTerms && searchTerms.length >= fuseOptions.minSearchTermLength) {
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
          element[fuseOptions.fusejsHighlightKey] = this.deepClone(element);
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

  private handleHighlight(result, options: AngularFusejsOptions) {
    if (options.maximumScore && options.includeScore) {
      result = result.filter((matchObject) => {
        return matchObject.score <= options.maximumScore;
      })
    }

    return result.map((matchObject) => {
      const item = this.deepClone(matchObject.item);
      item[options.fusejsHighlightKey] = this.deepClone(item);
      item[options.fusejsScoreKey] = matchObject.score;
      for (let match of matchObject.matches) {
        const indices: number[][] = match.indices;

        let highlightOffset: number = 0;

        let key: string = match.key;
        if(_get(item[options.fusejsHighlightKey], key).constructor === Array) {
          key += `[${match.arrayIndex}]`
        }

        for (let indice of indices) {
          let initialValue: string = _get(item[options.fusejsHighlightKey], key) as string;

          const startOffset = indice[0] + highlightOffset;
          const endOffset = indice[1] + highlightOffset + 1;
          let highlightedTerm = initialValue.substring(startOffset, endOffset);
          let newValue = initialValue.substring(0, startOffset) + '<em>' + highlightedTerm + '</em>' + initialValue.substring(endOffset);
          highlightOffset += '<em></em>'.length;
          _set(item[options.fusejsHighlightKey], key, newValue);
        }
      }

      return item;
    });
  }
}