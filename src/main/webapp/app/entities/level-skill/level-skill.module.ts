import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

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
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TeamdojoLevelSkillModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
