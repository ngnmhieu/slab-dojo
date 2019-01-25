import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Training } from 'app/shared/model/training.model';
import { TrainingService } from './training.service';
import { TrainingComponent } from './training.component';
import { TrainingDetailComponent } from './training-detail.component';
import { TrainingUpdateComponent } from './training-update.component';
import { TrainingDeletePopupComponent } from './training-delete-dialog.component';
import { ITraining } from 'app/shared/model/training.model';

@Injectable({ providedIn: 'root' })
export class TrainingResolve implements Resolve<ITraining> {
    constructor(private service: TrainingService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Training> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Training>) => response.ok),
                map((training: HttpResponse<Training>) => training.body)
            );
        }
        return of(new Training());
    }
}

export const trainingRoute: Routes = [
    {
        path: 'training',
        component: TrainingComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'teamdojoApp.training.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'training/:id/view',
        component: TrainingDetailComponent,
        resolve: {
            training: TrainingResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'teamdojoApp.training.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'training/new',
        component: TrainingUpdateComponent,
        resolve: {
            training: TrainingResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'teamdojoApp.training.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'training/:id/edit',
        component: TrainingUpdateComponent,
        resolve: {
            training: TrainingResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'teamdojoApp.training.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const trainingPopupRoute: Routes = [
    {
        path: 'training/:id/delete',
        component: TrainingDeletePopupComponent,
        resolve: {
            training: TrainingResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'teamdojoApp.training.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
