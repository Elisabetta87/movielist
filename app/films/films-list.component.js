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
require("rxjs/Rx");
var movie_service_1 = require("../services/movie.service");
var FilmsListComponent = (function () {
    function FilmsListComponent(mvs) {
        this.mvs = mvs;
        this.pageTitle = 'Film List';
        this.currLanguage = 'en-EN';
        this.isUpcoming = true;
        this.isStillUpcoming = true;
    }
    FilmsListComponent.prototype.ngOnInit = function () {
        this.currPageIndex = 0;
        this.pages = new Array(0);
        this.upcoming();
        this.isGTxs = window.innerWidth > 767;
    };
    FilmsListComponent.prototype.newPage = function (clicked_page) {
        if (this.currPageIndex != clicked_page) {
            this.currPageIndex = clicked_page;
            this.getMovies();
        }
    };
    FilmsListComponent.prototype.getMovies = function () {
        if (!this.pages || !this.pages[this.currPageIndex]) {
            var page = (this.currPageIndex + 1);
            if (this.isStillUpcoming) {
                this.upcoming(page);
                return;
            }
            this.sendSearch(page);
        }
    };
    FilmsListComponent.prototype.upcoming = function (page) {
        var _this = this;
        this.mvs.getUpcomings(page)
            .subscribe(function (data) {
            console.log(data);
            if (!_this.pages[0]) {
                _this.pages = new Array(data.total_pages);
            }
            if (!_this.pages[_this.currPageIndex]) {
                _this.pages[_this.currPageIndex] = data.results;
            }
        });
    };
    FilmsListComponent.prototype.sendSearch = function (page, event) {
        var _this = this;
        if (page || event.key == 'Enter') {
            this.isStillUpcoming = false;
            this.mvs.getFilmByTitle(this.searchByTitle, page)
                .subscribe(function (data) {
                if (!!event) {
                    _this.pages = new Array(data.total_pages);
                }
                if (!_this.pages[_this.currPageIndex]) {
                    _this.pages[_this.currPageIndex] = data.results;
                }
            });
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], FilmsListComponent.prototype, "config", void 0);
    FilmsListComponent = __decorate([
        core_1.Component({
            selector: 'fl-films',
            moduleId: module.id,
            templateUrl: 'films-list.component.html',
            styleUrls: ['films-list.component.css']
        }), 
        __metadata('design:paramtypes', [movie_service_1.MovieService])
    ], FilmsListComponent);
    return FilmsListComponent;
}());
exports.FilmsListComponent = FilmsListComponent;
/*
class Persona {
    private _newbirthday:number = 1;

    constructor(private nome:string, private cognome:string, private eta:number, private gender:string|number){
    }

    itsMyBirthday(){
        this.eta = this.eta ? (this.eta + this._newbirthday) : this._newbirthday;
    }

}

class Studente extends Persona {

    constructor(private n:string, cn:string, eta:number, gender:string|number, private job:string){
        super(n, cn, eta, gender);
    }

}


let p1: Persona = new Persona('Elisa', 'Gualtieri', 29, 'F');

console.log( p1 );

p1.itsMyBirthday();
console.log(p1);


let s1: Studente = new Studente('Fulvio', 'Cosco', 38, 'M', 'frontender');

console.log( s1 );
*/
//# sourceMappingURL=films-list.component.js.map