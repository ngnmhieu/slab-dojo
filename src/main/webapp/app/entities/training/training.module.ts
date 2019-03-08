import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { TeamdojoSharedModule } from 'app/shared';
import {
    TrainingComponent,
    TrainingDetailComponent,
    TrainingUpdateComponent,
    TrainingDeletePopupComponent,
    TrainingDeleteDialogComponent,
    trainingRoute,
    trainingPopupRoute
} from './';

const ENTITY_STATES = [...trainingRoute, ...trainingPopupRoute];

@NgModule({
    imports: [TeamdojoSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        TrainingComponent,
        TrainingDetailComponent,
        TrainingUpdateComponent,
        TrainingDeleteDialogComponent,
        TrainingDeletePopupComponent
    ],
    entryComponents: [TrainingComponent, TrainingUpdateComponent, TrainingDeleteDialogComponent, TrainingDeletePopupComponent],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TeamdojoTrainingModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
