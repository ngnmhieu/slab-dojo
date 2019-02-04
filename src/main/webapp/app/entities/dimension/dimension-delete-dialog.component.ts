import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IDimension } from 'app/shared/model/dimension.model';
import { DimensionService } from './dimension.service';

@Component({
    selector: 'jhi-dimension-delete-dialog',
    templateUrl: './dimension-delete-dialog.component.html'
})
export class DimensionDeleteDialogComponent {
    dimension: IDimension;

    constructor(
        protected dimensionService: DimensionService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.dimensionService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'dimensionListModification',
                content: 'Deleted an dimension'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-dimension-delete-popup',
    template: ''
})
export class DimensionDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ dimension }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(DimensionDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.dimension = dimension;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/dimension', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/dimension', { outlets: { popup: null } }]);
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
