import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'dimension',
                loadChildren: './dimension/dimension.module#TeamdojoDimensionModule'
            },
            {
                path: 'skill',
                loadChildren: './skill/skill.module#TeamdojoSkillModule'
            },
            {
                path: 'team',
                loadChildren: './team/team.module#TeamdojoTeamModule'
            },
            {
                path: 'team-skill',
                loadChildren: './team-skill/team-skill.module#TeamdojoTeamSkillModule'
            },
            {
                path: 'level',
                loadChildren: './level/level.module#TeamdojoLevelModule'
            },
            {
                path: 'badge',
                loadChildren: './badge/badge.module#TeamdojoBadgeModule'
            },
            {
                path: 'badge-skill',
                loadChildren: './badge-skill/badge-skill.module#TeamdojoBadgeSkillModule'
            },
            {
                path: 'level-skill',
                loadChildren: './level-skill/level-skill.module#TeamdojoLevelSkillModule'
            },
            {
                path: 'organization',
                loadChildren: './organization/organization.module#TeamdojoOrganizationModule'
            },
            {
                path: 'report',
                loadChildren: './report/report.module#TeamdojoReportModule'
            },
            {
                path: 'comment',
                loadChildren: './comment/comment.module#TeamdojoCommentModule'
            },
            {
                path: 'activity',
                loadChildren: './activity/activity.module#TeamdojoActivityModule'
            },
            {
                path: 'image',
                loadChildren: './image/image.module#TeamdojoImageModule'
            },
            {
                path: 'training',
                loadChildren: './training/training.module#TeamdojoTrainingModule'
            },
            {
                path: 'organization',
                loadChildren: './organization/organization.module#TeamdojoOrganizationModule'
            }
            /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
        ])
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TeamdojoEntityModule {}
