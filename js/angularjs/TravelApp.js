var TravelApp = angular.module('TravelApp', ['TravelServiceModule', 'TravelFactoryModule']);
TravelApp.controller('TravelController', function ($scope, $window, $http, $timeout, $sce, TravelService, TravelFactory,) {

  $scope.RestaurantsList = [];
  $scope.RestaurantDetails = [];
  $scope.BlogPosts = [];
  $scope.Countries = [];
  $scope.Recommend = [];
  $scope.EnjoyTravel = [];
  $scope.Hotels = [];
  $scope.Adventure = [];
  $scope.ISearchPost;
  $scope.Limit = 6;
  // $scope.Selected = "selected";
  $scope.CurrentYear = new Date().getFullYear();

  $scope.GetData = function () {
    $scope.RestaurantsList = $scope.SetToRestaurantPointType();
    $scope.RestaurantDetails = RestaurantDetailData;
    $scope.BlogPosts = BlogPoststData;
    $scope.Countries = Countries;
    $scope.Recommend = Recommend;
    $scope.EnjoyTravel = EnjoyTravel;
    $scope.Hotels = Hotels;
    $scope.Adventure = Adventure;
  };
  
  // Factory'de yer alacak
  $scope.SetToRestaurantPointType = function(){
    RestaurantsListData.forEach((restaurant) => {
      if(restaurant.point >= 8.5 && restaurant.publishedYear === $scope.CurrentYear){
        restaurant.pointType = "popular, latest";
      }
      else if(restaurant.publishedYear === $scope.CurrentYear){
        restaurant.pointType = "latest";
      }
      else if(restaurant.point >= 8.5){
        restaurant.pointType = "popular";
      }
    })
    return RestaurantsListData;
  };

  $scope.DisplayTourDetail = function (id) {
    $scope.singleTour = TravelFactory.DisplayTourDetail(Recommend[id]);
  };

  $scope.ViewAllTour = function (id) {
    $scope.TourList = TravelFactory.ViewAllTour(Recommend[id]);
  };

  $scope.ChangeClassNameDispStatus = function(){
    $scope.DisplayStatus = "d-none";
  };

  $scope.ToggleWishListClassName = function(WishIndex){
    var WishList = document.getElementById(`WishlistLiked-${WishIndex}`);
    TravelFactory.DoToggleToWishListClassName(WishList);
  };

  $scope.GetRestaurantsData = function (RIndex) {
    $scope.RestaurantDetail = [];
    $scope.RestaurantDetail = TravelFactory.DoCombineRestaurantData(RestaurantDetailData[RIndex - 1], RestaurantsListData[RIndex - 1]);
  };

  $scope.GetRestaurantListData = function(RListData){
    $scope.RestaurantLists = TravelFactory.DoGetRestaurantListData(RListData);
  };

  $scope.GetCategoryRestaurants = function(RCategoryName){
    $scope.RestaurantLists = TravelService.DoSetRestaurantList(RCategoryName, $scope.RestaurantsList);
  };

  $scope.FindRestaurantSearchResult = function(){

    if(!($scope.RestaurantTitle && $scope.RestaurantLocation && $scope.SelectCategory)){
      alert("Alanlar Boş!");
    }
    else{
     $scope.RestaurantSearchResult = TravelService.DoGetRestaurantSearchResult($scope.RestaurantLists, $scope.RestaurantTitle, $scope.RestaurantLocation, $scope.SelectCategory);

     if(!$scope.RestaurantSearchResult){
      alert("Arama Sonucu Yok!");
     }
     else{
      $scope.RestaurantLists = $scope.RestaurantSearchResult;
     }
    }

    $scope.RestaurantTitle = "";
    $scope.RestaurantLocation = "";
    $scope.SelectCategory = "";
  };

  $scope.SetLimitToNewValue = function(){
    return $scope.Limit;
  };

  $scope.AdditionToLimitToValue = function(){
    $scope.Limit += $scope.Limit;
  };

  $scope.SetLimitToInitialValue = function(){
    $scope.Limit = 6;
  };

  $scope.GetBlogPostDetailData = function (BIndex) {
    $scope.ISearchPost = "";
    $scope.RecentOrResultPost = [];
    $scope.AsidePostAreaTitle = "Recent Posts";
    $scope.RecentOrResultPost = BlogPoststData;

    if (BIndex) {
      $scope.BlogPostDetail = TravelFactory.DoReturnBlogPostData(BlogPoststData[BIndex - 1]);
    };
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

  $scope.ViewSearchResult = function () {
    if (!$scope.ISearchPost) {
      return;
    }
    else {
      $scope.BlogPostSearchResult = TravelService.DoFindSearchResult($scope.ISearchPost);
      if (!$scope.BlogPostSearchResult) {
        alert("Search Result: None!");
        return;
      }
      else {
        $scope.ISearchPost = "";
        $scope.RecentOrResultPost = [$scope.BlogPostSearchResult];
        $scope.AsidePostAreaTitle = "Result Posts";
        $scope.DisplayStatus = "";
      }
    }
  };

  $scope.OpenBlogPostResult = function (BIndex) {
    $scope.BlogPostDetail = TravelFactory.DoReturnBlogPostData(BlogPoststData[BIndex - 1]);
  };

});
