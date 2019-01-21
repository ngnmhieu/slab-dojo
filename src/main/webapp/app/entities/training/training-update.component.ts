import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';

import { ITraining } from 'app/shared/model/training.model';
import { TrainingService } from './training.service';
import { ISkill } from 'app/shared/model/skill.model';
import { SkillService } from 'app/entities/skill';

@Component({
    selector: 'jhi-training-update',
    templateUrl: './training-update.component.html'
})
export class TrainingUpdateComponent implements OnInit {
    private _training: ITraining;
    isSaving: boolean;

    skills: ISkill[];
    validUntil: string;

    constructor(
        private jhiAlertService: JhiAlertService,
        private trainingService: TrainingService,
        private skillService: SkillService,
        private route: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.route.data.subscribe(({ training }) => {
            this.training = training.body ? training.body : training;
        });
        this.skillService.query().subscribe(
            (res: HttpResponse<ISkill[]>) => {
                this.skills = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.training.validUntil = moment(this.validUntil, DATE_TIME_FORMAT);
        if (this.training.id !== undefined) {
            this.subscribeToSaveResponse(this.trainingService.update(this.training));
        } else {
            this.subscribeToSaveResponse(this.trainingService.create(this.training));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ITraining>>) {
        result.subscribe((res: HttpResponse<ITraining>) => this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: ITraining) {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackSkillById(index: number, item: ISkill) {
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
    get training() {
        return this._training;
    }

    set training(training: ITraining) {
        this._training = training;
        this.validUntil = moment(training.validUntil).format();
    }
}
