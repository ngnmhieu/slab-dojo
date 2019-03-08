import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IBadgeSkill } from 'app/shared/model/badge-skill.model';
import { BadgeSkillService } from './badge-skill.service';
import { IBadge } from 'app/shared/model/badge.model';
import { BadgeService } from 'app/entities/badge';
import { ISkill } from 'app/shared/model/skill.model';
import { SkillService } from 'app/entities/skill';

@Component({
    selector: 'jhi-badge-skill-update',
    templateUrl: './badge-skill-update.component.html'
})
export class BadgeSkillUpdateComponent implements OnInit {
    badgeSkill: IBadgeSkill;
    isSaving: boolean;

    badges: IBadge[];

    skills: ISkill[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected badgeSkillService: BadgeSkillService,
        protected badgeService: BadgeService,
        protected skillService: SkillService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ badgeSkill }) => {
            this.badgeSkill = badgeSkill;
        });
        this.badgeService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IBadge[]>) => mayBeOk.ok),
                map((response: HttpResponse<IBadge[]>) => response.body)
            )
            .subscribe((res: IBadge[]) => (this.badges = res), (res: HttpErrorResponse) => this.onError(res.message));
        this.skillService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<ISkill[]>) => mayBeOk.ok),
                map((response: HttpResponse<ISkill[]>) => response.body)
            )
            .subscribe((res: ISkill[]) => (this.skills = res), (res: HttpErrorResponse) => this.onError(res.message));
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.badgeSkill.id !== undefined) {
            this.subscribeToSaveResponse(this.badgeSkillService.update(this.badgeSkill));
        } else {
            this.subscribeToSaveResponse(this.badgeSkillService.create(this.badgeSkill));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IBadgeSkill>>) {
        result.subscribe((res: HttpResponse<IBadgeSkill>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackBadgeById(index: number, item: IBadge) {
        return item.id;
    }

    trackSkillById(index: number, item: ISkill) {
        return item.id;
    }
}
