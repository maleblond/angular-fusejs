(function() {
  _ = require('lodash');

  getPropertiesToSearchOn = function(item, properties) {
    propertiesToSearchOn = {};

    if(properties) {
      _.each(properties, function(property) {
        propertyValue = _.get(item, property);

        if(_.isString(propertyValue)) {
          propertiesToSearchOn[property] = {value: propertyValue};
        }
      });
    }
    else {
      // TODO Implement full deep search
    }

    return propertiesToSearchOn;
  };

  findMatchingItems = function(items, searchTerms, options) {
    var foundSearchTerms = [];

    return _.filter(items, function (item) {
      return isItemMatching(item, searchTerms, options);
    });
  };

  isItemMatching = function(item, searchTerms, options) {
    var propertiesToSearchOn = getPropertiesToSearchOn(item, options.properties);

    _.each(propertiesToSearchOn, function (propertyToSearchOn) {
      augmentWithSearchInfos(searchTerms, propertyToSearchOn);
    });

    if(options.operator === 'or') {
      return _.uniq(_.map(propertiesToSearchOn, 'foundSearchTerms')).length / searchTerms.length >= options.minimumMatch;
    }
    else if(options.operator === 'and') {
      return _.every(propertiesToSearchOn, function(propertyToSearchOn) {
        return propertyToSearchOn.foundSearchTerms.length / searchTerms.length >= options.minimumMatch;
      });
    }
  };

  augmentWithSearchInfos = function(searchTerms, propertyToSearchOn) {
    propertyToSearchOn.foundSearchTerms = [];

    _.each(searchTerms, function (searchTerm) {
      if (propertyToSearchOn.value.toLowerCase().indexOf(searchTerm) != -1) {
        propertyToSearchOn.foundSearchTerms.push(searchTerm);
      }
    });
  };

  getSearchTerms = function(searchString) {
    return searchString.trim().toLowerCase().split(' ');
  };

  // items: Array of string or objects to search on
  // searchString: String that will be split (on spaces) into searchTerms
  // options:
  //   properties: Array of items' properties to search on. Default to null.
  //               When null, all string properties will be searched (deep search).
  //               Only supported if items is an array of objects. Deep properties may be specified
  //               using a dot delimiter syntax i.e. ['rootProperty.subProperty.subSubProperty'].
  //               Properties are ignored if it's not a string. Does not support nested array yet,
  //               but supports "elements[0].subElement" syntax.
  //   operator: Can be "or" (default) or "and". When "or", all search terms must be
  //             present in at least one of item's field (if items are objects). When "and",
  //             all search terms must be present in all item's field.
  //   minimumMatch: Float from 0 to 1 (default 1) Only returns the item if percentage of searchTerms
  //                 found in item is equal or higher than minimumMatch. If operator is "and", percentage of search
  //                  term found in each item's properties is used.
  //   sortByRelevancy: True or false (default false). Passing to true will sort the returned array
  //                    by descending relevancy order. Relevancy is based on the number
  //                    of search terms found in the item. Only relevant to use if minimumMatch != 1.
  module.exports = function() {
    return function(items, searchString, options) {
      if(options == null) {
        options = {};
      }

      _.defaultsDeep(options, {properties: null, operator: 'or', minimumMatch: 1, sortByRelevancy: false});
      items = items || [];

      if(!searchString || !_.isString(searchString)) {
        return items;
      }

      searchTerms = getSearchTerms(searchString);

      if(searchTerms.length > 0) {
        return findMatchingItems(items, searchTerms, options);
      }
      else {
        return items;
      }

    };
  }
})();