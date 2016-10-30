import {Component, OnChanges} from '@angular/core';


@Component({
    selector: 'fl-star',
    templateUrl: '..//shared/star.component.html',
    styleUrls: ['..//shared/star.component.css']
})

export class StarComponent implements OnChanges {
    rating: number = 4;
    starWidth: number;

    ngOnChanges(): void {
        this.starWidth = this.rating * 86/5;
    }
}