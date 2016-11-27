import {Component, OnInit} from '@angular/core';
import {MovieSearchService} from "../../services/movie-search.service";
import {MovieService} from "../../services/movie.service";
import "rxjs/Rx";


@Component({
    selector: 'fl-upcoming',
    templateUrl: './film-upcoming.component.html',
    styleUrls: ['./film-upcoming.component.scss']
})

export class FilmUpcomingComponent implements OnInit {
    
    searchTitle: string;
    movies:{key:any};

    constructor(private moviesearch: MovieSearchService, private mvs: MovieService) {

    }

    ngOnInit(){
        this.moviesearch.get_title()
            .subscribe(title =>{
                console.log('subscribe', title);
                //this.searchByTitle = title;
                this.mvs.getFilmByTitle(title)
                    .subscribe(movies => this.movies = movies);
            });
    }


    logTitle(ev:any) {
        //console.log(ev);
    }





}


