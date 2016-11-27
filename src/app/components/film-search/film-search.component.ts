import {Component, Output, EventEmitter} from '@angular/core';
import {MovieSearchService} from "../../services/movie-search.service";
import {Observable} from "rxjs/Rx";

@Component({
    selector: 'fl-search-film',
    templateUrl: './film-search.component.html',
    styleUrls: ['./film-search.component.scss']
})

export class FilmSearchComponent {

    searchTitle: string;


    @Output() searchEvent = new EventEmitter();
    
    constructor(private moviesearch: MovieSearchService){}



    takeTitle(ev:any) {
        if (ev.key == 'Enter' || ev.type == 'click') {
            //this.moviesearch.title = Observable.of(this.searchTitle);
            this.moviesearch.set_title(this.searchTitle);
            
            this.searchEvent.emit(this.searchTitle);
            console.log(this.searchTitle);
        }
    }
    
    
    
}
