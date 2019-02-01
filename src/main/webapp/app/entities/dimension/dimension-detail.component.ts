import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IDimension } from 'app/shared/model/dimension.model';

@Component({
    selector: 'jhi-dimension-detail',
    templateUrl: './dimension-detail.component.html'
})
export class DimensionDetailComponent implements OnInit {
    dimension: IDimension;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ dimension }) => {
            this.dimension = dimension;
        });
    }

    previousState() {
        window.history.back();
    }
}
