import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { TeamdojoSharedModule } from 'app/shared';
import {
    LevelComponent,
    LevelDetailComponent,
    LevelUpdateComponent,
    LevelDeletePopupComponent,
    LevelDeleteDialogComponent,
    levelRoute,
    levelPopupRoute
} from './';

const ENTITY_STATES = [...levelRoute, ...levelPopupRoute];

@NgModule({
    imports: [TeamdojoSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [LevelComponent, LevelDetailComponent, LevelUpdateComponent, LevelDeleteDialogComponent, LevelDeletePopupComponent],
    entryComponents: [LevelComponent, LevelUpdateComponent, LevelDeleteDialogComponent, LevelDeletePopupComponent],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TeamdojoLevelModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
