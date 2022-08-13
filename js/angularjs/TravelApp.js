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
  $scope.ProductsInCart = [];
  $scope.HotelDetail = [];
  $scope.HotelList = [];
  $scope.ISearchPost;
  $scope.Limit = 6;

  $scope.GetData = function () {
    $scope.RestaurantDetails = RestaurantDetailData;
    $scope.BlogPosts = BlogPoststData;
    $scope.Countries = Countries;
    $scope.Recommend = Recommend;
    $scope.EnjoyTravel = EnjoyTravel;
    $scope.Hotels = Hotels;
    $scope.Adventure = Adventure;
    $scope.RestaurantsList = TravelFactory.DoSetRestaurantPointType(new Date().getFullYear());
    $scope.HotelDetail = HotelDetails;
    $scope.HotelList = HotelList;
  };
  
  $scope.DisplayTourDetail = function (id) {
    $scope.singleTour = TravelFactory.DisplayTourDetail(Recommend[id]);
  };

  $scope.ViewAllTour = function (id) {
    $scope.TourList = TravelFactory.ViewAllTour(Recommend[id]);
  };

  /* ***************** Beyzanur Seyhan Start ***************** */

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
      alert("Empty Fields!");
    }
    else{
     $scope.RestaurantSearchResult = TravelService.DoGetRestaurantSearchResult($scope.RestaurantLists, $scope.RestaurantTitle, $scope.RestaurantLocation, $scope.SelectCategory);

     if(!$scope.RestaurantSearchResult){
      alert("Search Result: None!");
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

  $scope.GetBlogPostDetailData = function(BIndex){
    $scope.ISearchPost = "";
    $scope.RecentOrResultPost = [];
    $scope.AsidePostAreaTitle = "Recent Posts";
    $scope.RecentOrResultPost = BlogPoststData;

    if (BIndex) {
      $scope.BlogPostDetail = TravelFactory.DoReturnBlogPostData(BlogPoststData[BIndex - 1]);
    };
  };

  $scope.CountRatingPoint = function(NumRating){
    return TravelFactory.DoCountRatingPoint(NumRating);
  };

  $scope.SubmitUserReview = function(RIndex){
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


  $scope.PurchaseNowProduct = function(CtgryIndex){
    $scope.WantToBuy = TravelFactory.DoGetProductData($scope.RestaurantsList[CtgryIndex - 1], $scope.ProductsInCart);

    if(!$scope.WantToBuy){
      return;
    }

    $scope.ProductsInCart.push($scope.WantToBuy);
  }; 

/* ***************** Beyzanur Seyhan End ***************** */

  $scope.GetHotelDetailData = function (Iindex) {
    $scope.HotelDetailData = TravelFactory.DoFindHotelDetailData(HotelDetails[Iindex - 1]);
  };


});
