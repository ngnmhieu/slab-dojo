import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IOrganization } from 'app/shared/model/organization.model';
import { AccountService } from 'app/core';
import { OrganizationService } from './organization.service';

@Component({
    selector: 'jhi-organization',
    templateUrl: './organization.component.html'
})
export class OrganizationComponent implements OnInit, OnDestroy {
    organizations: IOrganization[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected organizationService: OrganizationService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.organizationService
            .query()
            .pipe(
                filter((res: HttpResponse<IOrganization[]>) => res.ok),
                map((res: HttpResponse<IOrganization[]>) => res.body)
            )
            .subscribe(
                (res: IOrganization[]) => {
                    this.organizations = res;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInOrganizations();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IOrganization) {
        return item.id;
    }

    registerChangeInOrganizations() {
        this.eventSubscriber = this.eventManager.subscribe('organizationListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
