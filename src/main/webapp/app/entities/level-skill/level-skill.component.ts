import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';

import { ILevelSkill } from 'app/shared/model/level-skill.model';
import { AccountService } from 'app/core';

import { ITEMS_PER_PAGE } from 'app/shared';
import { LevelSkillService } from './level-skill.service';
import { FilterQuery } from 'app/shared/table-filter/table-filter.component';

@Component({
    selector: 'jhi-level-skill',
    templateUrl: './level-skill.component.html'
})
export class LevelSkillComponent implements OnInit, OnDestroy {
    levelSkills: ILevelSkill[];
    currentAccount: any;
    eventSubscriber: Subscription;
    itemsPerPage: number;
    links: any;
    page: any;
    predicate: any;
    reverse: any;
    totalItems: number;

    private filters: FilterQuery[] = [];
    filteredLevelSkills: ILevelSkill[] = [];

    constructor(
        protected levelSkillService: LevelSkillService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected parseLinks: JhiParseLinks,
        protected accountService: AccountService
    ) {
        this.levelSkills = [];
        this.itemsPerPage = ITEMS_PER_PAGE;
        this.page = 0;
        this.links = {
            last: 0
        };
        this.predicate = 'id';
        this.reverse = true;
    }

    loadAll() {
        this.levelSkillService
            .query({
                sort: this.sort()
            })
            .subscribe(
                (res: HttpResponse<ILevelSkill[]>) => {
                    this.paginateLevelSkills(res.body, res.headers);
                    this.applyFilter();
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    applyFilter(query: FilterQuery[] = this.filters) {
        this.filters = query;

        this.filteredLevelSkills = this.levelSkills;
        for (const filter of this.filters) {
            this.filteredLevelSkills = this.filteredLevelSkills.filter(ls => {
                const fieldVal = (ls[filter.fieldName] + '').toLowerCase().trim();
                const queryVal = filter.query.toLowerCase().trim();
                switch (filter.operator) {
                    case 'contains':
                        return fieldVal.includes(queryVal);
                    case 'equals':
                        return fieldVal === queryVal;
                    default:
                        return false;
                }
            });
        }
    }

    reset() {
        this.page = 0;
        this.levelSkills = [];
        this.loadAll();
    }

    loadPage(page) {
        this.page = page;
        this.loadAll();
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInLevelSkills();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ILevelSkill) {
        return item.id;
    }

    registerChangeInLevelSkills() {
        this.eventSubscriber = this.eventManager.subscribe('levelSkillListModification', response => this.reset());
    }

    sort() {
        const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
        if (this.predicate !== 'id') {
            result.push('id');
        }
        return result;
    }

    private paginateLevelSkills(data: ILevelSkill[], headers: HttpHeaders) {
        this.links = this.parseLinks.parse(headers.get('link'));
        this.totalItems = parseInt(headers.get('X-Total-Count'), 10);
        for (let i = 0; i < data.length; i++) {
            this.levelSkills.push(data[i]);
        }
    }

    private onError(errorMessage: string) {
        console.error(errorMessage);
    }
}
