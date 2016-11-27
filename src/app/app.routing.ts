import {RouterModule, Routes} from "@angular/router";
import {FilmDetailComponent} from "./components/film-details/films-detail.component";

import {FilmUpcomingComponent} from "./components/film-upcoming/film-upcoming.component";


const routes: Routes =
    <Routes>[
        {path: 'details/:id', component: FilmDetailComponent, pathMatch: 'full'},
        {path: '', component: FilmUpcomingComponent, pathMatch: 'full'},
        {path: '**', component: FilmUpcomingComponent, pathMatch: 'full'}
    ];


export const routing = RouterModule.forRoot(routes);

