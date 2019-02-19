import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ITeamSkill } from 'app/shared/model/team-skill.model';
import { TeamSkillService } from './team-skill.service';

@Component({
    selector: 'jhi-team-skill-delete-dialog',
    templateUrl: './team-skill-delete-dialog.component.html'
})
export class TeamSkillDeleteDialogComponent {
    teamSkill: ITeamSkill;

    constructor(
        protected teamSkillService: TeamSkillService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.teamSkillService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'teamSkillListModification',
                content: 'Deleted an teamSkill'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-team-skill-delete-popup',
    template: ''
})
export class TeamSkillDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ teamSkill }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(TeamSkillDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.teamSkill = teamSkill;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/team-skill', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/team-skill', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}
