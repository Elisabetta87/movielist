"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var router_1 = require("@angular/router");
var movie_service_1 = require("../../services/movie.service");
require("rxjs/Rx");
var FilmDetailComponent = (function () {
    function FilmDetailComponent(mvs, route, router) {
        this.mvs = mvs;
        this.route = route;
        this.router = router;
        this.isUpcoming = true;
        this.isStillUpcoming = true;
    }
    FilmDetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.router.events
            .subscribe(function (data) {
            if (data.constructor.name == 'NavigationEnd') {
                _this.mvs.getConfig()
                    .subscribe(function (data) {
                    _this.config = data;
                    _this.getDetails(_this.route.snapshot.params['id']);
                    _this.getReview(_this.route.snapshot.params['id']);
                    _this.getRecommendations(_this.route.snapshot.params['id']);
                });
            }
        });
    };
    FilmDetailComponent.prototype.onBack = function () {
        this.router.navigate(['']);
    };
    FilmDetailComponent.prototype.getDetails = function (id) {
        var _this = this;
        this.mvs.getDetails(id)
            .subscribe(function (details) {
            _this.details = details;
            //console.log(details, this.details.poster_path);
        });
    };
    FilmDetailComponent.prototype.getRecommendations = function (id) {
        var _this = this;
        this.mvs.getRecommendations(id)
            .subscribe(function (recommendations) {
            _this.recommendations = recommendations;
            _this.scrollTopZero(15);
        });
    };
    FilmDetailComponent.prototype.scrollTopZero = function (speed) {
        var count = 0;
        var scroll = setInterval(function () {
            console.log(count++);
            var pixels = (window.scrollY) / 100 * speed;
            window.scrollTo(0, window.scrollY - pixels);
            if (window.scrollY == 0) {
                clearInterval(scroll);
            }
        }, speed);
    };
    FilmDetailComponent.prototype.getReview = function (id) {
        var _this = this;
        this.mvs.getReview(id)
            .subscribe(function (reviews) {
            _this.reviews = reviews;
        });
    };
    FilmDetailComponent.prototype.getMovies = function () {
        if (!this.pages || !this.pages[this.currPageIndex]) {
            var page = (this.currPageIndex + 1);
            if (this.isStillUpcoming) {
                this.upcoming(page);
                return;
            }
            this.sendSearch(page);
        }
    };
    FilmDetailComponent.prototype.upcoming = function (page) {
        var _this = this;
        this.mvs.getUpcomings(page)
            .subscribe(function (data) {
            if (!_this.pages[0]) {
                _this.pages = new Array(data.total_pages);
            }
            if (!_this.pages[_this.currPageIndex]) {
                _this.pages[_this.currPageIndex] = data.results;
            }
        });
    };
    FilmDetailComponent.prototype.sendSearch = function (page, event) {
        // if ( page || event.key == 'Enter' || event.type == 'click'){
        //     this.isStillUpcoming = false;
        //     this.mvs.getFilmByTitle(this.searchByTitle, page)
        //         .subscribe(data => {
        //             if (!!event) {//if that array have not been initialized yet
        //                 this.pages = new Array(data.total_pages);
        //             }
        //
        //             if (!this.pages[this.currPageIndex]) {//if that cell of his array hase not been fill yet
        //                 this.pages[this.currPageIndex] = data.results;
        //             }
        //         })
        // }
        if (event.key == 'Enter' || event.type == 'click') {
            this.router.navigate([''], { queryParams: { title: this.searchByTitle } });
        }
    };
    FilmDetailComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            templateUrl: 'films-detail.component.html',
            styleUrls: ['films-detail.component.css']
        }), 
        __metadata('design:paramtypes', [movie_service_1.MovieService, router_1.ActivatedRoute, router_1.Router])
    ], FilmDetailComponent);
    return FilmDetailComponent;
}());
exports.FilmDetailComponent = FilmDetailComponent;
//# sourceMappingURL=films-detail.component.js.map