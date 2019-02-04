import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TeamdojoSharedModule } from 'app/shared';
import {
    LevelSkillComponent,
    LevelSkillDetailComponent,
    LevelSkillUpdateComponent,
    LevelSkillDeletePopupComponent,
    LevelSkillDeleteDialogComponent,
    levelSkillRoute,
    levelSkillPopupRoute
} from './';

const ENTITY_STATES = [...levelSkillRoute, ...levelSkillPopupRoute];

@NgModule({
    imports: [TeamdojoSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        LevelSkillComponent,
        LevelSkillDetailComponent,
        LevelSkillUpdateComponent,
        LevelSkillDeleteDialogComponent,
        LevelSkillDeletePopupComponent
    ],
    entryComponents: [LevelSkillComponent, LevelSkillUpdateComponent, LevelSkillDeleteDialogComponent, LevelSkillDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TeamdojoLevelSkillModule {}
