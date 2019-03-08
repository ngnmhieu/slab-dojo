import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { ISkill } from 'app/shared/model/skill.model';
import { SkillService } from './skill.service';
import { ITraining } from 'app/shared/model/training.model';
import { TrainingService } from 'app/entities/training';

@Component({
    selector: 'jhi-skill-update',
    templateUrl: './skill-update.component.html'
})
export class SkillUpdateComponent implements OnInit {
    skill: ISkill;
    isSaving: boolean;

    trainings: ITraining[];

    constructor(
        private jhiAlertService: JhiAlertService,
        protected skillService: SkillService,
        private trainingService: TrainingService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ skill }) => {
            this.skill = skill;
        });
        this.trainingService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<ITraining[]>) => mayBeOk.ok),
                map((response: HttpResponse<ITraining[]>) => response.body)
            )
            .subscribe((res: ITraining[]) => (this.trainings = res), (res: HttpErrorResponse) => this.onError(res.message));
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.skill.id !== undefined) {
            this.subscribeToSaveResponse(this.skillService.update(this.skill));
        } else {
            this.subscribeToSaveResponse(this.skillService.create(this.skill));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<ISkill>>) {
        result.subscribe((res: HttpResponse<ISkill>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackTrainingById(index: number, item: ITraining) {
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
