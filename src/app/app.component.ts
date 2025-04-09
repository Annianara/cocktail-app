import {Component} from '@angular/core';
import {addIcons} from 'ionicons';
import * as allIcons from "ionicons/icons";

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    imports: [],
})
export class AppComponent {
    constructor() {
        addIcons(allIcons);

    }
}
