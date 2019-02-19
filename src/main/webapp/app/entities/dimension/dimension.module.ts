import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { TeamdojoSharedModule } from 'app/shared';
import {
    DimensionComponent,
    DimensionDetailComponent,
    DimensionUpdateComponent,
    DimensionDeletePopupComponent,
    DimensionDeleteDialogComponent,
    dimensionRoute,
    dimensionPopupRoute
} from './';

const ENTITY_STATES = [...dimensionRoute, ...dimensionPopupRoute];

@NgModule({
    imports: [TeamdojoSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        DimensionComponent,
        DimensionDetailComponent,
        DimensionUpdateComponent,
        DimensionDeleteDialogComponent,
        DimensionDeletePopupComponent
    ],
    entryComponents: [DimensionComponent, DimensionUpdateComponent, DimensionDeleteDialogComponent, DimensionDeletePopupComponent],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TeamdojoDimensionModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
