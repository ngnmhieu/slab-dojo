import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

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
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TeamdojoBadgeSkillModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
