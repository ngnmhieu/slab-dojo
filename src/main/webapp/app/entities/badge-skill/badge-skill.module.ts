import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TeamdojoSharedModule } from 'app/shared';
import {
    BadgeSkillComponent,
    BadgeSkillDetailComponent,
    BadgeSkillUpdateComponent,
    BadgeSkillDeletePopupComponent,
    BadgeSkillDeleteDialogComponent,
    badgeSkillRoute,
    badgeSkillPopupRoute
} from './';

const ENTITY_STATES = [...badgeSkillRoute, ...badgeSkillPopupRoute];

@NgModule({
    imports: [TeamdojoSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        BadgeSkillComponent,
        BadgeSkillDetailComponent,
        BadgeSkillUpdateComponent,
        BadgeSkillDeleteDialogComponent,
        BadgeSkillDeletePopupComponent
    ],
    entryComponents: [BadgeSkillComponent, BadgeSkillUpdateComponent, BadgeSkillDeleteDialogComponent, BadgeSkillDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TeamdojoBadgeSkillModule {}
