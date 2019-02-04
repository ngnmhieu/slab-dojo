import { NgModule } from '@angular/core';

import { FindLanguageFromKeyPipe, JhiAlertComponent, JhiAlertErrorComponent, TeamdojoSharedLibsModule } from './';
import { ImageUrlPipe } from './pipe/image-url.pipe';
import { TruncateStringPipe } from './pipe/truncate-string.pipe';
import { AchievementItemComponent } from 'app/shared/achievement';
import { TeamImageComponent } from 'app/shared/team-image/team-image.component';
import { NotificationItemComponent, NotificationMenuComponent } from 'app/shared/notification';
import { SkillFilterPipe } from 'app/shared/pipe/skill-filter.pipe';
import { SkillSortPipe } from 'app/shared/pipe/skill-sort.pipe';
import { TeamsSelectionResolve } from 'app/shared/teams-selection/teams-selection.resolve';
import { TeamsSelectionService } from 'app/shared/teams-selection/teams-selection.service';
import { DojoTranslateDirective } from 'app/shared/language/dojoTranslate.directive';

@NgModule({
    imports: [TeamdojoSharedLibsModule],
    declarations: [
        FindLanguageFromKeyPipe,
        JhiAlertComponent,
        JhiAlertErrorComponent,
        SkillFilterPipe,
        SkillSortPipe,
        DojoTranslateDirective,
        ImageUrlPipe,
        TruncateStringPipe,
        AchievementItemComponent,
        TeamImageComponent,
        NotificationMenuComponent,
        NotificationItemComponent
    ],
    providers: [TeamsSelectionService, TeamsSelectionResolve],
    exports: [
        TeamdojoSharedLibsModule,
        FindLanguageFromKeyPipe,
        JhiAlertComponent,
        JhiAlertErrorComponent,
        SkillFilterPipe,
        DojoTranslateDirective,
        SkillSortPipe,
        ImageUrlPipe,
        TruncateStringPipe,
        AchievementItemComponent,
        TeamImageComponent,
        NotificationMenuComponent,
        NotificationItemComponent
    ]
})
export class TeamdojoSharedCommonModule {}
