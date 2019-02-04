import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { TeamdojoSharedModule } from 'app/shared';
import {
    BadgeComponent,
    BadgeDetailComponent,
    BadgeUpdateComponent,
    BadgeDeletePopupComponent,
    BadgeDeleteDialogComponent,
    badgeRoute,
    badgePopupRoute
} from './';

const ENTITY_STATES = [...badgeRoute, ...badgePopupRoute];

@NgModule({
    imports: [TeamdojoSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [BadgeComponent, BadgeDetailComponent, BadgeUpdateComponent, BadgeDeleteDialogComponent, BadgeDeletePopupComponent],
    entryComponents: [BadgeComponent, BadgeUpdateComponent, BadgeDeleteDialogComponent, BadgeDeletePopupComponent],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TeamdojoBadgeModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
