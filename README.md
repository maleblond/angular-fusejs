# Angular fuse.js

Angular 2 module using fuse.js (http://fusejs.io) to search through a list of elements with a string. Also easily highlight matched terms which is IMO, the added value of this module.

## How to install?

This module is available through npm. It is compatible with module bundlers (webpack / browserify ...)
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
- Array(required): Array of string / object  to search in
- String(optional): search string
- Object(optional): options (see below)

#### Options
Supports all fusejs options (see https://github.com/krisk/fuse) and also those:
- supportHighlight (boolean), defaults to true: Whether or not to include highlight info in returning object. If set to false, it will just call FuseJS search, without any additional processing.
- minSearchTermLength (number), defaults to 3: Minimal search string length. If length is less than this value, FuseJS will not be called and the array will be returned as is.
- fusejsHighlightKey (string), defaults to 'fuseJsHighlighted': Key under which the highlighted results will be stored in the objects of the array. You probably do not need to change this.

By default, here are the options set by angular-fusejs:
```
{
    supportHighlight: true,
    shouldSort: false,
    threshold: 0.2,
    minMatchCharLength: 1,
    include: [],
    minSearchTermLength: 3,
    fusejsHighlightKey: 'fuseJsHighlighted',
    tokenize: true
}
```

You can override those default options by injecting `FusejsService` in your app and setting `FusejsService.defaultOptions` to whatever you want.

### Show highlighted terms
```
{{element.fuseJsHighlighted.whateverAttribute}}
```
Replace `whateverAttribute` with your attribute name, trust it as HTML and you are good to go :D