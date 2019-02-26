import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';
import { IBadge } from 'app/shared/model/badge.model';
import { BadgeService } from './badge.service';
import { IDimension } from 'app/shared/model/dimension.model';
import { DimensionService } from 'app/entities/dimension';
import { IImage } from 'app/shared/model/image.model';
import { ImageService } from 'app/entities/image';

@Component({
    selector: 'jhi-badge-update',
    templateUrl: './badge-update.component.html'
})
export class BadgeUpdateComponent implements OnInit {
    badge: IBadge;
    isSaving: boolean;

    dimensions: IDimension[];

    images: IImage[];
    availableUntil: string;

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected badgeService: BadgeService,
        protected dimensionService: DimensionService,
        protected imageService: ImageService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ badge }) => {
            this.badge = badge;
            this.availableUntil = this.badge.availableUntil != null ? this.badge.availableUntil.format(DATE_TIME_FORMAT) : null;
        });
        this.dimensionService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IDimension[]>) => mayBeOk.ok),
                map((response: HttpResponse<IDimension[]>) => response.body)
            )
            .subscribe((res: IDimension[]) => (this.dimensions = res), (res: HttpErrorResponse) => this.onError(res.message));
        this.imageService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IImage[]>) => mayBeOk.ok),
                map((response: HttpResponse<IImage[]>) => response.body)
            )
            .subscribe((res: IImage[]) => (this.images = res), (res: HttpErrorResponse) => this.onError(res.message));
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.badge.availableUntil = this.availableUntil != null ? moment(this.availableUntil, DATE_TIME_FORMAT) : null;
        if (this.badge.id !== undefined) {
            this.subscribeToSaveResponse(this.badgeService.update(this.badge));
        } else {
            this.subscribeToSaveResponse(this.badgeService.create(this.badge));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IBadge>>) {
        result.subscribe((res: HttpResponse<IBadge>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackDimensionById(index: number, item: IDimension) {
        return item.id;
    }

    trackImageById(index: number, item: IImage) {
        return item.id;
    }

    getSelected(selectedVals: Array<any>, option: any) {
        if (selectedVals) {
            for (let i = 0; i < selectedVals.length; i++) {
                if (option.id === selectedVals[i].id) {
                    return selectedVals[i];
                }
            }
        }
        return option;
    }
}
