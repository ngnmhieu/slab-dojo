import { Component, Input, OnInit } from '@angular/core';
import { IPerson } from 'app/shared/model/person.model';
import { ILevel } from 'app/shared/model/level.model';
import { IBadge } from 'app/shared/model/badge.model';
import { CompletionCheck } from 'app/shared/util/completion-check';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { RelevanceCheck } from 'app/shared';
import { IDimension } from 'app/shared/model/dimension.model';
import { PersonScore } from 'app/shared/model/person-score.model';
import 'simplebar';
import { ISkill } from 'app/shared/model/skill.model';
import { PersonScoreCalculation } from 'app/shared/util/person-score-calculation';

@Component({
    selector: 'jhi-overview-persons',
    templateUrl: './overview-persons.component.html',
    styleUrls: ['./overview-persons.scss']
})
export class OverviewPersonsComponent implements OnInit {
    @Input() persons: IPerson[];
    @Input() levels: ILevel[];
    @Input() badges: IBadge[];
    @Input() skills: ISkill[];
    private filtered: boolean;
    private relevantPersonIds: number[];
    private completedPersonIds: number[];
    personScores: PersonScore[];

    constructor(private route: ActivatedRoute) {}

    ngOnInit(): void {
        this.personScores = [];
        this.route.queryParamMap.subscribe((params: ParamMap) => {
            const badgeId: number = this.getParamAsNumber('badge', params);
            const levelId: number = this.getParamAsNumber('level', params);
            const dimensionId: number = this.getParamAsNumber('dimension', params);

            this.filtered = !!badgeId || !!levelId || !!dimensionId;
            const relevantPersons = this.getRelevantPersons(badgeId, levelId, dimensionId);
            this.completedPersonIds = this.getCompletedPersonIds(relevantPersons, badgeId, levelId, dimensionId);
            this.relevantPersonIds = this.getRelevantPersonIds(relevantPersons);
        });

        for (const person of this.persons) {
            this.personScores.push(new PersonScore(person, this._calcPersonScore(person)));
        }
        this.personScores = this.personScores.sort((ts1, ts2) => {
            if (ts1.score > ts2.score) {
                return 1;
            }
            if (ts1.score < ts2.score) {
                return -1;
            }
            return 0;
        });
        this.personScores = this.personScores.reverse();
    }

    private getRelevantPersons(badgeId: number, levelId: number, dimensionId: number) {
        return this.persons.filter((person: IPerson) => {
            const relevanceCheck = new RelevanceCheck(person);
            if (badgeId) {
                const badge = this.badges.find((b: IBadge) => b.id === badgeId);
                return relevanceCheck.isRelevantBadge(badge);
            } else if (levelId) {
                const level = this.levels.find((l: ILevel) => l.id === levelId);
                return relevanceCheck.isRelevantLevel(level);
            } else if (dimensionId) {
                return relevanceCheck.isRelevantDimensionId(dimensionId);
            }
            return false;
        });
    }

    private getCompletedPersonIds(relevantPersons, badgeId: number, levelId: number, dimensionId: number) {
        return relevantPersons
            .filter((person: IPerson) => {
                if (badgeId) {
                    const badge = this.badges.find((b: IBadge) => b.id === badgeId);
                    return new CompletionCheck(person, badge, this.skills).isCompleted();
                } else if (levelId) {
                    const level = this.levels.find((l: ILevel) => l.id === levelId);
                    return new CompletionCheck(person, level, this.skills).isCompleted();
                } else if (dimensionId) {
                    const dimensions = person.participations.find((d: IDimension) => d.id === dimensionId);
                    return dimensions.levels.every((level: ILevel) => new CompletionCheck(person, level, this.skills).isCompleted());
                }
                return false;
            })
            .map((person: IPerson) => person.id);
    }

    private getRelevantPersonIds(relevantPersons) {
        return relevantPersons.map((person: IPerson) => person.id);
    }

    showAsComplete(person: IPerson): boolean {
        return this.filtered && this.isRelevant(person) && this.isCompleted(person);
    }

    showAsIncomplete(person: IPerson): boolean {
        return this.filtered && this.isRelevant(person) && !this.isCompleted(person);
    }

    showAsIrrelevant(person: IPerson): boolean {
        return this.filtered && !this.isRelevant(person);
    }

    private isRelevant(person: IPerson): boolean {
        return this.relevantPersonIds.indexOf(person.id) !== -1;
    }

    private isCompleted(person: IPerson): boolean {
        return this.completedPersonIds.indexOf(person.id) !== -1;
    }

    calcTotalCompletedLevel() {
        let totalCompletedLevel = 0;
        for (const person of this.persons) {
            totalCompletedLevel += this.calcCompletedLevel(person);
        }
        return totalCompletedLevel;
    }

    calcTotalCompletedBadges() {
        let totalCompletedBadges = 0;
        for (const person of this.persons) {
            totalCompletedBadges += this.calcCompletedBadges(person);
        }
        return totalCompletedBadges;
    }

    calcTotalPersonScore() {
        let totalPersonScore = 0;
        for (const person of this.persons) {
            totalPersonScore += this._calcPersonScore(person);
        }
        return totalPersonScore;
    }

    getTotalLevelBase() {
        let totalLevelBase = 0;
        this.persons.forEach((person: IPerson) => {
            person.participations.forEach((dimension: IDimension) => {
                totalLevelBase += dimension.levels.length;
            });
        });
        return totalLevelBase;
    }

    calcLevelBase(person: IPerson) {
        const relevantDimensionIds = person.participations.map(d => d.id);
        return this.levels.filter(l => relevantDimensionIds.indexOf(l.dimensionId) !== -1).length;
    }

    calcCompletedLevel(person: IPerson) {
        let count = 0;
        person.participations.forEach(dimension => {
            for (const level of dimension.levels) {
                if (!this.isLevelOrBadgeCompleted(person, level)) {
                    break;
                }
                count++;
            }
        });
        return count;
    }

    calcCompletedBadges(person: IPerson) {
        let count = 0;
        this.badges.forEach(badge => {
            if (this.isLevelOrBadgeCompleted(person, badge)) {
                count++;
            }
        });
        return count;
    }

    private _calcPersonScore(person: IPerson) {
        return PersonScoreCalculation.calcPersonScore(person, this.skills, this.badges);
    }

    private isLevelOrBadgeCompleted(person: IPerson, item: ILevel | IBadge): boolean {
        return new CompletionCheck(person, item, this.skills).isCompleted();
    }

    private getParamAsNumber(name: string, params: ParamMap): number {
        return Number.parseInt(params.get(name));
    }
}
