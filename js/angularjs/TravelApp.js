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
    $scope.Adventure = [];
    $scope.Hotels = [];

    $scope.GetData = function () {
      $scope.Restaurants = Restaurants;
      $scope.NewsAndEvents = NewsAndEvents;
      $scope.Countries = Countries;
      $scope.Recommend = Recommend;
      $scope.Adventure = Adventure;
      $scope.Hotels = Hotels;
    };
  },
);
