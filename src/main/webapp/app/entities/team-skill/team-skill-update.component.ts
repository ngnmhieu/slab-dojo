import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';
import { ITeamSkill } from 'app/shared/model/team-skill.model';
import { TeamSkillService } from './team-skill.service';
import { ISkill } from 'app/shared/model/skill.model';
import { SkillService } from 'app/entities/skill';
import { ITeam } from 'app/shared/model/team.model';
import { TeamService } from 'app/entities/team';

@Component({
    selector: 'jhi-team-skill-update',
    templateUrl: './team-skill-update.component.html'
})
export class TeamSkillUpdateComponent implements OnInit {
    teamSkill: ITeamSkill;
    isSaving: boolean;

    skills: ISkill[];

    teams: ITeam[];
    completedAt: string;
    verifiedAt: string;

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected teamSkillService: TeamSkillService,
        protected skillService: SkillService,
        protected teamService: TeamService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ teamSkill }) => {
            this.teamSkill = teamSkill;
            this.completedAt = this.teamSkill.completedAt != null ? this.teamSkill.completedAt.format(DATE_TIME_FORMAT) : null;
            this.verifiedAt = this.teamSkill.verifiedAt != null ? this.teamSkill.verifiedAt.format(DATE_TIME_FORMAT) : null;
        });
        this.skillService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<ISkill[]>) => mayBeOk.ok),
                map((response: HttpResponse<ISkill[]>) => response.body)
            )
            .subscribe((res: ISkill[]) => (this.skills = res), (res: HttpErrorResponse) => this.onError(res.message));
        this.teamService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<ITeam[]>) => mayBeOk.ok),
                map((response: HttpResponse<ITeam[]>) => response.body)
            )
            .subscribe((res: ITeam[]) => (this.teams = res), (res: HttpErrorResponse) => this.onError(res.message));
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.teamSkill.completedAt = this.completedAt != null ? moment(this.completedAt, DATE_TIME_FORMAT) : null;
        this.teamSkill.verifiedAt = this.verifiedAt != null ? moment(this.verifiedAt, DATE_TIME_FORMAT) : null;
        if (this.teamSkill.id !== undefined) {
            this.subscribeToSaveResponse(this.teamSkillService.update(this.teamSkill));
        } else {
            this.subscribeToSaveResponse(this.teamSkillService.create(this.teamSkill));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<ITeamSkill>>) {
        result.subscribe((res: HttpResponse<ITeamSkill>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackSkillById(index: number, item: ISkill) {
        return item.id;
    }

    trackTeamById(index: number, item: ITeam) {
        return item.id;
    }
}
