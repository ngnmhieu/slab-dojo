import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TeamdojoSharedModule } from 'app/shared';
import {
    PersonSkillComponent,
    PersonSkillDeleteDialogComponent,
    PersonSkillDeletePopupComponent,
    PersonSkillDetailComponent,
    personSkillPopupRoute,
    PersonSkillResolve,
    PersonSkillResolvePagingParams,
    personSkillRoute,
    PersonSkillService,
    PersonSkillUpdateComponent
} from './';

const ENTITY_STATES = [...personSkillRoute, ...personSkillPopupRoute];

@NgModule({
    imports: [TeamdojoSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        PersonSkillComponent,
        PersonSkillDetailComponent,
        PersonSkillUpdateComponent,
        PersonSkillDeleteDialogComponent,
        PersonSkillDeletePopupComponent
    ],
    entryComponents: [PersonSkillComponent, PersonSkillUpdateComponent, PersonSkillDeleteDialogComponent, PersonSkillDeletePopupComponent],
    providers: [PersonSkillService, PersonSkillResolve, PersonSkillResolvePagingParams],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TeamdojoPersonSkillModule {}
