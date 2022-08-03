var TravelFactoryModule = angular.module('TravelFactoryModule', []);
TravelFactoryModule.factory('TravelFactory', function () {
  return {
    DisplayTourDetail: function (id) {
      return id;
    },
    ViewAllTour: function (id) {
      return id;
    },
  };
});
