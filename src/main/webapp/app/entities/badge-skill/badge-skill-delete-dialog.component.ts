import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IBadgeSkill } from 'app/shared/model/badge-skill.model';
import { BadgeSkillService } from './badge-skill.service';

@Component({
    selector: 'jhi-badge-skill-delete-dialog',
    templateUrl: './badge-skill-delete-dialog.component.html'
})
export class BadgeSkillDeleteDialogComponent {
    badgeSkill: IBadgeSkill;

    constructor(
        protected badgeSkillService: BadgeSkillService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.badgeSkillService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'badgeSkillListModification',
                content: 'Deleted an badgeSkill'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-badge-skill-delete-popup',
    template: ''
})
export class BadgeSkillDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ badgeSkill }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(BadgeSkillDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.badgeSkill = badgeSkill;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/badge-skill', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/badge-skill', { outlets: { popup: null } }]);
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
