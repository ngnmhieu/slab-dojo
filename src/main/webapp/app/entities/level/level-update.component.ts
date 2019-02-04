import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { ILevel } from 'app/shared/model/level.model';
import { LevelService } from './level.service';
import { IDimension } from 'app/shared/model/dimension.model';
import { DimensionService } from 'app/entities/dimension';
import { IImage } from 'app/shared/model/image.model';
import { ImageService } from 'app/entities/image';

@Component({
    selector: 'jhi-level-update',
    templateUrl: './level-update.component.html'
})
export class LevelUpdateComponent implements OnInit {
    level: ILevel;
    isSaving: boolean;

    dimensions: IDimension[];

    dependsons: ILevel[];

    images: IImage[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected levelService: LevelService,
        protected dimensionService: DimensionService,
        protected imageService: ImageService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ level }) => {
            this.level = level;
        });
        this.dimensionService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IDimension[]>) => mayBeOk.ok),
                map((response: HttpResponse<IDimension[]>) => response.body)
            )
            .subscribe((res: IDimension[]) => (this.dimensions = res), (res: HttpErrorResponse) => this.onError(res.message));
        this.levelService
            .query({ 'levelId.specified': 'false' })
            .pipe(
                filter((mayBeOk: HttpResponse<ILevel[]>) => mayBeOk.ok),
                map((response: HttpResponse<ILevel[]>) => response.body)
            )
            .subscribe(
                (res: ILevel[]) => {
                    if (!this.level.dependsOnId) {
                        this.dependsons = res;
                    } else {
                        this.levelService
                            .find(this.level.dependsOnId)
                            .pipe(
                                filter((subResMayBeOk: HttpResponse<ILevel>) => subResMayBeOk.ok),
                                map((subResponse: HttpResponse<ILevel>) => subResponse.body)
                            )
                            .subscribe(
                                (subRes: ILevel) => (this.dependsons = [subRes].concat(res)),
                                (subRes: HttpErrorResponse) => this.onError(subRes.message)
                            );
                    }
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
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
        if (this.level.id !== undefined) {
            this.subscribeToSaveResponse(this.levelService.update(this.level));
        } else {
            this.subscribeToSaveResponse(this.levelService.create(this.level));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<ILevel>>) {
        result.subscribe((res: HttpResponse<ILevel>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackLevelById(index: number, item: ILevel) {
        return item.id;
    }

    trackImageById(index: number, item: IImage) {
        return item.id;
    }
}
