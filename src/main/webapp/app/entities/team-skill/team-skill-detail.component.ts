import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITeamSkill } from 'app/shared/model/team-skill.model';

@Component({
    selector: 'jhi-team-skill-detail',
    templateUrl: './team-skill-detail.component.html'
})
export class TeamSkillDetailComponent implements OnInit {
    teamSkill: ITeamSkill;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ teamSkill }) => {
            this.teamSkill = teamSkill;
        });
    }

    previousState() {
        window.history.back();
    }
}
