import { AchievableSkill, IAchievableSkill } from 'app/shared/model/achievable-skill.model';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ISkill } from 'app/shared/model/skill.model';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { SkillService } from 'app/entities/skill';
import { AccountService } from 'app/core';

const ROLES_ALLOWED_TO_UPDATE = ['ROLE_ADMIN'];

@Component({
    selector: 'jhi-skill-score',
    templateUrl: './skill-score.component.html',
    styleUrls: ['./skill-score.scss']
})
export class SkillScoreComponent {
    @Input() skill: ISkill;
    @Output() onSkillChanged = new EventEmitter<{ iSkill: ISkill; aSkill: AchievableSkill }>();
    isEditingScore = {};

    constructor(private skillService: SkillService, private accountService: AccountService) {}

    updateScore(popover, s: IAchievableSkill) {
        this.skillService.find(s.skillId).subscribe(
            skill => {
                skill.body.score = s.score;
                this.skillService.update(skill.body).subscribe((res: HttpResponse<ISkill>) => {
                    this.onSkillChanged.emit({
                        iSkill: res.body,
                        aSkill: s
                    });
                    popover.close();
                });
            },
            (res: HttpErrorResponse) => {
                console.log(res);
            }
        );
    }

    onPopupEnter(popover, skillId, isEditing) {
        this.isEditingScore[skillId] = isEditing && this.accountService.hasAnyAuthority(ROLES_ALLOWED_TO_UPDATE);
        if (this.isEditingScore[skillId]) {
            popover.close();
        }
        popover.open();
    }

    onPopupLeave(popover, skillId) {
        if (!this.isEditingScore[skillId]) {
            popover.close();
        }
    }
}
