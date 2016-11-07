module.exports = {
  templateUrl: "assets/templates/search-container.html",
  controller: function() {
    var ctrl = this;

    ctrl.list = [
      {
        name: 'potato',
        location: 'Mexico'
      }, {
        name: 'carrot',
        location: 'Barcelona'
      }, {
        name: 'brocoli',
        location: 'Mexico'
      }, {
        name: 'onion',
        location: 'Rio'
      }, {
        name: 'oncologic',
        location: 'Barcelona'
      }
    ]
  }
};