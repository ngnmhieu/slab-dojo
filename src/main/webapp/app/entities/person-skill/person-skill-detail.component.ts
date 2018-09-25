import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPersonSkill } from 'app/shared/model/person-skill.model';

@Component({
    selector: 'jhi-person-skill-detail',
    templateUrl: './person-skill-detail.component.html'
})
export class PersonSkillDetailComponent implements OnInit {
    personSkill: IPersonSkill;

    constructor(private route: ActivatedRoute) {}

    ngOnInit() {
        this.route.data.subscribe(({ personSkill }) => {
            this.personSkill = personSkill.body ? personSkill.body : personSkill;
        });
    }

    previousState() {
        window.history.back();
    }
}
