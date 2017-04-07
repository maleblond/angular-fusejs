import {Injectable} from '@angular/core'
import * as Fuse from 'fuse.js'
import FuseOptions = Fuse.FuseOptions;

import _set = require('lodash.set');
import _get = require('lodash.get');


export interface AngularFusejsOptions extends FuseOptions {
  supportHighlight?: boolean;
  fusejsHighlightKey?: string;
  minSearchTermLength?: number;
}

@Injectable()
export class FusejsService {
  private defaultOptions: AngularFusejsOptions = {
    supportHighlight: true,
    shouldSort: false,
    threshold: 0.2,
    minMatchCharLength: 1,
    include: [],
    minSearchTermLength: 3,
    fusejsHighlightKey: 'fuseJsHighlighted',
    tokenize: true,
  };

  constructor() {
  }

  searchList(list: Array<any>, searchTerms: string, options: AngularFusejsOptions = {}) {
    const fuseOptions: AngularFusejsOptions = Object.assign({}, this.defaultOptions, options);
    let result = [];

    if (searchTerms && searchTerms.length >= fuseOptions.minSearchTermLength) {
      if (fuseOptions.supportHighlight) {
        fuseOptions.include.push('matches');
      }

      let fuse = new Fuse(list, fuseOptions);
      result = fuse.search(searchTerms);

      if (fuseOptions.supportHighlight) {
        result = this.handleHighlight(result, fuseOptions);
      }
    } else {
      result = list;

      if (fuseOptions.supportHighlight) {
        result = result.map((element) => {
          element = this.deepClone(element);
          element[fuseOptions.fusejsHighlightKey] = this.deepClone(element);
          return element;
        });
      }
    }

    return result;
  }

  setDefaultOptions(options: AngularFusejsOptions) {
    Object.assign(this.defaultOptions, options);
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
    return result.map((matchObject) => {
      const item = this.deepClone(matchObject.item);
      item[options.fusejsHighlightKey] = this.deepClone(item);

      for (let match of matchObject.matches) {
        const key = match.key;
        const indices = match.indices;

        let highlightOffset: number = 0;

        for (let indice of indices) {
          //TODO make it work with array indices (does not work out of the box with fusejs)
          const initialValue: string = _get(item[options.fusejsHighlightKey], key) as string;
          const startOffset = indice[0] + highlightOffset;
          const endOffset = indice[1] + highlightOffset + 1;
          let highlightedTerm = initialValue.substring(startOffset, endOffset);
          let newValue = initialValue.substring(0, startOffset) + '<em>' + highlightedTerm + '</em>' + initialValue.substring(endOffset);
          // '<em></em>'.length == 9
          highlightOffset += 9;
          _set(item[options.fusejsHighlightKey], key, newValue);
        }
      }

      return item;
    });
  }
}