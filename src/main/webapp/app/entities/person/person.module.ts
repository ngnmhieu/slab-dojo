import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TeamdojoSharedModule } from 'app/shared';
import {
    PersonComponent,
    PersonDeleteDialogComponent,
    PersonDeletePopupComponent,
    PersonDetailComponent,
    personPopupRoute,
    PersonResolve,
    PersonResolvePagingParams,
    personRoute,
    PersonService,
    PersonUpdateComponent
} from './';

const ENTITY_STATES = [...personRoute, ...personPopupRoute];

@NgModule({
    imports: [TeamdojoSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [PersonComponent, PersonDetailComponent, PersonUpdateComponent, PersonDeleteDialogComponent, PersonDeletePopupComponent],
    entryComponents: [PersonComponent, PersonUpdateComponent, PersonDeleteDialogComponent, PersonDeletePopupComponent],
    providers: [PersonService, PersonResolve, PersonResolvePagingParams],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TeamdojoPersonModule {}
