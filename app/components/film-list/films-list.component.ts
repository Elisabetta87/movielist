import {Component, OnInit, Input} from '@angular/core';
import {MovieService} from "../../services/movie.service";
import "rxjs/Rx";


@Component({
    selector: 'fl-films',
    moduleId: module.id,
    templateUrl: 'films-list.component.html',
    styleUrls: ['films-list.component.css']
})

export class FilmsListComponent implements OnInit {

    config:{key:any}
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

    constructor(private mvs: MovieService){}

    ngOnInit(){

        this.mvs.getConfig()
            .subscribe(data => {
                this.config = data;
        });
        
        this.currPageIndex = 0;
        this.pages = new Array(0);
        this.upcoming(1);
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
                            this.pages = new Array(data.total_pages);
                        }

                        if (!this.pages[this.currPageIndex]) {//if that cell of his array hase not been fill yet
                            this.pages[this.currPageIndex] = data.results;
                        }
            })

    }

    sendSearch(page:number, event?:any){
        if ( page || event.key == 'Enter'){
            this.isStillUpcoming = false;
            this.mvs.getFilmByTitle(this.searchByTitle, page)
                .subscribe(data => {
                    if (!!event) {//if that array have not been initialized yet
                        this.pages = new Array(data.total_pages);
                    }

                    if (!this.pages[this.currPageIndex]) {//if that cell of his array hase not been fill yet
                        this.pages[this.currPageIndex] = data.results;
                    }
                })
        }
    }

}








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


