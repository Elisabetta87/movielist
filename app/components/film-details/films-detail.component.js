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
    }
    FilmDetailComponent.prototype.ngOnInit = function () {
        this.getDetails(this.route.snapshot.params['id']);
    };
    FilmDetailComponent.prototype.onBack = function () {
        this.router.navigate(['']);
    };
    FilmDetailComponent.prototype.getDetails = function (id) {
        var _this = this;
        this.mvs.getDetails(id)
            .subscribe(function (details) {
            _this.details = details;
            console.log(details, _this.details.poster_path);
        });
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