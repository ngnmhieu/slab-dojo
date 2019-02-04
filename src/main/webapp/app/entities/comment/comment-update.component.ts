import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';
import { IComment } from 'app/shared/model/comment.model';
import { CommentService } from './comment.service';
import { ITeam } from 'app/shared/model/team.model';
import { TeamService } from 'app/entities/team';
import { ISkill } from 'app/shared/model/skill.model';
import { SkillService } from 'app/entities/skill';

@Component({
    selector: 'jhi-comment-update',
    templateUrl: './comment-update.component.html'
})
export class CommentUpdateComponent implements OnInit {
    comment: IComment;
    isSaving: boolean;

    teams: ITeam[];

    skills: ISkill[];
    creationDate: string;

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected commentService: CommentService,
        protected teamService: TeamService,
        protected skillService: SkillService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ comment }) => {
            this.comment = comment;
            this.creationDate = this.comment.creationDate != null ? this.comment.creationDate.format(DATE_TIME_FORMAT) : null;
        });
        this.teamService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<ITeam[]>) => mayBeOk.ok),
                map((response: HttpResponse<ITeam[]>) => response.body)
            )
            .subscribe((res: ITeam[]) => (this.teams = res), (res: HttpErrorResponse) => this.onError(res.message));
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
        this.comment.creationDate = this.creationDate != null ? moment(this.creationDate, DATE_TIME_FORMAT) : null;
        if (this.comment.id !== undefined) {
            this.subscribeToSaveResponse(this.commentService.update(this.comment));
        } else {
            this.subscribeToSaveResponse(this.commentService.create(this.comment));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IComment>>) {
        result.subscribe((res: HttpResponse<IComment>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackTeamById(index: number, item: ITeam) {
        return item.id;
    }

    trackSkillById(index: number, item: ISkill) {
        return item.id;
    }
}
