/*
import {PipeTransform, Pipe} from "@angular/core";
//import {MovieService} from "./movie.service";
import {getFilmByTitle} from "./films-list.component";

@Pipe({
    name: 'filmFilter'
})

export class FilmFilterPipe implements PipeTransform {
    transform(value: listFilter, filterBy: string): listFilter{
        filterBy = filterBy ? filterBy.toLocaleLowerCase() : null;
        return filterBy ? value.filter((searchByTitle: listFilter) =>
        getFilmByTitle(listFilter).toLocaleLowerCase().indexOf(filterBy) !== -1): value;
    }
}

*/

