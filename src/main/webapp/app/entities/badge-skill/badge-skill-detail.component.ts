import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IBadgeSkill } from 'app/shared/model/badge-skill.model';

@Component({
    selector: 'jhi-badge-skill-detail',
    templateUrl: './badge-skill-detail.component.html'
})
export class BadgeSkillDetailComponent implements OnInit {
    badgeSkill: IBadgeSkill;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ badgeSkill }) => {
            this.badgeSkill = badgeSkill;
        });
    }

    previousState() {
        window.history.back();
    }
}
