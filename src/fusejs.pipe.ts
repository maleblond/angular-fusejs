import { Pipe, PipeTransform } from '@angular/core';
import {FusejsService, AngularFusejsOptions} from './fusejs.service';


@Pipe({name: 'fusejs'})
export class FusejsPipe<T> implements PipeTransform {
  constructor(
    private FusejsService: FusejsService<T>
  ) {}

  transform(elements: Array<T>,
            searchTerms: string,
            options: AngularFusejsOptions<T> = {}) {
    return this.FusejsService.searchList(elements, searchTerms, options);
  }
}
