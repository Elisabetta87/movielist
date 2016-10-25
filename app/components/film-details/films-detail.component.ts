import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {MovieService} from "../../services/movie.service";
import "rxjs/Rx";


@Component({
    moduleId: module.id,
    templateUrl: 'films-detail.component.html',
    styleUrls: ['films-detail.component.css']
})


export class FilmDetailComponent implements OnInit {
    details: string;

    constructor(private mvs: MovieService,
                private route: ActivatedRoute,
                private router: Router
    ) {}

    ngOnInit() {
        this.getDetails(this.route.snapshot.params['id']);
    }


    onBack(): void {
       this.router.navigate(['']);
    }

    
    getDetails(id:number) {
        this.mvs.getDetails(id)
            .subscribe(details => {
                    this.details = details;
                    console.log(details, this.details.poster_path);
                })
    }


}


