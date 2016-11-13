import {NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent }  from './app.component';
import {HttpModule} from "@angular/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MovieService} from "./services/movie.service";
import {FilmsListComponent} from "./components/film-list/films-list.component";
import {FilmDetailComponent} from './components/film-details/films-detail.component';
import {routing} from './app.routing';
import {ActivatedRoute} from "@angular/router";
import {Ng2BootstrapModule} from "ng2-bootstrap/ng2-bootstrap";
import {ModalBiographyComponent} from "./components/ModalBiography/ModalBiography.component";


@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        FormsModule,
        ReactiveFormsModule,
        Ng2BootstrapModule,
        routing
    ],

    declarations: [
        AppComponent,
        FilmsListComponent,
        FilmDetailComponent,
        ModalBiographyComponent
    ],

    providers: [
        MovieService
    ],

    bootstrap: [ AppComponent ]
})
export class AppModule { }
