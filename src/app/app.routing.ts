import {RouterModule, Routes} from "@angular/router";
import {FilmDetailComponent} from "./components/film-details/films-detail.component";
import {FilmsListComponent} from "./components/film-list/films-list.component";


const routes: Routes = [
    {path: 'details/:id', component: FilmDetailComponent, pathMatch: 'full'},

    {path: '', component: FilmsListComponent, pathMatch: 'full'},
    {path: '**', component: FilmsListComponent, pathMatch: 'full'}
];


export const routing = RouterModule.forRoot(routes);

