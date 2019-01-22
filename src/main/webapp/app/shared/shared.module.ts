import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';

import { NgbDateMomentAdapter } from './util/datepicker-adapter';
import { HasAnyAuthorityDirective, JhiLoginModalComponent, TeamdojoSharedCommonModule, TeamdojoSharedLibsModule } from './';
import { BackgroundComponent } from 'app/shared/background/background.component';
import { TeamsStatusComponent } from 'app/teams/teams-status.component';
import { TableFilterComponent } from 'app/shared/table-filter/table-filter.component';
import { TrainingsAddComponent } from 'app/shared/trainings/trainings-add.component';

@NgModule({
    imports: [TeamdojoSharedLibsModule, TeamdojoSharedCommonModule],
    declarations: [
        JhiLoginModalComponent,
        HasAnyAuthorityDirective,
        BackgroundComponent,
        TeamsStatusComponent,
        TableFilterComponent,
        TrainingsAddComponent
    ],
    providers: [{ provide: NgbDateAdapter, useClass: NgbDateMomentAdapter }],
    entryComponents: [JhiLoginModalComponent, TrainingsAddComponent],
    exports: [
        TeamdojoSharedCommonModule,
        JhiLoginModalComponent,
        HasAnyAuthorityDirective,
        BackgroundComponent,
        TeamsStatusComponent,
        TableFilterComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TeamdojoSharedModule {}
