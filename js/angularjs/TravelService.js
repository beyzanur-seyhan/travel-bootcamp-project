var TravelServiceModule = angular.module("TravelServiceModule", []);
TravelServiceModule.service("TravelService", function ($http, $q) {

    this.DoValidateEmptyFormArea = function () {
        var Result = false;
        var formReviewItem = document.getElementsByClassName("form-review");
        var labelReviewItem = document.getElementsByClassName("LblFormArea");

        for (let i = 0; i < formReviewItem.length; i++) {
            if (formReviewItem[i].value === undefined || formReviewItem[i].value === "" || formReviewItem[i].value === '? undefined:undefined ?') {
                labelReviewItem[i].className += ' red';
                Result = true;
            }
            else {
                labelReviewItem[i].className = "LblFormArea";
            }
        }
        return Result;
    };

    this.DoAddUserReview = function (RIndex, FullName, Email, Comment, Rating) {
        var CurrentDate = new Date();
        var Months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

        var UserReviewData = {
            name: FullName,
            email: Email,
            photo: "avatar.jpg",
            content: Comment,
            rating: +(Rating),
            date: {
                day: CurrentDate.getDate(),
                month: Months[CurrentDate.getMonth()],
                year: CurrentDate.getFullYear()
            }
        };
        return RestaurantDetailData[RIndex - 1].userReviews.push(UserReviewData);
    };

    this.DoFindSearchResult = function (ISearchPost) {
        var SearchResult;
        var TxtSearch = ISearchPost.split(" ");

        var BlogPostTitle = BlogPoststData.map((post) => {
            return post.title.split(" ");
        });

        BlogPostTitle.forEach((titles, index) => {
            titles.forEach(title => {
                TxtSearch.forEach(txt => {
                    if (txt.replace("İ", "I").toLowerCase() === title.toLowerCase()) {
                        SearchResult = BlogPoststData[index];
                    }
                });
            });
        });
        return SearchResult;
    };

    this.DoSetRestaurantList = function (RCategoryName, RestaurantsList) {
        var RestaurantData = [];

        RestaurantsList.forEach((restaurant) => {
            if (RCategoryName === "all") {
                RestaurantData.push(restaurant);
            }
            else {
                if (restaurant.pointType) {
                    if (restaurant.pointType.indexOf(",") > -1) {
                        RestaurantData.push(restaurant);
                    }
                    if (RCategoryName === restaurant.pointType) {
                        RestaurantData.push(restaurant);
                    }
                }
            }
        });
        return RestaurantData;
    };

    this.DoGetRestaurantSearchResult = function (RestaurantLists, RestaurantTitle, RestaurantLocation, SelectCategory) {
        var Restaruant;

        RestaurantLists.forEach((restaurant) => {
            if (RestaurantTitle.toLowerCase() === restaurant.title.toLowerCase()) {
                if (RestaurantLocation.toLowerCase() === restaurant.location.toLowerCase()) {
                    if (SelectCategory.toLowerCase() === restaurant.category.toLowerCase()) {
                        Restaruant = [];
                        Restaruant.push(restaurant);
                    }
                }
            }
        });

        if(!Restaruant) {
            alert("Search Result: None!");
            return;
        }

        return Restaruant;
    };

    this.DoCalcProductQuantity = function (ProductsInCart) {

        var TotalQuantity = 0;

        if (ProductsInCart.length) {
            ProductsInCart.forEach((product) => {
                TotalQuantity += product.price;
            })
        }

        return TotalQuantity;
    };

    this.DoApplyCouponCode = function (ProductsInCart, RandomCouponCode) {

        var ICouponCode = document.getElementById("CouponCode");

        if (!(ProductsInCart.length)) {
            alert("There are no products in the cart!");
            return;
        }
        if (!(ICouponCode.value)) {
            alert("Coupon code is empty!");
            return;
        }
        if ((+(ICouponCode.value)) !== RandomCouponCode) {
            alert(`Please enter the correct coupon code --> ${RandomCouponCode}`);
            return;
        }

        alert("Coupon applied successfully!");

        ProductsInCart.forEach((product) => {
            product.price = (product.price * 15) / 100;
            return product;
        });
    };

    this.DoValidateEmptyFormAreaHotel = function () {
        var Result = false;
        var formReviewItem = document.getElementsByClassName("form-review-hotel");
        var labelReviewItem = document.getElementsByClassName("LblFormAreaHotel");

        for (let i = 0; i < formReviewItem.length; i++) {
            if (formReviewItem[i].value === undefined || formReviewItem[i].value === "" || formReviewItem[i].value === '? undefined:undefined ?') {
                labelReviewItem[i].className += ' red';
                Result = true;
            }
            else {
                labelReviewItem[i].className = "LblFormAreaHotel";
            }
        }
        return Result;
    };

    this.DoAddUserReviewHotel = function (RIndex, FullName, Email, Comment, Rating) {
        var CurrentDate = new Date();
        var Months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

        var UserReviewData = {
            name: FullName,
            email: Email,
            photo: "avatar.jpg",
            content: Comment,
            rating: +(Rating),
            date: {
                day: CurrentDate.getDate(),
                month: Months[CurrentDate.getMonth()],
                year: CurrentDate.getFullYear()
            }
        };
        return HotelDetails[RIndex - 1].UserReviews.push(UserReviewData);
    };

    this.DoAddItemToWishList = function (Iindex, IDescription, IName, Iimage, IPrice, IRating, ITime, ICount, IType) {
        var WishlistAdded = {
            index: Iindex,
            type: IType,
            title: IName,
            pic: Iimage,
            description: IDescription,
            price: IPrice,
            time: ITime,
            reviewCount: ICount,
            reviewType: IType,
            point: IRating
        };
        if (WishList.title === WishlistAdded.title) {
            alert("Item has been already added to the wishlist.");
            return false;
        }

        else{ return WishList.push(WishlistAdded);}

        
    };

    this.RemoveItemFromWishlist = function (e) {
        var DeleteItemsFromCartButton = document.getElementsByClassName("wish_bt liked");


        // DeleteItemsFromCartButton.parentElement.parentElement.remove();
        var WishlistAdded = {
            index: Iindex,
            type: IType,
            title: IName,
            pic: Iimage,
            description: IDescription,
            price: IPrice,
            time: ITime,
            reviewCount: ICount,
            reviewType: IType,
            point: IRating
        };
        return WishList.splice(WishlistAdded);

    };
});