describe('local search filter', function() {
  $filter = null;

  beforeEach(function() {
    angular.mock.module('localSearch');

    inject(function(_$filter_) {
      $filter = _$filter_;
    });
  });
  
  it('returns correct result', function() {
    expect($filter('localSearch')([{name: 'patate'}], 'patate', {properties: ['name']}).length).toEqual(1);
  });
});