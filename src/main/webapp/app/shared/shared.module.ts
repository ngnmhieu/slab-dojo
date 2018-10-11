import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';

import { NgbDateMomentAdapter } from './util/datepicker-adapter';
import { HasAnyAuthorityDirective, JhiLoginModalComponent, TeamdojoSharedCommonModule, TeamdojoSharedLibsModule } from './';
import { BackgroundComponent } from 'app/shared/background/background.component';
import { TeamsStatusComponent } from 'app/teams/teams-status.component';
import { PersonsStatusComponent } from 'app/persons/persons-status.component';

@NgModule({
    imports: [TeamdojoSharedLibsModule, TeamdojoSharedCommonModule],
    declarations: [JhiLoginModalComponent, HasAnyAuthorityDirective, BackgroundComponent, TeamsStatusComponent, PersonsStatusComponent],
    providers: [{ provide: NgbDateAdapter, useClass: NgbDateMomentAdapter }],
    entryComponents: [JhiLoginModalComponent],
    exports: [
        TeamdojoSharedCommonModule,
        JhiLoginModalComponent,
        HasAnyAuthorityDirective,
        BackgroundComponent,
        TeamsStatusComponent,
        PersonsStatusComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TeamdojoSharedModule {}
