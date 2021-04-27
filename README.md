# Angular fuse.js

Angular module using [fuse.js](http://fusejs.io/) to fuzzy-search through a list of objects.
Also easily **highlight** matched terms which is the true added value of this module.

Demo: <https://maleblond.github.io/angular-fusejs/>

## Forked by Miguel Monwoo for Angular 10 compatibilities
Watting for Author updates, did fix missing type to fit angular-fusejs with last fusejs lib and fix some production issue, all seem ok with Angular 10.

Production build inspired from :
https://github.com/malick-dev/angular-fusejs/commit/89d005037f62728c734904a155f996699ab882bb

https://github.com/ng-packagr/ng-packagr/issues/355

https://github.com/abbazabacto/ngpackagr-barrel-issue/blob/master/package.json

https://www.typescriptlang.org/tsconfig#allowSyntheticDefaultImports

And fixed with ng-packagr

```bash
# Just use this fork dist build in your project :
yarn upgrade angular-fusejs@git+https://github.com/MonwooServices/angular-fusejs.git#DistBuild


# Build the fork sources for production (in ./dist):
yarn install
yarn clean && yarn package

```


## How to install?

This module is available through npm. It is compatible with module bundlers (webpack / browserify ...).

1. `# npm install angular-fusejs`
2. `npm upgrade angular-fusejs@git+https://github.com/MonwooServices/angular-fusejs.git#DistBuild`
3. Import `FusejsModule` into your module:
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
- Array(required): Array of objects to search in
- String(optional): search string
- Object(optional): options (see below)

#### Options
Supports all fusejs options (see <http://fusejs.io/>) and also those:
- **supportHighlight** (boolean), defaults to true: Whether or not to include highlight info in returning object. If set to false, it will just call FuseJS search, without any additional processing.
- **minSearchTermLength** (number), defaults to 3: Minimal search string length. If length is less than this value, FuseJS will not be called.
- **fusejsHighlightKey** (string), defaults to 'fuseJsHighlighted': Key under which the highlighted results will be stored in the objects of the array. You probably do not need to change this.
- **fusejsScoreKey** (string), defaults to 'fuseJsHighlighted': Key under which the fuse.js returned score will be stored in the objects of the array. You probably do not need to change this.

By default, here are the options set by angular-fusejs:
```
{
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
}
```

You can override those default options by injecting `FusejsService` in your app and setting `FusejsService.defaultOptions` to whatever you want.

### Show highlighted terms
```
{{element.fuseJsHighlighted.whateverAttribute}}
```
Replace `whateverAttribute` with your attribute name, trust it as HTML and you are good to go.

## Disclaimer

I made this just for fun, to learn a bit more about fuzzy search + angular. Fuzzy search + detecting what should be highlighted is 100% handled by [fuse.js](http://fusejs.io/).

If you encounter any bug, please check who is the culprit before submitting an issue - it might be a bug in fuse.js library.
