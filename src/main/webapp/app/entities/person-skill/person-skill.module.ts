import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TeamdojoSharedModule } from 'app/shared';
import {
    PersonSkillService,
    PersonSkillComponent,
    PersonSkillDetailComponent,
    PersonSkillUpdateComponent,
    PersonSkillDeletePopupComponent,
    PersonSkillDeleteDialogComponent,
    personSkillRoute,
    personSkillPopupRoute,
    PersonSkillResolve,
    PersonSkillResolvePagingParams
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
