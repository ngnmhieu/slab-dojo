import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ITeam } from 'app/shared/model/team.model';
import { AccountService } from 'app/core';
import { TeamService } from './team.service';

@Component({
    selector: 'jhi-team',
    templateUrl: './team.component.html'
})
export class TeamComponent implements OnInit, OnDestroy {
    teams: ITeam[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected teamService: TeamService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.teamService.query().subscribe(
            (res: HttpResponse<ITeam[]>) => {
                this.teams = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInTeams();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ITeam) {
        return item.id;
    }

    registerChangeInTeams() {
        this.eventSubscriber = this.eventManager.subscribe('teamListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
