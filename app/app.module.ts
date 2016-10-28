import {NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent }  from './app.component';
import {FilmsListComponent} from "./components/film-list/films-list.component";
import {HttpModule} from "@angular/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MovieService} from "./services/movie.service";
import {FilmDetailComponent} from "./components/film-details/films-detail.component";
import {routing} from "./app.routing";
import {ActivatedRoute} from "@angular/router";



@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        FormsModule,
        ReactiveFormsModule,
        routing
    ],

    declarations: [
        AppComponent,
        FilmsListComponent,
        FilmDetailComponent
    ],

    providers: [
        MovieService
    ],

    bootstrap: [ AppComponent ]
})
export class AppModule { }
