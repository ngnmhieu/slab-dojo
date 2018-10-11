import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ISkill } from 'app/shared/model/skill.model';
import { SkillService } from 'app/entities/skill';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ISkillRate, SkillRate } from 'app/shared/model/skill-rate.model';
import { Comment, IComment } from 'app/shared/model/comment.model';
import { HttpResponse } from '@angular/common/http';
import { IPerson } from 'app/shared/model/person.model';
import * as moment from 'moment';
import { CommentService } from 'app/entities/comment';
import { PersonsSelectionService } from 'app/shared/persons-selection/persons-selection.service';

@Component({
    selector: 'jhi-star-rating',
    templateUrl: './skill-details-rating.component.html',
    styleUrls: ['./skill-details-rating.scss']
})
export class SkillDetailsRatingComponent implements OnInit {
    @Input() skill: ISkill;
    @Output() onVoteSubmitted = new EventEmitter<ISkillRate>();
    @Output() onCommentSubmitted = new EventEmitter<IComment>();

    rateScore;
    rateCount;
    comment: string;
    private modalRef;
    private newComment: IComment;

    constructor(
        private skillService: SkillService,
        private modalService: NgbModal,
        private commentService: CommentService,
        private personsSelectionService: PersonsSelectionService
    ) {}

    ngOnInit(): void {
        this.onSkillChanged(this.skill);
        this.newComment = new Comment();
    }

    onSkillChanged(skill: ISkill) {
        this.skill = skill;
        this.rateScore = this.skill.rateScore;
        this.rateCount = this.skill.rateCount !== null && typeof this.skill.rateCount !== 'undefined' ? this.skill.rateCount : 0;
    }

    isActivePerson(): Boolean {
        return this.personsSelectionService.selectedPerson !== null && typeof this.personsSelectionService.selectedPerson !== 'undefined';
    }

    voteSkill() {
        const rate = new SkillRate(this.skill.id, this.rateScore);
        this.skillService.createVote(rate).subscribe((res: HttpResponse<ISkill>) => {
            if (res.body) {
                this.skill = res.body;
                this.rateScore = this.skill.rateScore;
                this.rateCount = this.skill.rateCount;
                this.onVoteSubmitted.emit({ skillId: this.skill.id, rateCount: this.rateCount, rateScore: this.rateScore });
            }
        });

        this.newComment.text = this.rateScore + ' ★ - ' + this.comment;
        this.submitComment();
        this.comment = '';
        this.modalRef.close();
    }

    submitComment() {
        const person = this.personsSelectionService.selectedPerson;
        this.newComment.creationDate = moment();
        this.newComment.skillId = this.skill ? this.skill.id : undefined;
        this.newComment.skillTitle = this.skill ? this.skill.title : undefined;
        this.commentService.create(this.newComment).subscribe((res: HttpResponse<IComment>) => {
            if (res.body) {
                this.newComment = new Comment();
                this.onCommentSubmitted.emit(res.body);
            }
        });
    }

    open(content) {
        if (this.isActivePerson()) {
            this.modalRef = this.modalService.open(content);
        }
    }
}
