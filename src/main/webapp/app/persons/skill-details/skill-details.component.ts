import { Component, OnInit } from '@angular/core';

import { PersonSkillDetailsComponentParent } from 'app/shared/person-skill-details/skill-details.component';
import { PersonsSkillsService } from 'app/persons/persons-skills.service';
import { ActivatedRoute } from '@angular/router';
import { AchievableSkill, IAchievableSkill } from 'app/shared/model/achievable-skill.model';
import { PersonsSelectionService } from 'app/shared/persons-selection/persons-selection.service';

@Component({
    selector: 'jhi-skill-details',
    templateUrl: './skill-details.component.html',
    styleUrls: ['./skill-details.scss']
})
export class SkillDetailsComponent extends PersonSkillDetailsComponentParent implements OnInit {
    achievableSkill: IAchievableSkill;

    constructor(
        route: ActivatedRoute,
        personsSkillsService: PersonsSkillsService,
        private personsSelectionService: PersonsSelectionService
    ) {
        super(route, personsSkillsService);
    }

    ngOnInit(): void {
        this.route.data.subscribe(({ dojoModel: { persons, badges }, person, skill, skills, comments, selectedPerson }) => {
            this.person = person && person.body ? person.body : person;
            super.setResolvedData({ persons, skill, comments, selectedPerson, badges, skills });
        });
        this.loadData();
    }

    loadData() {
        this.achievableSkill = new AchievableSkill();
        this.achievableSkill.skillId = this.skill.id;
        this.personsSkillsService
            .findAchievableSkill(this.person ? this.person.id : this.selectedPerson.id, this.skill.id)
            .subscribe(skill => {
                this.achievableSkill = skill;
                this.skillComments = super._getSkillComments();
            });
    }

    onSkillInListClicked(skillObjs) {
        this.achievableSkill = skillObjs.aSkill;
        super.onSkillInListClicked(skillObjs);
    }

    onVoteSubmitted(voteObjs) {
        this.onCommentSubmitted(voteObjs.comment);
    }

    get isSamePerson(): boolean {
        const currentPerson = this.personsSelectionService.selectedPerson;
        return currentPerson && this.person && currentPerson.id === this.person.id;
    }
}
