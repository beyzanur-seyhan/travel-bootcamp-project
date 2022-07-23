var TravelApp = angular.module("TravelApp", ["TravelServiceModule", "TravelFactoryModule"]);
TravelApp.controller("TravelController", function($scope, $window, $http, $timeout, $sce, TravelService, TravelFactory){

    $scope.Restaurants = [];
    $scope.NewsAndEvents = [];

    $scope.GetData = function(){

        $scope.Restaurants = Restaurants;
        $scope.NewsAndEvents = NewsAndEvents;

    };

});