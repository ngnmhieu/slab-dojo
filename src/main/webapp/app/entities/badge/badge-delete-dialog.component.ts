import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IBadge } from 'app/shared/model/badge.model';
import { BadgeService } from './badge.service';

@Component({
    selector: 'jhi-badge-delete-dialog',
    templateUrl: './badge-delete-dialog.component.html'
})
export class BadgeDeleteDialogComponent {
    badge: IBadge;

    constructor(protected badgeService: BadgeService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.badgeService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'badgeListModification',
                content: 'Deleted an badge'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-badge-delete-popup',
    template: ''
})
export class BadgeDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ badge }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(BadgeDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.badge = badge;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/badge', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/badge', { outlets: { popup: null } }]);
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
