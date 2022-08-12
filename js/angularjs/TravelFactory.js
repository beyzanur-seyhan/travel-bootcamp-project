var TravelFactoryModule = angular.module("TravelFactoryModule", []);
TravelFactoryModule.factory("TravelFactory", function(){
    
    return{

        DisplayTourDetail: function (id) {
            return id;
          },
          ViewAllTour: function (id) {
            return id;
          },

        DoCombineRestaurantData: function(RDetail, RList){
            var RestaurantData = { 
                detail: RDetail, 
                title: RList.title, 
                point: RList.point, 
                price: RList.price 
            };
            return RestaurantData;         
        },

        DoReturnBlogPostData: function(BData){
            return BData;
        },

        DoGetRestaurantListData: function(RListData){
            return RListData;
        },

        DoToggleToWishListClassName: function(WishIndex){
          if(WishIndex.className === "wish_bt"){
            WishIndex.className += " liked";
          }
          else{
            WishIndex.className = "wish_bt";
          }
        },

        DoCountRatingPoint: function(EndTime){
            var RatingPoint = [];
            
            for (var i = 1; i <= EndTime; i++) {
                RatingPoint.push(i);     
            }
            return RatingPoint;
        },
    };

});

