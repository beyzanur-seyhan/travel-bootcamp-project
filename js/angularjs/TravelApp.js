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
  $scope.TotalGuest = 0;
  $scope.TotalAdult = 0;
  $scope.TotalChildren = 0;

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
    $scope.RandomCouponCode = Math.floor(Math.random() * 2000);
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
    $scope.TotalGuest = 0;
    $scope.TotalAdult = 0;
    $scope.TotalChildren = 0;
    $scope.RestaurantDetail = [];
    var RestaurantLocation = document.getElementById("RestaurantLocation");
    
    $scope.RestaurantDetail = TravelFactory.DoCombineRestaurantData(RestaurantDetailData[RIndex - 1], RestaurantsListData[RIndex - 1]);
    RestaurantLocation.src = "https://www.google.com/maps/embed?pb=" + $scope.RestaurantDetail.detail.locationCode;

    TravelFactory.DoSetDefaultValue();
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

    $scope.WantToBuy = TravelFactory.DoGetProductData($scope.RestaurantsList[CtgryIndex - 1], 
      $scope.ProductsInCart, $scope.TotalGuest, $scope.TotalAdult, $scope.TotalChildren);

    if(!$scope.WantToBuy){
      return;
    }
    
    $scope.ProductsInCart.push($scope.WantToBuy);
    alert("Added To Cart!");
  };

  $scope.AdditionProductQuantity = function(){
    return TravelService.DoCalcProductQuantity($scope.ProductsInCart);
  };

  $scope.ApplyCouponCode = function(){
    TravelService.DoApplyCouponCode($scope.ProductsInCart, $scope.RandomCouponCode);
    $scope.CouponCode = "";
  };

  $scope.RemoveProductFromList = function(ProdctIndex){
    $scope.ProductsInCart.splice(ProdctIndex, 1);
  };

 $scope.IncCountAdult = function(){
  $scope.TotalAdult += 1;
  $scope.TotalGuest = $scope.TotalAdult + $scope.TotalChildren;
 }

 $scope.DescCountAdult = function(){
  if($scope.TotalAdult <= 0){
    return
  }
  $scope.TotalAdult -= 1;
  $scope.TotalGuest = $scope.TotalAdult + $scope.TotalChildren;
 }

 $scope.IncCountChildren = function(){
  $scope.TotalChildren += 1;
  $scope.TotalGuest = $scope.TotalAdult + $scope.TotalChildren;
 }

 $scope.DescCountChildren = function(){
  if($scope.TotalChildren <= 0){
    return
  }
  $scope.TotalChildren -= 1;
  $scope.TotalGuest = $scope.TotalAdult + $scope.TotalChildren;
 }

//  $scope.AdditionProductQuantity();

/* ***************** Beyzanur Seyhan End ***************** */

  $scope.GetHotelDetailData = function (Iindex) {
    $scope.HotelDetailData = TravelFactory.DoFindHotelDetailData(HotelDetails[Iindex - 1]);
  };


});
