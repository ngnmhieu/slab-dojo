import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ILevelSkill } from 'app/shared/model/level-skill.model';
import { LevelSkillService } from './level-skill.service';

@Component({
    selector: 'jhi-level-skill-delete-dialog',
    templateUrl: './level-skill-delete-dialog.component.html'
})
export class LevelSkillDeleteDialogComponent {
    levelSkill: ILevelSkill;

    constructor(
        protected levelSkillService: LevelSkillService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.levelSkillService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'levelSkillListModification',
                content: 'Deleted an levelSkill'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-level-skill-delete-popup',
    template: ''
})
export class LevelSkillDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ levelSkill }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(LevelSkillDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.levelSkill = levelSkill;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/level-skill', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/level-skill', { outlets: { popup: null } }]);
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
