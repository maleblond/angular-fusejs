import { PipeTransform } from '@angular/core';
import { FusejsService, AngularFusejsOptions } from './fusejs.service';
export declare class FusejsPipe<T> implements PipeTransform {
    private FusejsService;
    constructor(FusejsService: FusejsService<T>);
    transform(elements: Array<T>, searchTerms: string, options?: AngularFusejsOptions<T>): any[];
}
