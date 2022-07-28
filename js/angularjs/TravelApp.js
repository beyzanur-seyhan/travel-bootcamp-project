var TravelApp = angular.module('TravelApp', [
  'TravelServiceModule',
  'TravelFactoryModule',
]);
TravelApp.controller(
  'TravelController',
  function (
    $scope,
    $window,
    $http,
    $timeout,
    $sce,
    TravelService,
    TravelFactory,
  ) {
    $scope.Restaurants = [];
    $scope.NewsAndEvents = [];
    $scope.Countries = [];
    $scope.Recommend = [];
    $scope.EnjoyTravel = [];

    $scope.GetData = function () {
      $scope.Restaurants = Restaurants;
      $scope.NewsAndEvents = NewsAndEvents;
      $scope.Countries = Countries;
      $scope.Recommend = Recommend;
      $scope.EnjoyTravel = EnjoyTravel;
    };
  },
);
