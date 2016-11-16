import {Component, OnInit, Input, ViewChild, QueryList} from '@angular/core';
import {MovieService} from "../../services/movie.service";
import {Router, Route, ActivatedRoute} from "@angular/router";
import {HeaderBarComponent} from "../header-bar/header-bar.component";
import * as moment from 'moment';
import "rxjs/Rx";


@Component({
    selector    : 'fl-films',
    templateUrl : './film-list.component.html',
    styleUrls   : ['app/films-list.component.scss']
})

export class FilmsListComponent implements OnInit {

    @ViewChild(HeaderBarComponent) headerBarComponent: QueryList<HeaderBarComponent>;

    config:{key:any};
    pageTitle: string = 'Film List';
    films: any[];
    // pages: it's an array of array, where each inxed represent a page number, and the value a list of film for that page number
    // [ [list_film1 data], [list_film2 data], [list_film3 data], [list_film4 data], [list_film5 data] ...]
    pages: any[][];
    searchByTitle: string;//ngModel
    currPageIndex:number;
    currLanguage = 'en-EN';
    isUpcoming = true;
    isGTxs: boolean;
    isStillUpcoming:boolean = true;
    errorMessage: string;
    mymoment = moment;
    
    constructor(private mvs: MovieService, private route: ActivatedRoute){}

    ngOnInit(){
        this.mvs.getConfig()
            .subscribe(data => {
                this.config = data;
        });
        
        this.currPageIndex = 0;
        this.pages = new Array(0);

        if ( this.route.queryParams['value'].title ) {
            this.searchByTitle = this.route.queryParams['value'].title;
            this.sendSearch(1);
        } else {
            this.upcoming(1);
        }
        this.isGTxs = window.innerWidth > 767;
    }

    newPage(clicked_page: number){
        if ( this.currPageIndex != clicked_page){
             this.currPageIndex = clicked_page;
             this.getMovies();
        }
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
            this.mvs.getUpcomings(page)
                    .subscribe(data => {
                        if (!this.pages[0]) {//if that array have not been initialized yet
                            this.pages = new Array(data['total_pages']);
                        }

                        if (!this.pages[this.currPageIndex]) {//if that cell of his array hase not been fill yet
                            this.pages[this.currPageIndex] = data.results;
                        }
            })

    }

    sendSearch(page:number, event?:any){
        if ( page || event.key == 'Enter' || event.type == 'click'){
            this.isStillUpcoming = false;
            if (this.searchByTitle) {
                this.mvs.getFilmByTitle(this.searchByTitle, page)
                    .subscribe(data => {
                        if (data.results.length != 0) {
                            if (!!event) {//if that array have not been initialized yet
                                this.pages = new Array(data['total_pages']);
                            }
                            if (!this.pages[this.currPageIndex]) {//if that cell of his array hase not been fill yet
                                this.pages[this.currPageIndex] = data.results;
                            }
                        } else {
                            this.errorMessage = 'No results found. Please enter a valid title.';
                        }
                    })
            }
        }

    }
    
}


