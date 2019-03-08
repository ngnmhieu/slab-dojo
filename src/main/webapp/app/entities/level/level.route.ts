import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Level } from 'app/shared/model/level.model';
import { LevelService } from './level.service';
import { LevelComponent } from './level.component';
import { LevelDetailComponent } from './level-detail.component';
import { LevelUpdateComponent } from './level-update.component';
import { LevelDeletePopupComponent } from './level-delete-dialog.component';
import { ILevel } from 'app/shared/model/level.model';

@Injectable({ providedIn: 'root' })
export class LevelResolve implements Resolve<ILevel> {
    constructor(private service: LevelService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ILevel> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Level>) => response.ok),
                map((level: HttpResponse<Level>) => level.body)
            );
        }
        return of(new Level());
    }
}

export const levelRoute: Routes = [
    {
        path: '',
        component: LevelComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'teamdojoApp.level.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: LevelDetailComponent,
        resolve: {
            level: LevelResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'teamdojoApp.level.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: LevelUpdateComponent,
        resolve: {
            level: LevelResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'teamdojoApp.level.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: LevelUpdateComponent,
        resolve: {
            level: LevelResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'teamdojoApp.level.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const levelPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: LevelDeletePopupComponent,
        resolve: {
            level: LevelResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'teamdojoApp.level.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
