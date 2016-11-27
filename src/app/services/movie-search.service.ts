import {Injectable} from "@angular/core";
import "rxjs/Rx";
import {Observable, Subject} from "rxjs/Rx";


@Injectable()
export class MovieSearchService {

    //private _title: string;
    private _title = new Subject<string>();
    private _titleObs = this._title.asObservable();

    set_title(title:string) {
        this._title.next(title);
        //console.log(this._title);
    }

    get_title() {
        return this._titleObs;
    }

}


