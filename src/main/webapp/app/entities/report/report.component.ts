import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IReport } from 'app/shared/model/report.model';
import { AccountService } from 'app/core';
import { ReportService } from './report.service';

@Component({
    selector: 'jhi-report',
    templateUrl: './report.component.html'
})
export class ReportComponent implements OnInit, OnDestroy {
    reports: IReport[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected reportService: ReportService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.reportService
            .query()
            .pipe(
                filter((res: HttpResponse<IReport[]>) => res.ok),
                map((res: HttpResponse<IReport[]>) => res.body)
            )
            .subscribe(
                (res: IReport[]) => {
                    this.reports = res;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInReports();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IReport) {
        return item.id;
    }

    registerChangeInReports() {
        this.eventSubscriber = this.eventManager.subscribe('reportListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
