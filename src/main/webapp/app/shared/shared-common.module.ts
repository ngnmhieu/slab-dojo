import { NgModule } from '@angular/core';

import { FindLanguageFromKeyPipe, JhiAlertComponent, JhiAlertErrorComponent, TeamdojoSharedLibsModule } from './';
import { ImageUrlPipe } from './pipe/image-url.pipe';
import { TruncateStringPipe } from './pipe/truncate-string.pipe';
import { AchievementItemComponent } from 'app/shared/achievement';
import { TeamImageComponent } from 'app/shared/team-image/team-image.component';
import { PersonImageComponent } from 'app/shared/person-image/person-image.component';
import { NotificationItemComponent, NotificationMenuComponent } from 'app/shared/notification';
import { SkillFilterPipe } from 'app/shared/pipe/skill-filter.pipe';
import { TeamsSelectionResolve } from 'app/shared/teams-selection/teams-selection.resolve';
import { TeamsSelectionService } from 'app/shared/teams-selection/teams-selection.service';
import { PersonsSelectionResolve } from 'app/shared/persons-selection/persons-selection.resolve';
import { PersonsSelectionService } from 'app/shared/persons-selection/persons-selection.service';

@NgModule({
    imports: [TeamdojoSharedLibsModule],
    declarations: [
        FindLanguageFromKeyPipe,
        JhiAlertComponent,
        JhiAlertErrorComponent,
        SkillFilterPipe,
        ImageUrlPipe,
        TruncateStringPipe,
        AchievementItemComponent,
        TeamImageComponent,
        PersonImageComponent,
        NotificationMenuComponent,
        NotificationItemComponent
    ],
    providers: [TeamsSelectionService, TeamsSelectionResolve, PersonsSelectionResolve, PersonsSelectionService],
    exports: [
        TeamdojoSharedLibsModule,
        FindLanguageFromKeyPipe,
        JhiAlertComponent,
        JhiAlertErrorComponent,
        SkillFilterPipe,
        ImageUrlPipe,
        TruncateStringPipe,
        AchievementItemComponent,
        TeamImageComponent,
        PersonImageComponent,
        NotificationMenuComponent,
        NotificationItemComponent
    ]
})
export class TeamdojoSharedCommonModule {}
