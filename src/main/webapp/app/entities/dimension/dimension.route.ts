import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Dimension } from 'app/shared/model/dimension.model';
import { DimensionService } from './dimension.service';
import { DimensionComponent } from './dimension.component';
import { DimensionDetailComponent } from './dimension-detail.component';
import { DimensionUpdateComponent } from './dimension-update.component';
import { DimensionDeletePopupComponent } from './dimension-delete-dialog.component';
import { IDimension } from 'app/shared/model/dimension.model';

@Injectable({ providedIn: 'root' })
export class DimensionResolve implements Resolve<IDimension> {
    constructor(private service: DimensionService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IDimension> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Dimension>) => response.ok),
                map((dimension: HttpResponse<Dimension>) => dimension.body)
            );
        }
        return of(new Dimension());
    }
}

export const dimensionRoute: Routes = [
    {
        path: '',
        component: DimensionComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'teamdojoApp.dimension.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: DimensionDetailComponent,
        resolve: {
            dimension: DimensionResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'teamdojoApp.dimension.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: DimensionUpdateComponent,
        resolve: {
            dimension: DimensionResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'teamdojoApp.dimension.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: DimensionUpdateComponent,
        resolve: {
            dimension: DimensionResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'teamdojoApp.dimension.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const dimensionPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: DimensionDeletePopupComponent,
        resolve: {
            dimension: DimensionResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'teamdojoApp.dimension.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
