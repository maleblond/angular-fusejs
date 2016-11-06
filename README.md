# angular-local-search

**UNDER CONSTRUCTION! Some features mentionned here are not developped yet.**

Allows to easily search through an array of objects or string with an angular filter.

## How to use it

It is currently only available on npm and it assumes you are using a bundler such as browserify or webpack.
Specify the latest version in your package.json.

1. Add angular-local-search to your package.json
2. `npm install` or `yarn`
3. Require the node module in your application. This would work: `angular.module('main', [require('angular-local-search')])`
4. You now can use 'localSearch' filter: `arrayOfItems | localSearch:searchString`

## Parameters
First parameter is the array of items (string or object) (Required).

Second parameter is the string to search for in the items (Required).

Third parameter is an "option" object to customize search behavior (optional).

### Supported options

#### properties (array of string)
Default: null.

Array of item's properties to search on. Only supported if passed items is an array of Object (and not strings). 
When null, all object's string properties will be use in search. Deep properties may be specified using a dot delimiter syntax 
(i.e : `['rootProperty.subProperty.subSubProperty']`). Also supports array notation (i.e: `[elements[0].subElement']`). `.toString` method 
will be called on each property.

#### operator (string)
Default: "or"

Only supported values are "or" and "and". When "or", all search terms must be present in at least one of item's searched properties.
When "and", all search terms must be present in all item's field. Can be tweaked with minimumMatch option.

#### minimumMatch (float)
Default: 1

Values between 0 (exclusive) and 1 (inclusive) are supported (or make sense). 

If operator is "or", only returns the item if percentage of searchTerms found in one of item's searched properties 
is equal or higher than minimumMatch.

If operator is "and", percentage of searchTerms found in each of item's searched properties must be equal or higher than minimumMatch.


#### sortByRelevancy (boolean)
Default: false

How relevancy will be calculated is still to be determined.