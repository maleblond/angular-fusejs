global.angular = require('angular');
// You need to "npm link angular-local-search", as it is not in package.json.
// Thus, I do not need to publish to npm registry to test a new feature.
angular.module('main', [require('angular-local-search')])
  .component('searchContainer', require('./components/search-container.js'));