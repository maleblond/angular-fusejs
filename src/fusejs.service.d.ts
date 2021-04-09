import Fuse from 'fuse.js';
import FuseOptions = Fuse.FuseOptions;
export interface AngularFusejsOptions<T> extends FuseOptions<T> {
    supportHighlight?: boolean;
    fusejsHighlightKey?: string;
    fusejsScoreKey?: string;
    minSearchTermLength?: number;
    maximumScore?: number;
}
export declare class FusejsService<T> {
    private defaultOptions;
    searchList(list: Array<T>, searchTerms: string, options?: AngularFusejsOptions<T>): any[];
    private deepClone;
    private handleHighlight;
}
