import {Http} from "@angular/http";
import {Injectable} from "@angular/core";
import "rxjs/Rx";
import {Observable} from "rxjs/Rx";

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
                        //.debounce(1000)
    }


    getDetails(id: number) {
        return this.http.get('https://api.themoviedb.org/3/movie/'+id+'?'+this.apiKey)
                        .map(data => JSON.parse(data['_body']))
    }


    getReview(id:number) {
        return this.http.get('https://api.themoviedb.org/3/movie/'+id+'/reviews?'+this.apiKey)
                        .map(data => JSON.parse(data['_body']))
    }


    getRecommendations(id:number) {
        return this.http.get('https://api.themoviedb.org/3/movie/'+id+'/recommendations?'+this.apiKey)
                        .map(data => JSON.parse(data['_body']))
    }



    getCredits(id:number) {
        return this.http.get('https://api.themoviedb.org/3/movie/'+id+'/credits?'+this.apiKey)
                        .map(data => JSON.parse(data['_body']))
    }


    getPerson(person_id:number) {
        return this.http.get('https://api.themoviedb.org/3/person/'+person_id+'?'+this.apiKey)
                        .map(data => JSON.parse(data['_body']))
    }
    
    
    getCast(id:number, numCast:number){
        return this.getCredits(id)
            .map( credits => credits.cast.length >= numCast ? credits.cast.slice(0,numCast) : credits.cast )
            .map( cast => {
                     let arrGetPerson = new Array();
                     for(let i in cast){
                         arrGetPerson.push([this.getPerson(cast[i].id), cast[i].character]);
                         //arrGetPerson.push(this.getPerson(cast[i].id));
                     }
                     return Observable['forkJoin'](arrGetPerson);
            });
    }


    getTrailer(id: number) {
        return this.http.get('https://api.themoviedb.org/3/movie/'+id+'/videos?'+this.apiKey)
                        .map(data => JSON.parse(data['_body']))
    }

}
