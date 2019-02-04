import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { TeamdojoSharedModule } from 'app/shared';
import {
    TeamSkillComponent,
    TeamSkillDetailComponent,
    TeamSkillUpdateComponent,
    TeamSkillDeletePopupComponent,
    TeamSkillDeleteDialogComponent,
    teamSkillRoute,
    teamSkillPopupRoute
} from './';

const ENTITY_STATES = [...teamSkillRoute, ...teamSkillPopupRoute];

@NgModule({
    imports: [TeamdojoSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        TeamSkillComponent,
        TeamSkillDetailComponent,
        TeamSkillUpdateComponent,
        TeamSkillDeleteDialogComponent,
        TeamSkillDeletePopupComponent
    ],
    entryComponents: [TeamSkillComponent, TeamSkillUpdateComponent, TeamSkillDeleteDialogComponent, TeamSkillDeletePopupComponent],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TeamdojoTeamSkillModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
