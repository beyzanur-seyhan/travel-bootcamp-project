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
    $scope.Hotels = [];
    $scope.Adventure = [];

    $scope.GetData = function () {
      $scope.Restaurants = Restaurants;
      $scope.NewsAndEvents = NewsAndEvents;
      $scope.Countries = Countries;
      $scope.Recommend = Recommend;
      $scope.EnjoyTravel = EnjoyTravel;
      $scope.Hotels = Hotels;
      $scope.Adventure = Adventure;
    };
    $scope.DisplayTourDetail = function (id) {
      $scope.element = TravelFactory.DisplayTourDetail(Recommend[id]);
    };
    $scope.ViewAllTour = function (id) {
      $scope.element = TravelFactory.ViewAllTour(Recommend[id]);
    };
  },
);
