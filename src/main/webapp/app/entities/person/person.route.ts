import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from 'app/core';
import { Person } from 'app/shared/model/person.model';
import { PersonService } from './person.service';
import { PersonComponent } from './person.component';
import { PersonDetailComponent } from './person-detail.component';
import { PersonUpdateComponent } from './person-update.component';
import { PersonDeletePopupComponent } from './person-delete-dialog.component';

@Injectable()
export class PersonResolvePagingParams implements Resolve<any> {
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
export class PersonResolve implements Resolve<any> {
    constructor(private service: PersonService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id);
        }
        return new Person();
    }
}

export const personRoute: Routes = [
    {
        path: 'person',
        component: PersonComponent,
        resolve: {
            pagingParams: PersonResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'teamdojoApp.person.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'person/:id/view',
        component: PersonDetailComponent,
        resolve: {
            person: PersonResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'teamdojoApp.person.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'person/new',
        component: PersonUpdateComponent,
        resolve: {
            person: PersonResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'teamdojoApp.person.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'person/:id/edit',
        component: PersonUpdateComponent,
        resolve: {
            person: PersonResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'teamdojoApp.person.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const personPopupRoute: Routes = [
    {
        path: 'person/:id/delete',
        component: PersonDeletePopupComponent,
        resolve: {
            person: PersonResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'teamdojoApp.person.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
