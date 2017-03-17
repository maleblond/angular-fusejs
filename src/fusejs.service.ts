import {Injectable} from '@angular/core'
import * as Fuse from 'fuse.js'

@Injectable()
export class FusejsService {
  constructor() {
  }

  searchList(list: Array<any>, options: Object, searchTerms: string) {
    let fuse = new Fuse(list, options);
    return fuse.search(searchTerms);
  }
}