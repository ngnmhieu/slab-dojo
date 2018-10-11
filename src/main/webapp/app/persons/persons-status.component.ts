import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { IPerson } from 'app/shared/model/person.model';
import { IDimension } from 'app/shared/model/dimension.model';
import { IBadge } from 'app/shared/model/badge.model';
import { CompletionCheck, RelevanceCheck } from 'app/shared';
import { Router } from '@angular/router';
import { HighestLevel, IHighestLevel } from 'app/shared/achievement';
import { IPersonSkill } from 'app/shared/model/person-skill.model';
import { ISkill } from 'app/shared/model/skill.model';
import { PersonScoreCalculation } from 'app/shared/util/person-score-calculation';
import { OrganizationService } from 'app/entities/organization';

@Component({
    selector: 'jhi-persons-status',
    templateUrl: './persons-status.component.html',
    styleUrls: ['persons-status.scss']
})
export class PersonsStatusComponent implements OnInit, OnChanges {
    @Input() person: IPerson;
    @Input() personSkills: IPersonSkill[];
    @Input() badges: IBadge[];
    @Input() skills: ISkill[];
    completedBadges: IBadge[];
    highestAchievedLevels: IHighestLevel[];
    personScore: number;
    levelUpScore: number;

    constructor(private organizationService: OrganizationService, private router: Router) {}

    ngOnInit(): void {
        this.person.skills = this.personSkills;
        this.organizationService
            .query()
            .take(1)
            .subscribe(res => {
                this.levelUpScore = res && res.body[0] ? res.body[0].levelUpScore : 0;
            });
        this.calculateStatus();
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.person.skills = this.personSkills;
        this.calculateStatus();
    }

    private hasPersonChanged(person: any) {
        return person && person.previousValue && person.previousValue.id !== person.currentValue.id;
    }

    private calculateStatus() {
        this.personScore = PersonScoreCalculation.calcPersonScore(this.person, this.skills, this.badges);
        this.completedBadges = this.getCompletedBadges();
        this.highestAchievedLevels = this.getHighestAchievedLevels();
    }

    selectItem(itemType: string, id: number) {
        this.router.navigate(['persons', this.person.mnemonic], {
            queryParams: { [itemType]: id }
        });
    }

    private getCompletedBadges() {
        return this.badges.filter(
            (badge: IBadge) =>
                new RelevanceCheck(this.person).isRelevantBadge(badge) && new CompletionCheck(this.person, badge, this.skills).isCompleted()
        );
    }

    private isLevelCompleted(level) {
        return new CompletionCheck(this.person, level, this.skills).isCompleted();
    }

    private getHighestAchievedLevels(): IHighestLevel[] {
        const highestAchievedLevels = [];
        this.person.participations.forEach((dimension: IDimension) => {
            let ordinal = 0;
            let achievedLevel;
            for (const level of dimension.levels || []) {
                if (!this.isLevelCompleted(level)) {
                    break;
                }
                achievedLevel = level;
                ordinal++;
            }
            if (achievedLevel) {
                highestAchievedLevels.push(new HighestLevel(dimension, achievedLevel, ordinal));
            }
        });
        return highestAchievedLevels;
    }

    get hasLeveledUp() {
        return this.levelUpScore > 0 && this.personScore >= this.levelUpScore;
    }
}
