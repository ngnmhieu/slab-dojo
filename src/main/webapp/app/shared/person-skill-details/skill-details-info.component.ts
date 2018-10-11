import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IPerson } from 'app/shared/model/person.model';
import { ISkill } from 'app/shared/model/skill.model';
import { IBadge } from 'app/shared/model/badge.model';
import { ILevel } from 'app/shared/model/level.model';
import * as moment from 'moment';
import { HttpResponse } from '@angular/common/http';
import { IAchievableSkill } from 'app/shared/model/achievable-skill.model';
import { PersonsSelectionService } from 'app/shared/persons-selection/persons-selection.service';
import { ISkillRate } from 'app/shared/model/skill-rate.model';
import { IComment } from 'app/shared/model/comment.model';
import { SkillDetailsRatingComponent } from 'app/persons/skill-details/skill-details-rating/skill-details-rating.component';
import { IBadgeSkill } from 'app/shared/model/badge-skill.model';
import { ILevelSkill } from 'app/shared/model/level-skill.model';
import { IPersonSkill } from 'app/shared/model/person-skill.model';
import { PersonSkillService } from 'app/entities/person-skill';

@Component({
    selector: 'jhi-person-skill-details-info',
    templateUrl: './skill-details-info.component.html',
    styleUrls: ['./skill-details-info.scss']
})
export class PersonSkillDetailsInfoComponent implements OnInit {
    @Input() person: IPerson;

    @Input() skill: ISkill;

    @Input() achievableSkill: IAchievableSkill;

    @Output() onSkillChanged = new EventEmitter<IAchievableSkill>();

    @Output() onVoteSubmitted = new EventEmitter<ISkillRate>();

    @Output() onCommentSubmitted = new EventEmitter<IComment>();

    @ViewChild(SkillDetailsRatingComponent) skillRating;

    achievedByPersons: IPerson[] = [];

    neededForLevels: ILevel[] = [];

    neededForBadges: IBadge[] = [];

    private _levels: ILevel[] = [];
    private _badges: IBadge[] = [];
    private _persons: IPerson[] = [];
    private _levelSkills: ILevelSkill[] = [];
    private _badgeSkills: IBadgeSkill[] = [];
    private _personSkills: IPersonSkill[] = [];

    constructor(
        private route: ActivatedRoute,
        private personSkillsService: PersonSkillService,
        private personsSelectionService: PersonsSelectionService
    ) {}

    ngOnInit(): void {
        this.route.data.subscribe(({ dojoModel: { persons, personSkills, levels, badges, levelSkills, badgeSkills } }) => {
            this._levels = (levels && levels.body ? levels.body : levels) || [];
            this._badges = (badges && badges.body ? badges.body : badges) || [];
            this._persons = (persons && persons.body ? persons.body : persons) || [];
            this._levelSkills = (levelSkills && levelSkills.body ? levelSkills.body : levelSkills) || [];
            this._badgeSkills = (badgeSkills && badgeSkills.body ? badgeSkills.body : badgeSkills) || [];
            this._personSkills = (personSkills && personSkills.body ? personSkills.body : personSkills) || [];
            this.loadData();
        });
    }

    loadData() {
        this.achievedByPersons = this._persons.filter((person: IPerson) =>
            this._personSkills.some(
                (personSkill: IPersonSkill) =>
                    person.id === personSkill.personId && personSkill.skillId === this.skill.id && !!personSkill.completedAt
            )
        );
        this.neededForLevels = this._levels.filter((level: ILevel) =>
            this._levelSkills.some((levelSkill: ILevelSkill) => level.id === levelSkill.levelId && levelSkill.skillId === this.skill.id)
        );
        this.neededForBadges = this._badges.filter((badge: IBadge) =>
            this._badgeSkills.some((badgeSkill: IBadgeSkill) => badge.id === badgeSkill.badgeId && badgeSkill.skillId === this.skill.id)
        );
    }

    onVoteSubmittedFromChild(vote: ISkillRate) {
        this.onVoteSubmitted.emit(vote);
        this.onSkillChanged.emit(this.achievableSkill);
    }

    onCommentSubmittedFromChild(comment: IComment) {
        this.onCommentSubmitted.emit(comment);
    }

    onSkillInListChanged(skillObjs) {
        this.achievableSkill = skillObjs.aSkill;
        this.skill = skillObjs.iSkill;
        this.skillRating.onSkillChanged(skillObjs.iSkill);
        this.personSkillsService.query().subscribe((res: HttpResponse<IPersonSkill[]>) => {
            this._personSkills = res.body || [];
            this.loadData();
        });
    }

    onSkillInListClicked(skillObjs) {
        this.achievableSkill = skillObjs.aSkill;
        this.skill = skillObjs.iSkill;
        this.loadData();
        this.skillRating.onSkillChanged(skillObjs.iSkill);
    }

    onToggleSkill(isActivated: boolean) {
        this.achievableSkill.achievedAt = isActivated ? moment() : null;
        this.onSkillChanged.emit(this.achievableSkill);
    }

    onToggleIrrelevance(irrelevant: boolean) {
        if (irrelevant) {
            this.achievableSkill.achievedAt = null;
        }
        this.achievableSkill.irrelevant = irrelevant;
        this.onSkillChanged.emit(this.achievableSkill);
    }

    updateSkillRating(skill: ISkill) {
        this.skillRating.onSkillChanged(skill);
    }

    get isSkillAchieved() {
        return this.achievableSkill && !!this.achievableSkill.achievedAt;
    }

    isSamePersonSelected() {
        const selectedPerson = this.personsSelectionService.selectedPerson;
        return selectedPerson && this.person && selectedPerson.id === this.person.id;
    }
}
