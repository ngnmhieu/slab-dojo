import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

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
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TeamdojoTrainingModule {}
