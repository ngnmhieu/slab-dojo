import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { TeamdojoSharedModule } from 'app/shared';
import {
    TeamSkillComponent,
    TeamSkillDetailComponent,
    TeamSkillVoteComponent,
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
        TeamSkillVoteComponent,
        TeamSkillUpdateComponent,
        TeamSkillDeleteDialogComponent,
        TeamSkillDeletePopupComponent
    ],
    entryComponents: [
        TeamSkillComponent,
        TeamSkillUpdateComponent,
        TeamSkillVoteComponent,
        TeamSkillDeleteDialogComponent,
        TeamSkillDeletePopupComponent
    ],
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
