import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { LevelSkill } from 'app/shared/model/level-skill.model';
import { LevelSkillService } from './level-skill.service';
import { LevelSkillComponent } from './level-skill.component';
import { LevelSkillDetailComponent } from './level-skill-detail.component';
import { LevelSkillUpdateComponent } from './level-skill-update.component';
import { LevelSkillDeletePopupComponent } from './level-skill-delete-dialog.component';
import { ILevelSkill } from 'app/shared/model/level-skill.model';

@Injectable({ providedIn: 'root' })
export class LevelSkillResolve implements Resolve<ILevelSkill> {
    constructor(private service: LevelSkillService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ILevelSkill> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<LevelSkill>) => response.ok),
                map((levelSkill: HttpResponse<LevelSkill>) => levelSkill.body)
            );
        }
        return of(new LevelSkill());
    }
}

export const levelSkillRoute: Routes = [
    {
        path: '',
        component: LevelSkillComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'teamdojoApp.levelSkill.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: LevelSkillDetailComponent,
        resolve: {
            levelSkill: LevelSkillResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'teamdojoApp.levelSkill.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: LevelSkillUpdateComponent,
        resolve: {
            levelSkill: LevelSkillResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'teamdojoApp.levelSkill.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: LevelSkillUpdateComponent,
        resolve: {
            levelSkill: LevelSkillResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'teamdojoApp.levelSkill.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const levelSkillPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: LevelSkillDeletePopupComponent,
        resolve: {
            levelSkill: LevelSkillResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'teamdojoApp.levelSkill.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
