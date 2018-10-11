import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TeamdojoSharedModule } from 'app/shared';
import { PERSONS_ROUTES, PersonsComponent } from './';
import { PersonsAchievementsComponent } from './persons-achievements.component';
import { PersonsSkillsComponent } from './persons-skills.component';
import { PersonsSelectionComponent } from 'app/shared/persons-selection/persons-selection.component';
import { PersonAndPersonSkillResolve } from './persons.route';
import { PersonsService } from './persons.service';
import { PersonsSkillsService } from './persons-skills.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PersonsAchievementsService } from 'app/persons/persons-achievements.service';
import { SkillDetailsComponent } from 'app/persons/skill-details/skill-details.component';
import { PersonSkillDetailsInfoComponent } from 'app/shared/person-skill-details/skill-details-info.component';
import { PersonSkillDetailsCommentsComponent } from 'app/shared/person-skill-details/skill-details-comments.component';
import { SkillDetailsRatingComponent } from 'app/persons/skill-details/skill-details-rating/skill-details-rating.component';
import { AllCommentsResolve, AllSkillsResolve, DojoModelResolve, SkillResolve } from 'app/shared/common.resolver';

@NgModule({
    imports: [TeamdojoSharedModule, RouterModule.forChild(PERSONS_ROUTES), NgbModule],
    declarations: [
        PersonsComponent,
        PersonsAchievementsComponent,
        PersonsSkillsComponent,
        PersonsSelectionComponent,
        SkillDetailsComponent,
        PersonSkillDetailsInfoComponent,
        PersonSkillDetailsCommentsComponent,
        SkillDetailsRatingComponent
    ],
    entryComponents: [PersonsSelectionComponent],
    providers: [
        DojoModelResolve,
        PersonsService,
        PersonsSkillsService,
        PersonsAchievementsService,
        PersonAndPersonSkillResolve,
        SkillResolve,
        AllSkillsResolve,
        AllCommentsResolve
    ],
    exports: [PersonSkillDetailsInfoComponent, PersonSkillDetailsCommentsComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PersonsModule {}
