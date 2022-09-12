var TravelFactoryModule = angular.module("TravelFactoryModule", []);
TravelFactoryModule.factory("TravelFactory", function(){

    var OutGoingDate = document.getElementById("WhenDate");
    var OutGoingTime = document.getElementById("appt-time");

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
                price: RList.price,
                imgUrl: RList.imgUrl,
                time: RList.time, 
            };
            return RestaurantData;         
        },

        DoReturnBlogPostData: function(BData){
            return BData;
        },

        DoGetRestaurantListData: function(RListData){
            return RListData;
        },

        DoGetProductData: function(CtgryData, ProductsInCart, TotalGuest, TotalAdult, TotalChildren){

          if(!(OutGoingDate.value && OutGoingTime.value && TotalGuest)){
            alert("Empty Field!");
            return;
          }

          var CategoryData = {
            index: CtgryData.index,
            title: CtgryData.title,
            price: CtgryData.price,
            imgUrl: CtgryData.imgUrl,
            adult: TotalAdult,
            children: TotalChildren,
            outGoingDate: OutGoingDate.value,
            outGoingTime: OutGoingTime.value
          };

          ProductsInCart.forEach((product) => {
            if(CategoryData.index === product.index){
              alert("You Have Same The Product!")
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

        DoCountRatingPoint: function(EndTime){
            var RatingPoint = [];
            
            for (var i = 1; i <= EndTime; i++) {
                RatingPoint.push(i);     
            }
            return RatingPoint;
        },

        DoSetDefaultValue: function(){
          
          OutGoingDate.value = "";
          OutGoingTime.value = "";
        },

      /* ***************** Beyzanur Seyhan End ***************** */
        
      DoFindHotelDetailData: function(Iindex){
          return Iindex;
        }
    };

});

