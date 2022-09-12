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
  $scope.WishList = [];
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
    $scope.WishList = WishList;
    $scope.RandomCouponCode = Math.floor(Math.random() * 2000);
  };
  
  $scope.DisplayTourDetail = function (id) {
    $scope.singleTour = TravelFactory.DisplayTourDetail(Recommend[id]);
  };

  /* ***************** Beyzanur Seyhan Start ***************** */

  $scope.ChangeClassNameDispStatus = function(){
    $scope.DisplayStatus = "d-none";
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
      return;
    }
    else{
     $scope.RestaurantSearchResult = TravelService.DoGetRestaurantSearchResult($scope.RestaurantLists, $scope.RestaurantTitle, $scope.RestaurantLocation, $scope.SelectCategory);
    
     $scope.RestaurantLists = $scope.RestaurantSearchResult;
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
/* ***************** Furkan Akkaya Start ***************** */
  $scope.GetHotelDetailData = function (Iindex) {
    $scope.HotelDetailData = TravelFactory.DoFindHotelDetailData(HotelDetails[Iindex - 1]);
  };

  $scope.SubmitUserReviewHotel = function (RIndex) {
    if (TravelService.DoValidateEmptyFormAreaHotel()) {
      return;
    }
    else {
      TravelService.DoAddUserReviewHotel(RIndex, $scope.IFullNameHotel, $scope.IEmailHotel, $scope.TxtCommentHotel, $scope.SlctRatingHotel);

      $scope.IFullNameHotel = ""
      $scope.IEmailHotel = "";
      $scope.SlctRatingHotel = undefined;
      $scope.TxtCommentHotel = "";
    }
  };

  $scope.AddWishlistItem = function (IIndex) {

      var item = document.getElementById("HotelDesc").innerText;
      var item = item.replace('Prima causae admodum id est, ei timeam inimicus sed. Sit an meis aliquam, cetero inermis vel ut. An sit illum euismod facilisis, tamquam vulputate pertinacia eum at. Cum et probo menandri. Officiis consulatu pro et, ne sea sale invidunt, sed ut sint blandit efficiendi. Atomorum explicari eu qui, est enim quaerendum te. Quo harum viris id. Per ne quando dolore evertitur, pro ad cibo commune.', '');
      var itemDescMore = document.getElementById("HotelDescMore").innerText;
      var itemSource = document.getElementById("itemSource").src;
      var hotelPrice = document.getElementById("HotelPrice").innerText;
      var hotelPrice = hotelPrice.replace('person', '');
      var itemPoint = document.getElementById("itemPoint").innerText;
      var itemPoint = parseFloat(itemPoint);
      var itemTime = document.getElementById("HotelTime").innerText;
      TravelService.DoAddItemToWishList(IIndex, item, itemDescMore, itemSource, hotelPrice, itemPoint, itemTime);
      console.log(itemTime);  
    };

    $scope.AddWishlistItemRestaurant = function (IIndex) {

      var item = document.getElementById("RestDesc").innerText;
      var item = item.replace('Sit an meis aliquam, cetero inermis vel ut. An sit illum euismod facilisis, tamquam vulputate pertinacia eum at.Cum et probo menandri. Officiis consulatu pro et, ne sea sale invidunt, sed ut sint blandit efficiendi. Atomorum explicari eu qui, est enim quaerendum te. Quo harum viris id. Per ne quando dolore evertitur, pro ad cibo commune.', '');
      var itemDescMore = document.getElementById("RestTitle").innerText;
      var itemSource = document.getElementById("RestPics").src;
      var hotelPrice = document.getElementById("RestPrice").innerText;
      var hotelPrice = hotelPrice.replace('person', '');
      var itemPoint = document.getElementById("RestPoint").innerText;
      var itemPoint = parseFloat(itemPoint);
      var itemTime = document.getElementById("RestTime").innerText;
      TravelService.DoAddItemToWishList(IIndex, item, itemDescMore, itemSource, hotelPrice, itemPoint, itemTime);
      console.log(itemTime);  
    };

    $scope.RemoveItemFromWishList = function(E){
      var Wishlist = document.getElementById("WishListRemove");
          Wishlist.parentElement.parentElement.parentElement.remove();
    };

/* ***************** Furkan Akkaya End ***************** */
});
