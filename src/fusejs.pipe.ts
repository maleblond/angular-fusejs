import { Pipe, PipeTransform, Inject } from '@angular/core';
import { FusejsService } from './fusejs.service';

@Pipe({name: 'fusejs'})
export class FusejsPipe implements PipeTransform {
  constructor(
    @Inject(FusejsService) private FusejsService
  ) {}

  transform(elements: Array<Object>,
            searchTerms: string,
            supportHighlight: boolean = true,
            options: Fuse.FuseOptions = {},
            highlightedKeyName: string = 'fuseJsHighlighted') {
    if (searchTerms) {
      return this.FusejsService.searchList(elements, options, searchTerms);
    } else {
      return elements;
    }
  }
}