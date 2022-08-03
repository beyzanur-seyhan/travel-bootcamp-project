var TravelApp = angular.module('TravelApp', ['TravelServiceModule', 'TravelFactoryModule']);
TravelApp.controller('TravelController', function ($scope, $window, $http, $timeout, $sce, TravelService, TravelFactory,) {

  $scope.RestaurantsList = [];
  $scope.NewsAndEvents = [];
  $scope.Countries = [];
  $scope.Recommend = [];
  $scope.EnjoyTravel = [];
  $scope.Hotels = [];
  $scope.Adventure = [];

  $scope.GetData = function () {
    $scope.RestaurantsList = RestaurantsList;
    $scope.NewsAndEvents = NewsAndEvents;
    $scope.Countries = Countries;
    $scope.Recommend = Recommend;
    $scope.EnjoyTravel = EnjoyTravel;
    $scope.Hotels = Hotels;
    $scope.Adventure = Adventure;
  };

  $scope.GetRestaurantsData = function (RIndex) {
    $scope.RestaurantDetail = [];
    $scope.RestaurantDetail = TravelFactory.DoCombineRestaurantData(RestaurantDetail[RIndex - 1], RestaurantsList[RIndex - 1]);
  };

  $scope.SetRestaurantPointType = function () {
    $scope.RestaurantPointType = "";
    $scope.RestaurantPointType = TravelFactory.DoValidatePointScale();
  };

  $scope.CountRatingPoint = function (Rating) {
    return TravelFactory.DoCountRatingPoint(Rating);
  };

  $scope.SubmitUserReview = function (RIndex) {

    if(TravelService.DoValidateEmptyFormArea()){
      return;
    }
    else{
      TravelService.DoAddUserReview(RIndex, $scope.IFullName, $scope.IEmail, $scope.TxtComment, $scope.SlctRating);
      
      $scope.IFullName = ""
      $scope.IEmail = "";
      $scope.SlctRating = "";
      $scope.TxtComment = "";
    }

  };

},
);
