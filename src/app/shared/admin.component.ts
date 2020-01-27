import { Component } from '@angular/core';
import { fadeInAnimation } from '../animations';

@Component({
    templateUrl: './admin.component.html',
    animations: [fadeInAnimation],
    host: { '[@fadeInAnimation]': ''}
})
export class AdminComponent {
    constructor() { }

}