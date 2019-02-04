import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { BadgeSkill } from 'app/shared/model/badge-skill.model';
import { BadgeSkillService } from './badge-skill.service';
import { BadgeSkillComponent } from './badge-skill.component';
import { BadgeSkillDetailComponent } from './badge-skill-detail.component';
import { BadgeSkillUpdateComponent } from './badge-skill-update.component';
import { BadgeSkillDeletePopupComponent } from './badge-skill-delete-dialog.component';
import { IBadgeSkill } from 'app/shared/model/badge-skill.model';

@Injectable({ providedIn: 'root' })
export class BadgeSkillResolve implements Resolve<IBadgeSkill> {
    constructor(private service: BadgeSkillService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IBadgeSkill> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<BadgeSkill>) => response.ok),
                map((badgeSkill: HttpResponse<BadgeSkill>) => badgeSkill.body)
            );
        }
        return of(new BadgeSkill());
    }
}

export const badgeSkillRoute: Routes = [
    {
        path: '',
        component: BadgeSkillComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'teamdojoApp.badgeSkill.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: BadgeSkillDetailComponent,
        resolve: {
            badgeSkill: BadgeSkillResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'teamdojoApp.badgeSkill.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: BadgeSkillUpdateComponent,
        resolve: {
            badgeSkill: BadgeSkillResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'teamdojoApp.badgeSkill.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: BadgeSkillUpdateComponent,
        resolve: {
            badgeSkill: BadgeSkillResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'teamdojoApp.badgeSkill.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const badgeSkillPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: BadgeSkillDeletePopupComponent,
        resolve: {
            badgeSkill: BadgeSkillResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'teamdojoApp.badgeSkill.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
