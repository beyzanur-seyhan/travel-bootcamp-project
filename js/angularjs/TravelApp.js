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
    $scope.RestaurantsList = RestaurantsListData;
    $scope.BlogPosts = BlogPoststData;
    $scope.Countries = Countries;
    $scope.Recommend = Recommend;
    $scope.EnjoyTravel = EnjoyTravel;
    $scope.Hotels = Hotels;
    $scope.Adventure = Adventure;
  };

  $scope.DisplayTourDetail = function (id) {
    $scope.singleTour = TravelFactory.DisplayTourDetail(Recommend[id]);
  };
  $scope.ViewAllTour = function (id) {
    $scope.TourList = TravelFactory.ViewAllTour(Recommend[id]);
  };

  $scope.GetRestaurantsData = function (RIndex) {
    $scope.RestaurantDetail = [];
    $scope.RestaurantDetail = TravelFactory.DoCombineRestaurantData(RestaurantDetailData[RIndex - 1], RestaurantsListData[RIndex - 1]);
  };

  $scope.GetBlogPostDetailData = function(BIndex){
    $scope.AsidePostAreaTitle = "Recent Posts";
    $scope.RecentOrResultPost = [];
    $scope.RecentOrResultPost = BlogPoststData;
    if(BIndex){
      $scope.BlogPostDetail = TravelFactory.DoReturnBlogPostData(BlogPoststData[BIndex - 1]);
    }
    $scope.DisplayStatus = "d-none";
  };

  $scope.SetRestaurantPointType = function () {
    $scope.RestaurantPointType = "";
    $scope.RestaurantPointType = TravelFactory.DoValidatePointScale();
  };

  $scope.CountRatingPoint = function (NumRating) {
    return TravelFactory.DoCountRatingPoint(NumRating);
  };

  $scope.SubmitUserReview = function (RIndex) {
    if (TravelService.DoValidateEmptyFormArea()) {
      return;
    }
    else {
      TravelService.DoAddUserReview(RIndex, $scope.IFullName, $scope.IEmail, $scope.TxtComment, $scope.SlctRating);

      $scope.IFullName = ""
      $scope.IEmail = "";
      $scope.SlctRating = undefined;
      $scope.TxtComment = "";
    }
  };

  $scope.ViewSearchResult = function(){
   if(!$scope.ISearchPost){
    return;
   }
   else{
    $scope.BlogPostSearchResult = TravelService.DoFindSearchResult($scope.ISearchPost);
    if(!$scope.BlogPostSearchResult){
      alert("Search Result: None!");
      return;
    }
    else{
      $scope.ISearchPost = "";
      $scope.RecentOrResultPost = [$scope.BlogPostSearchResult];
      $scope.AsidePostAreaTitle = "Result Posts";
      $scope.RecentLink= "#fc5b62";
      $scope.DisplayStatus = "";
    }
    
   }
 };

 $scope.OpenBlogPostResult = function(BIndex){
  $scope.BlogPostDetail = TravelFactory.DoReturnBlogPostData(BlogPoststData[BIndex - 1]);
 };

});
