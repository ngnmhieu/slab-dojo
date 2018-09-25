import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';

import { IPersonSkill } from 'app/shared/model/person-skill.model';
import { PersonSkillService } from './person-skill.service';
import { ISkill } from 'app/shared/model/skill.model';
import { SkillService } from 'app/entities/skill';
import { IPerson } from 'app/shared/model/person.model';
import { PersonService } from 'app/entities/person';

@Component({
    selector: 'jhi-person-skill-update',
    templateUrl: './person-skill-update.component.html'
})
export class PersonSkillUpdateComponent implements OnInit {
    private _personSkill: IPersonSkill;
    isSaving: boolean;

    skills: ISkill[];

    people: IPerson[];
    completedAt: string;
    verifiedAt: string;

    constructor(
        private jhiAlertService: JhiAlertService,
        private personSkillService: PersonSkillService,
        private skillService: SkillService,
        private personService: PersonService,
        private route: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.route.data.subscribe(({ personSkill }) => {
            this.personSkill = personSkill.body ? personSkill.body : personSkill;
        });
        this.skillService.query().subscribe(
            (res: HttpResponse<ISkill[]>) => {
                this.skills = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.personService.query().subscribe(
            (res: HttpResponse<IPerson[]>) => {
                this.people = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.personSkill.completedAt = moment(this.completedAt, DATE_TIME_FORMAT);
        this.personSkill.verifiedAt = moment(this.verifiedAt, DATE_TIME_FORMAT);
        if (this.personSkill.id !== undefined) {
            this.subscribeToSaveResponse(this.personSkillService.update(this.personSkill));
        } else {
            this.subscribeToSaveResponse(this.personSkillService.create(this.personSkill));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IPersonSkill>>) {
        result.subscribe((res: HttpResponse<IPersonSkill>) => this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: IPersonSkill) {
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

    trackPersonById(index: number, item: IPerson) {
        return item.id;
    }
    get personSkill() {
        return this._personSkill;
    }

    set personSkill(personSkill: IPersonSkill) {
        this._personSkill = personSkill;
        this.completedAt = moment(personSkill.completedAt).format();
        this.verifiedAt = moment(personSkill.verifiedAt).format();
    }
}
