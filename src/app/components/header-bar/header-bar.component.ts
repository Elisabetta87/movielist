import {Component, OnInit, ViewChild} from "@angular/core";
import {Router, ActivatedRoute} from "@angular/router";
import {MovieService} from "../../services/movie.service";


@Component ({
    selector    : 'header-bar',
    templateUrl : require('./header-bar.component.html'),
    styles   : [require('./header-bar.component.scss')]
})

export class HeaderBarComponent implements OnInit {
    
    // @ViewChild('nav')
        
    searchByTitle: string;
    config:{key:any};
    pages: any[][];
    currPageIndex:number;
    isUpcoming = true;
    isGTxs: boolean;
    isStillUpcoming:boolean = true;

    constructor(private _mvs      : MovieService,
                private _route    : ActivatedRoute,
                private _router   : Router
    ) {}


    ngOnInit(){

        this._mvs.getConfig()
            .subscribe(data => {
                this.config = data;
            });

        this.currPageIndex = 0;
        this.pages = new Array(0);

        if ( this._route.queryParams['value'].title ) {
            this.searchByTitle = this._route.queryParams['value'].title;
            this.sendSearch(1);
        } else {
            this.upcoming(1);
        }
        this.isGTxs = window.innerWidth > 767;
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
    

    sendSearch(page:number, event?:any){
        if ( event.key == 'Enter' || event.type == 'click' ){
            this._router.navigate([''], {queryParams: {title: this.searchByTitle}});
        }
    }

}