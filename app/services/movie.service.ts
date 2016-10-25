import {Http} from "@angular/http";
import {Injectable} from "@angular/core";
import "rxjs/Rx";


@Injectable()
export class MovieService {

    private apiKey: string = 'api_key=c4637c00d2d0a9d2d183af069b0c7c21';

    constructor(private http: Http){}

    getConfig(){
        return this.http.get('https://api.themoviedb.org/3/configuration?' + this.apiKey)
                        .map(data => JSON.parse(data['_body']))

    }
    

    getUpcomings(page:number = 1){// default value for page (param) is 'page=1'
        //This IF below is for avoid making an ajax call every time the user clicks on page number,
        //so we store RESULTS into an array, and if these results exist, we use those ones
        return this.http.get('https://api.themoviedb.org/3/movie/upcoming?'+this.apiKey+'&page='+page)// +'&'+lan)
                        .map(data => JSON.parse(data['_body']))

    }

    getFilmByTitle(title:string, page: number = 1) {
        return this.http.get('https://api.themoviedb.org/3/search/movie?'+this.apiKey+'&query='+title+'&page='+page)
                        .map(data => JSON.parse(data['_body']))
    }


    getDetails(id: number) {
        return this.http.get('https://api.themoviedb.org/3/movie/'+id+'?'+this.apiKey)
                        .map(data => JSON.parse(data['_body']))
    }

}
