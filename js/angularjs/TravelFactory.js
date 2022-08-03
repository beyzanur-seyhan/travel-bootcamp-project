var TravelFactoryModule = angular.module("TravelFactoryModule", []);
TravelFactoryModule.factory("TravelFactory", function(){

    return{
        
        DoCombineRestaurantData: function(ItemDetail, ItemList){
            var Item = { 
                detail: ItemDetail, 
                title: ItemList.title, 
                point: ItemList.point, 
                price: ItemList.price 
            }
            return Item;         
        },

        DoValidatePointScale: function(){
            var PointType = "";

            RestaurantsList.forEach((Restaurant) => {
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