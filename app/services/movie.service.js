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
var http_1 = require("@angular/http");
var core_1 = require("@angular/core");
require("rxjs/Rx");
var MovieService = (function () {
    function MovieService(http) {
        this.http = http;
        this.apiKey = 'api_key=c4637c00d2d0a9d2d183af069b0c7c21';
    }
    MovieService.prototype.getConfig = function () {
        return this.http.get('https://api.themoviedb.org/3/configuration?' + this.apiKey)
            .map(function (data) { return JSON.parse(data['_body']); });
    };
    MovieService.prototype.getUpcomings = function (page) {
        if (page === void 0) { page = 1; }
        //This IF below is for avoid making an ajax call every time the user clicks on page number,
        //so we store RESULTS into an array, and if these results exist, we use those ones
        return this.http.get('https://api.themoviedb.org/3/movie/upcoming?' + this.apiKey + '&page=' + page) // +'&'+lan)
            .map(function (data) { return JSON.parse(data['_body']); });
    };
    MovieService.prototype.getFilmByTitle = function (title, page) {
        if (page === void 0) { page = 1; }
        return this.http.get('https://api.themoviedb.org/3/search/movie?' + this.apiKey + '&query=' + title + '&page=' + page)
            .map(function (data) { return JSON.parse(data['_body']); });
    };
    MovieService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], MovieService);
    return MovieService;
}());
exports.MovieService = MovieService;
//# sourceMappingURL=movie.service.js.map