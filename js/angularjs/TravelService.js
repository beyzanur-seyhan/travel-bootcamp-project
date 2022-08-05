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
                    if (txt.replace("İ","I").toLowerCase() === title.toLowerCase()) {
                        SearchResult = BlogPoststData[index];
                    }
                });
            });
        });
        return SearchResult;
    };
});