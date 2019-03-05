import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITeamSkill } from 'app/shared/model/team-skill.model';
import { TeamSkillService } from 'app/entities/team-skill/team-skill.service';
import { OrganizationService } from 'app/entities/organization';

@Component({
    selector: 'jhi-team-skill-vote',
    templateUrl: './team-skill-vote.component.html'
})
export class TeamSkillVoteComponent implements OnInit {
    teamSkill: ITeamSkill;
    upvoteDisabled: boolean;
    downvoteDisabled: boolean;

    constructor(
        private route: ActivatedRoute,
        private teamSkillService: TeamSkillService,
        private organizationService: OrganizationService
    ) {}

    ngOnInit() {
        this.route.data.subscribe(({ teamSkill }) => {
            this.teamSkill = teamSkill.body ? teamSkill.body : teamSkill;
            this.upvoteDisabled = true;
            this.downvoteDisabled = true;
            const countOfConfirmations = this.organizationService.getCurrentCountOfConfirmations();

            if (countOfConfirmations > 0 && this.teamSkill.completedAt && !this.teamSkill.verifiedAt) {
                if (0 <= this.teamSkill.vote && this.teamSkill.vote < countOfConfirmations) {
                    this.upvoteDisabled = false;
                }
                if (0 < this.teamSkill.vote && this.teamSkill.vote <= countOfConfirmations) {
                    this.downvoteDisabled = false;
                }
            }
        });
    }

    upVote() {
        this.teamSkill.vote = this.teamSkill.vote + 1;
        this.teamSkillService.update(this.teamSkill).subscribe(response => (this.teamSkill = response.body));
    }

    downVote() {
        this.teamSkill.vote = this.teamSkill.vote - 1;
        this.teamSkillService.update(this.teamSkill).subscribe(response => (this.teamSkill = response.body));
    }
}
