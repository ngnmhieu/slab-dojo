import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from 'app/core';
import { PersonSkill } from 'app/shared/model/person-skill.model';
import { PersonSkillService } from './person-skill.service';
import { PersonSkillComponent } from './person-skill.component';
import { PersonSkillDetailComponent } from './person-skill-detail.component';
import { PersonSkillUpdateComponent } from './person-skill-update.component';
import { PersonSkillDeletePopupComponent } from './person-skill-delete-dialog.component';

@Injectable()
export class PersonSkillResolvePagingParams implements Resolve<any> {
    constructor(private paginationUtil: JhiPaginationUtil) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const page = route.queryParams['page'] ? route.queryParams['page'] : '1';
        const sort = route.queryParams['sort'] ? route.queryParams['sort'] : 'id,asc';
        return {
            page: this.paginationUtil.parsePage(page),
            predicate: this.paginationUtil.parsePredicate(sort),
            ascending: this.paginationUtil.parseAscending(sort)
        };
    }
}

@Injectable()
export class PersonSkillResolve implements Resolve<any> {
    constructor(private service: PersonSkillService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id);
        }
        return new PersonSkill();
    }
}

export const personSkillRoute: Routes = [
    {
        path: 'person-skill',
        component: PersonSkillComponent,
        resolve: {
            pagingParams: PersonSkillResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'teamdojoApp.personSkill.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'person-skill/:id/view',
        component: PersonSkillDetailComponent,
        resolve: {
            personSkill: PersonSkillResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'teamdojoApp.personSkill.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'person-skill/new',
        component: PersonSkillUpdateComponent,
        resolve: {
            personSkill: PersonSkillResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'teamdojoApp.personSkill.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'person-skill/:id/edit',
        component: PersonSkillUpdateComponent,
        resolve: {
            personSkill: PersonSkillResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'teamdojoApp.personSkill.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const personSkillPopupRoute: Routes = [
    {
        path: 'person-skill/:id/delete',
        component: PersonSkillDeletePopupComponent,
        resolve: {
            personSkill: PersonSkillResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'teamdojoApp.personSkill.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
