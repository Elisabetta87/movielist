import {Component, OnInit, ViewChild, QueryList} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {MovieService} from "../../services/movie.service";
import "rxjs/Rx";
import * as moment from 'moment';
import {Observable} from "rxjs/Rx";
import {ModalBiographyComponent} from "../ModalBiography/ModalBiography.component";

@Component ({
    template    : require('./films-detail.component.html'),
    styles      : [require('./films-detail.component.scss')]
})


export class FilmDetailComponent implements OnInit {

    @ViewChild(ModalBiographyComponent) modal: QueryList<ModalBiographyComponent>;

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


    constructor(private mvs: MovieService,
                private route: ActivatedRoute,
                private router: Router
                ) {
    }

    ngOnInit() {
        this.router.events
            .subscribe(data => {
            if (data.constructor.name == 'NavigationEnd') {
                this.mvs.getConfig()
                    .subscribe(data => {
                        this.config = data;
                        this.getDetails(this.route.snapshot.params['id']);
                        this.getReview(this.route.snapshot.params['id']);
                        this.getRecommendations(this.route.snapshot.params['id']);
                        this.getCharacters(this.route.snapshot.params['id'], 6);
                    });
            }

        });

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


    getCharacters(movieId:number, numActors:number) {
        this.cast = new Array();
        this.mvs.getCast(movieId, numActors)
            .subscribe( arrObsActor => {
                for (let i=0; i<arrObsActor.sources.length; i++){
                    let character = arrObsActor.sources[i][1];
                    arrObsActor.sources[i][0].subscribe(data => {
                        data.character = character;
                        this.cast.push(data);
                    })
                }

            })
    }


    showBiograhy(char){
        this.character = char;
        this.modal.modal.show()
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
            this.router.navigate([''], {queryParams: {title: this.searchByTitle}});
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


