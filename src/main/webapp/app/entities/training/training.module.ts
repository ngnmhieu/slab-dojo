import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TeamdojoSharedModule } from 'app/shared';
import {
    TrainingService,
    TrainingComponent,
    TrainingDetailComponent,
    TrainingUpdateComponent,
    TrainingDeletePopupComponent,
    TrainingDeleteDialogComponent,
    trainingRoute,
    trainingPopupRoute,
    TrainingResolve
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
    providers: [TrainingService, TrainingResolve],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TeamdojoTrainingModule {}
