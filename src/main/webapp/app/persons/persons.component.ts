import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { JhiDataUtils } from 'ng-jhipster';
import { ActivatedRoute } from '@angular/router';
import { IPerson } from 'app/shared/model/person.model';
import { sortLevels } from 'app/shared';
import { IBadge } from 'app/shared/model/badge.model';
import { IDimension } from 'app/shared/model/dimension.model';
import { IBadgeSkill } from 'app/shared/model/badge-skill.model';
import { PersonSkillService } from 'app/entities/person-skill';
import { IPersonSkill } from 'app/shared/model/person-skill.model';
import { ISkill } from 'app/shared/model/skill.model';

@Component({
    selector: 'jhi-persons',
    templateUrl: './persons.component.html',
    styleUrls: ['./persons.scss']
})
export class PersonsComponent implements OnInit {
    @Output() changePerson = new EventEmitter<any>();

    person: IPerson;
    personSkills: IPersonSkill[];
    badges: IBadge[];
    skills: ISkill[];

    constructor(private dataUtils: JhiDataUtils, private route: ActivatedRoute, private personSkillService: PersonSkillService) {}

    ngOnInit() {
        this.route.data.subscribe(({ dojoModel: { persons, levels, levelSkills, badges, badgeSkills }, person, skills }) => {
            const personFromRoute = person && person.body ? person.body : person;
            this.person = (persons || []).find(t => t.id === personFromRoute.id) || personFromRoute;
            this.personSkills = person && person.skills ? person.skills : [];
            this.badges = (badges && badges.body ? badges.body : badges) || [];
            this.skills = (skills && skills.body ? skills.body : skills) || [];
        });
        this.changePerson.emit(this.person);
    }

    loadPersonSkills() {
        this.personSkillService.query({ 'personId.equals': this.person.id }).subscribe(personSkillResponse => {
            this.person.skills = this.personSkills = personSkillResponse.body;
        });
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

    previousState() {
        window.history.back();
    }
}
