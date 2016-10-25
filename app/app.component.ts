import { Component } from '@angular/core';

@Component({
    selector: 'fl-app',
    template: ` 
        <div>
            <router-outlet></router-outlet>
        </div>
    `
})
export class AppComponent {

}
