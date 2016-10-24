import {NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent }  from './app.component';
import {FilmsListComponent} from "./films/films-list.component";
import {Http, HttpModule} from "@angular/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MovieService} from "./services/movie.service";
import {FilmFilterPipe} from "./films/films-filter.pipe";
import {StartComponent} from "./shared/star.component";

@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        FormsModule,
        ReactiveFormsModule
    ],

    declarations: [
        AppComponent,
        FilmsListComponent,
        FilmFilterPipe,
        StartComponent
    ],

    providers: [
        MovieService
    ],

    bootstrap: [ AppComponent ]
})
export class AppModule { }
