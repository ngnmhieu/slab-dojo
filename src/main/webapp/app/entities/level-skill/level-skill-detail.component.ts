import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ILevelSkill } from 'app/shared/model/level-skill.model';

@Component({
    selector: 'jhi-level-skill-detail',
    templateUrl: './level-skill-detail.component.html'
})
export class LevelSkillDetailComponent implements OnInit {
    levelSkill: ILevelSkill;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ levelSkill }) => {
            this.levelSkill = levelSkill;
        });
    }

    previousState() {
        window.history.back();
    }
}
