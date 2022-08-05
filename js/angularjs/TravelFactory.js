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

        DoValidatePointScale: function(){
            var PointType = "";

            RestaurantsListData.forEach((Restaurant) => {
                if(Restaurant.point >= 7 && Restaurant.point < 8.5){
                    PointType = "Good";
                }
                else if(Restaurant.point >= 8.5){
                    PointType = "Superb";
                }
                else{
                    PointType = "Bad";
                }
            });
            return PointType;
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

