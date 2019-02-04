import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IDimension } from 'app/shared/model/dimension.model';
import { DimensionService } from './dimension.service';
import { ITeam } from 'app/shared/model/team.model';
import { TeamService } from 'app/entities/team';
import { IBadge } from 'app/shared/model/badge.model';
import { BadgeService } from 'app/entities/badge';

@Component({
    selector: 'jhi-dimension-update',
    templateUrl: './dimension-update.component.html'
})
export class DimensionUpdateComponent implements OnInit {
    dimension: IDimension;
    isSaving: boolean;

    teams: ITeam[];

    badges: IBadge[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected dimensionService: DimensionService,
        protected teamService: TeamService,
        protected badgeService: BadgeService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ dimension }) => {
            this.dimension = dimension;
        });
        this.teamService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<ITeam[]>) => mayBeOk.ok),
                map((response: HttpResponse<ITeam[]>) => response.body)
            )
            .subscribe((res: ITeam[]) => (this.teams = res), (res: HttpErrorResponse) => this.onError(res.message));
        this.badgeService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IBadge[]>) => mayBeOk.ok),
                map((response: HttpResponse<IBadge[]>) => response.body)
            )
            .subscribe((res: IBadge[]) => (this.badges = res), (res: HttpErrorResponse) => this.onError(res.message));
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.dimension.id !== undefined) {
            this.subscribeToSaveResponse(this.dimensionService.update(this.dimension));
        } else {
            this.subscribeToSaveResponse(this.dimensionService.create(this.dimension));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IDimension>>) {
        result.subscribe((res: HttpResponse<IDimension>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackBadgeById(index: number, item: IBadge) {
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
