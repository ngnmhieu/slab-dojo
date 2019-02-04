import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { TeamSkill } from 'app/shared/model/team-skill.model';
import { TeamSkillService } from './team-skill.service';
import { TeamSkillComponent } from './team-skill.component';
import { TeamSkillDetailComponent } from './team-skill-detail.component';
import { TeamSkillUpdateComponent } from './team-skill-update.component';
import { TeamSkillDeletePopupComponent } from './team-skill-delete-dialog.component';
import { ITeamSkill } from 'app/shared/model/team-skill.model';

@Injectable({ providedIn: 'root' })
export class TeamSkillResolve implements Resolve<ITeamSkill> {
    constructor(private service: TeamSkillService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ITeamSkill> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<TeamSkill>) => response.ok),
                map((teamSkill: HttpResponse<TeamSkill>) => teamSkill.body)
            );
        }
        return of(new TeamSkill());
    }
}

export const teamSkillRoute: Routes = [
    {
        path: '',
        component: TeamSkillComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'teamdojoApp.teamSkill.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: TeamSkillDetailComponent,
        resolve: {
            teamSkill: TeamSkillResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'teamdojoApp.teamSkill.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: TeamSkillUpdateComponent,
        resolve: {
            teamSkill: TeamSkillResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'teamdojoApp.teamSkill.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: TeamSkillUpdateComponent,
        resolve: {
            teamSkill: TeamSkillResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'teamdojoApp.teamSkill.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const teamSkillPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: TeamSkillDeletePopupComponent,
        resolve: {
            teamSkill: TeamSkillResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'teamdojoApp.teamSkill.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
