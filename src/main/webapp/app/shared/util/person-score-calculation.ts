import { IBadge } from 'app/shared/model/badge.model';
import { ILevel } from 'app/shared/model/level.model';
import { IPerson } from 'app/shared/model/person.model';
import { IPersonSkill } from 'app/shared/model/person-skill.model';
import { ISkill } from 'app/shared/model/skill.model';
import { CompletionCheck, RelevanceCheck } from 'app/shared';

export class PersonScoreCalculation {
    static calcPersonScore(person: IPerson, skills: ISkill[], badges: IBadge[]): number {
        let score = this._calcSkillScore(person, skills);
        score += this._calcLevelBonus(person, skills);
        score += this._calcBadgeBonus(person, badges, skills);
        return score;
    }

    private static _calcSkillScore(person: IPerson, skills: ISkill[]): number {
        let score = 0;
        (skills || []).forEach((skill: ISkill) => {
            if (this._isSkillCompleted(person, skill)) {
                score += skill.score;
            }
        });
        return score;
    }

    private static _calcLevelBonus(person: IPerson, skills: ISkill[]): number {
        let score = 0;
        (person.participations || []).forEach(dimension => {
            (dimension.levels || []).forEach((level: ILevel) => {
                score += this._getBonus(person, level, skills);
            });
        });
        return score;
    }

    private static _calcBadgeBonus(person: IPerson, badges: IBadge[], skills: ISkill[]): number {
        let score = 0;
        (badges || []).forEach((badge: IBadge) => {
            if (new RelevanceCheck(person).isRelevantLevelOrBadge(badge)) {
                score += this._getBonus(person, badge, skills);
            }
        });
        return score;
    }

    private static _isSkillCompleted(person: IPerson, skill: ISkill): boolean {
        const personSkill = (person.skills || []).find((ts: IPersonSkill) => ts.skillId === skill.id);
        return !!(personSkill && personSkill.completedAt);
    }

    private static _getBonus(person: IPerson, item: ILevel | IBadge, skills: ISkill[]): number {
        if (!item.instantMultiplier && !item.completionBonus) {
            return 0;
        }
        const levelProgress = new CompletionCheck(person, item, skills).getProgress();
        let score = levelProgress.achieved * item.instantMultiplier;
        if (levelProgress.isCompleted()) {
            score += item.completionBonus;
        }
        return score;
    }
}
