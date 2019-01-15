import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TeamdojoSharedModule } from 'app/shared';
import {
    SkillService,
    SkillComponent,
    SkillDetailComponent,
    SkillUpdateComponent,
    SkillDeletePopupComponent,
    SkillDeleteDialogComponent,
    skillRoute,
    skillPopupRoute,
    SkillResolve
} from './';

import { TableFilterComponent } from 'app/shared/table-filter/table-filter.component';

const ENTITY_STATES = [...skillRoute, ...skillPopupRoute];

@NgModule({
    imports: [TeamdojoSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        SkillComponent,
        SkillDetailComponent,
        SkillUpdateComponent,
        SkillDeleteDialogComponent,
        SkillDeletePopupComponent,
        TableFilterComponent
    ],
    entryComponents: [SkillComponent, SkillUpdateComponent, SkillDeleteDialogComponent, SkillDeletePopupComponent],
    providers: [SkillService, SkillResolve],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TeamdojoSkillModule {}
