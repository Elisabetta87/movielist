import {RouterModule, Routes} from "@angular/router";
import {FilmDetailComponent} from "./components/film-details/films-detail.component";
import {FilmsListComponent} from "./components/film-list/films-list.component";
import {NgModule} from "@angular/core";


const routes: Routes = [
    {path: 'details/:id', component: FilmDetailComponent, pathMatch: 'full'},
    {path: '', component: FilmsListComponent, pathMatch: 'full'},
    {path: '**', redirectTo: '', pathMatch: 'full'}
];


@NgModule({
    imports: [ RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class RoutingModule { }