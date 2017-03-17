# Angular fuse.js

Angular 2 module using fuse.js (http://fusejs.io) to search through a list of elements with a string. Also easily highlight matched terms which is IMO, the added value of this module.

## How to install?

This module is currently only available through npm. It is compatible with module bundlers (webpack / browserify ...)
and I also provide a standalone minified version.

1. `npm install angular-fusejs`
2. Import `FusejsModule` into your module:
```
import {FusejsModule} from 'angular-fusejs'
@NgModule({
  imports: [
    ...
    FusejsModule,
  ],
  ...
})
```

## How to use?

### Filter elements in a *ngFor
Use `fusejs` pipe in a *ngFor to search through a list of elements. Pass search string as first parameter. Pass fusejs option object as second parameter (optional):
```
<li *ngFor="let element of (listOfElement | fusejs:searchString:{keys: ['name', 'author']})"></li>
```

Params:
- Array: element to search in (required)
- String: search string (optional)
- Boolean: Should include highlighting info or not (optional, default true). `fusejsHighlight` filter will not work if false.
- Object: fusejs supported options (see https://github.com/krisk/fuse) (optional)
- String: Highlighting key name (optional, default: 'fuseJsHighlighted')

### Show highlighted terms
```
{{element.fuseJsHighlighted.name}}
```

You may change `fuseJsHighlighted` for any other key by specifying it to the `fusejs` filter.