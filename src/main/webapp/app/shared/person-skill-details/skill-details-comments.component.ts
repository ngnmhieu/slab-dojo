import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IPerson } from 'app/shared/model/person.model';
import { PersonsSelectionService } from 'app/shared/persons-selection/persons-selection.service';
import { Comment, IComment } from 'app/shared/model/comment.model';
import { HttpResponse } from '@angular/common/http';
import * as moment from 'moment';
import { CommentService } from 'app/entities/comment';
import { ISkill } from 'app/shared/model/skill.model';
import 'simplebar';

@Component({
    selector: 'jhi-skill-details-comments',
    templateUrl: './skill-details-comments.component.html',
    styleUrls: ['./skill-details-comments.scss']
})
export class PersonSkillDetailsCommentsComponent implements OnInit {
    @Input() selectedPerson: IPerson;
    @Input() persons: IPerson[];
    @Input() skill: ISkill;
    @Input() comments: IComment[];
    @Output() onCommentSubmitted = new EventEmitter<IComment>();
    newComment: IComment;

    constructor(private commentService: CommentService) {}

    ngOnInit() {
        this.newComment = new Comment();
    }

    isActivePerson(comment: IComment) {
        return this.selectedPerson && comment && this.selectedPerson.id === comment.personId;
    }

    onSubmit() {
        this.newComment.creationDate = moment();
        this.newComment.skillId = this.skill ? this.skill.id : undefined;
        this.newComment.skillTitle = this.skill ? this.skill.title : undefined;
        this.newComment.personId = this.selectedPerson ? this.selectedPerson.id : undefined;
        this.newComment.personMnemonic = this.selectedPerson ? this.selectedPerson.mnemonic : undefined;
        this.commentService.create(this.newComment).subscribe((res: HttpResponse<IComment>) => {
            if (res.body) {
                this.newComment = new Comment();
                this.onCommentSubmitted.emit(res.body);
            }
        });
    }
}
