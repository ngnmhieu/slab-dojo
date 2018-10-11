import { Component, Input } from '@angular/core';
import { IPerson } from 'app/shared/model/person.model';

@Component({
    selector: 'jhi-person-image',
    templateUrl: './person-image.component.html',
    styleUrls: ['./person-image.scss']
})
export class PersonImageComponent {
    @Input() person: IPerson;
    @Input() size = '50px';
    @Input() imageSize = 'large';
    @Input() hasPlaceholder = true;
    @Input() hasBorder = true;
    @Input() hasOverlay = false;
    constructor() {}
}
