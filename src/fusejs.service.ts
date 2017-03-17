import {Injectable} from '@angular/core'
import * as Fuse from 'fuse.js'

@Injectable()
export class FusejsService {
  constructor() {
    new Fuse([]);
  }

  searchList(list, options) {

  }
}