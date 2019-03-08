import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ILevel } from 'app/shared/model/level.model';
import { LevelService } from './level.service';

@Component({
    selector: 'jhi-level-delete-dialog',
    templateUrl: './level-delete-dialog.component.html'
})
export class LevelDeleteDialogComponent {
    level: ILevel;

    constructor(protected levelService: LevelService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.levelService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'levelListModification',
                content: 'Deleted an level'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-level-delete-popup',
    template: ''
})
export class LevelDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ level }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(LevelDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.level = level;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/level', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/level', { outlets: { popup: null } }]);
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
