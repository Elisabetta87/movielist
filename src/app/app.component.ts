import {Component, ViewContainerRef} from '@angular/core';

@Component({
    selector: 'fl-app',
    template: `
        <div>
                
            <router-outlet></router-outlet>
        </div>
    `,
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    private viewContainerRef: ViewContainerRef;


    public constructor(viewContainerRef: ViewContainerRef) {
        this.viewContainerRef = viewContainerRef;
    }
}
