var TravelFactoryModule = angular.module("TravelFactoryModule", []);
TravelFactoryModule.factory("TravelFactory", function(){
    
    return{

        DisplayTourDetail: function (id) {
            return id;
          },
          ViewAllTour: function (id) {
            return id;
          },

          /* ***************** Beyzanur Seyhan Start ***************** */
        
          DoCombineRestaurantData: function(RDetail, RList){
            var RestaurantData = {
                index: RList.index, 
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

        DoGetProductData: function(CtgryData, ProductsInCart){
          var CategoryData = {
            index: CtgryData.index,
            title: CtgryData.title,
            price: CtgryData.price,
            imgUrl: CtgryData.imgUrl
          };

          ProductsInCart.forEach((product) => {
            if(CategoryData.index === product.index){
              CategoryData = "";
            }
          });
          return CategoryData;
        },

        DoSetRestaurantPointType: function(CurrentYear){
          RestaurantsListData.forEach((restaurant) => {
            if(restaurant.point >= 8.5 && restaurant.publishedYear === CurrentYear){
              restaurant.pointType = "popular, latest";
            }
            else if(restaurant.publishedYear === CurrentYear){
              restaurant.pointType = "latest";
            }
            else if(restaurant.point >= 8.5){
              restaurant.pointType = "popular";
            }
          })
          return RestaurantsListData;
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

    /* ***************** Beyzanur Seyhan End ***************** */

});

