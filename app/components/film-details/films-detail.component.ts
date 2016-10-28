import {Component, OnInit, Inject} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {MovieService} from "../../services/movie.service";
import "rxjs/Rx";
import {DomSanitizer} from "@angular/platform-browser";



@Component({
    moduleId: module.id,
    templateUrl: 'films-detail.component.html',
    styleUrls: ['films-detail.component.css']
})


export class FilmDetailComponent implements OnInit {
    details: string;//chiedere a fulvio non e' una string ma un oggetto giusto??
    reviews: {key:any};
    config:{key:any};
    recommendations:{key:any};
    pages: any[][];
    searchByTitle: string;//ngModel
    currPageIndex:number;
    isUpcoming = true;
    isGTxs: boolean;
    isStillUpcoming:boolean = true
    video: string = 'http://www.youtube.com/embed/';
    //dangerousUrl: any;
    //trustedUrl:any;


    constructor(private mvs: MovieService,
                private route: ActivatedRoute,
                private router: Router
                //private sanitizer: DomSanitizer
    ) {}

    ngOnInit() {
        this.getDetails(this.route.snapshot.params['id']);
        this.getReview(this.route.snapshot.params['id']);
        this.getRecommendations(this.route.snapshot.params['id']);
        //this.getTrailer(this.route.snapshot.params['id']);
        this.mvs.getConfig()
            .subscribe(data => {
                this.config = data;
            });
        this.currPageIndex = 0;
        this.pages = new Array(0);
        this.upcoming(1);
        this.isGTxs = window.innerWidth > 767;
    }


    onBack(): void {
       this.router.navigate(['']);
    }

    
    getDetails(id:number) {
        this.mvs.getDetails(id)
            .subscribe(details => {
                    this.details = details;
                    //console.log(details, this.details.poster_path);
                })
    }


    getRecommendations(id:number) {
        this.mvs.getRecommendations(id)
            .subscribe(recommendations => {
                this.recommendations = recommendations;
            })
    }



    getReview(id:number) {
        this.mvs.getReview(id)
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

        if ( event.key == 'Enter' || event.type == 'click' ){
            this.router.navigate([''], {queryParams: {title: this.searchByTitle} });
        }
    }


    // myevent(ev) {
    //     console.log(ev);
    // }

    /*getTrailer(id:number) {
        this.mvs.getTrailer(id)
            .subscribe(trailer =>{
                this.dangerousUrl = this.video + trailer.results[1].id;
                this.trustedUrl = this.sanitizer.bypassSecurityTrustUrl(this.dangerousUrl);
                console.log(trailer, trailer.results[0].id, this.trustedUrl.changingThisBreaksApplicationSecurity);
            })
    }*/

}


