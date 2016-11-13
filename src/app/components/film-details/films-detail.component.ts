import {Component, OnInit, ViewChild, QueryList, Output} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {MovieService} from "../../services/movie.service";
import "rxjs/Rx";
import * as moment from 'moment';
import {Observable} from "rxjs/Rx";
import {ModalBiographyComponent} from "../ModalBiography/ModalBiography.component";
import {Location} from "@angular/common";

@Component ({
    template    : require('./films-detail.component.html'),
    styles      : [require('./films-detail.component.scss')]
})


export class FilmDetailComponent implements OnInit {

    @ViewChild(ModalBiographyComponent) modalBiography: QueryList<ModalBiographyComponent>;

    details: string;
    reviews: {key:any};
    config:{key:any};
    recommendations:{key:any};
    pages: any[][];
    searchByTitle: string;//ngModel
    currPageIndex:number;
    isUpcoming = true;
    isStillUpcoming:boolean = true;
    mymoment = moment;
    cast:any[];
    character:{key:any};



    constructor(private _mvs      : MovieService,
                private _route    : ActivatedRoute,
                private _router   : Router,
                private _location : Location
                ) {
    }

    ngOnInit() {
        this._router.events
            .subscribe(data => {
            if (data.constructor.name == 'NavigationEnd') {
                this._mvs.getConfig()
                    .subscribe(data => {
                        this.config = data;
                        this.getDetails(this._route.snapshot.params['id']);
                        this.getReview(this._route.snapshot.params['id']);
                        this.getRecommendations(this._route.snapshot.params['id']);
                        this.getCharacters(this._route.snapshot.params['id'], 6);
                    });
            }

        });

    }


    onBack(): void {
       this._location.back();
    }

    
    getDetails(id:number) {
        this._mvs.getDetails(id)
            .subscribe(details => {
                    this.details = details;
                    //console.log(details, this.details.poster_path);
                })
    }


    getRecommendations(id:number) {
        this._mvs.getRecommendations(id)
            .subscribe(recommendations => {
               this.recommendations = recommendations;
               this.scrollTopZero(15);
            })
    }

    scrollTopZero(speed:number){
        let count = 0;
        let scroll = setInterval(() => {
            //console.log(count++);
                let pixels = (window.scrollY)/100 * speed;
                window.scrollTo(0,window.scrollY - pixels);
                if (window.scrollY==0){
                    clearInterval(scroll);
                }
        },speed);
    }

    getReview(id:number) {
        this._mvs.getReview(id)
            .subscribe(reviews => {
                this.reviews = reviews;
            })
    }


    getMovies(){
        if (!this.pages || !this.pages[this.currPageIndex]) {
            let page: number = (this.currPageIndex + 1);
            if (this.isStillUpcoming) {
                this.upcoming(page);
                return;
            }
            this.sendSearch(page);
        }
    }

    upcoming(page: number) {
        this._mvs.getUpcomings(page)
            .subscribe(data => {
                if (!this.pages[0]) {//if that array have not been initialized yet
                    this.pages = new Array(data['total_pages']);
                }

                if (!this.pages[this.currPageIndex]) {//if that cell of his array hase not been fill yet
                    this.pages[this.currPageIndex] = data.results;
                }
            })

    }


    getCharacters(movieId:number, numActors:number) {
        this.cast = new Array();
        this._mvs.getCast(movieId, numActors)
            .subscribe( arrObsActor => {
                if (arrObsActor['sources']) {
                    for (let i=0; i<arrObsActor['sources'].length; i++){
                        let character = arrObsActor['sources'][i][1];
                        arrObsActor['sources'][i][0].subscribe((data:any) => {
                            data.character = character;
                            this.cast.push(data);
                        })
                    }
                }
            })
    }


    showBiograhy(char:{key:any}){
        this.character = char;
    }

    resetCharacter(){
        this.character = null;
    }


    sendSearch(page:number, event?:any){
        if ( event.key == 'Enter' || event.type == 'click' ){
            this._router.navigate([''], {queryParams: {title: this.searchByTitle}});
        }
    }


}


