import { Component } from '@angular/core';
import {Http} from "@angular/http";
import "rxjs/Rx";
import {MovieService} from "./services/movie.service";

@Component({
    selector: 'fl-app',
    template: ` 
        <div>
            <fl-films [config]="config"></fl-films>      
        </div>
    `
})
export class AppComponent {
    pageTitle: string = 'My Film List';
    myname:string = "Elisa";
    config:{key:any}

    constructor(private mvs: MovieService){
        this.mvs.getConfig()
                .subscribe(data => {
                  console.log(data);
                    this.config = data;
                })
    }
    
    
}
