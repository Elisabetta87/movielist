"use strict";
var router_1 = require("@angular/router");
var films_detail_component_1 = require("./components/film-details/films-detail.component");
var films_list_component_1 = require("./components/film-list/films-list.component");
var routes = [
    { path: 'details/:id', component: films_detail_component_1.FilmDetailComponent },
    { path: '', component: films_list_component_1.FilmsListComponent },
    { path: '**', component: films_list_component_1.FilmsListComponent }
];
exports.routing = router_1.RouterModule.forRoot(routes);
//# sourceMappingURL=app.routing.js.map