import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPersonSkill } from 'app/shared/model/person-skill.model';
import { PersonSkillService } from './person-skill.service';

@Component({
    selector: 'jhi-person-skill-delete-dialog',
    templateUrl: './person-skill-delete-dialog.component.html'
})
export class PersonSkillDeleteDialogComponent {
    personSkill: IPersonSkill;

    constructor(
        private personSkillService: PersonSkillService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.personSkillService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'personSkillListModification',
                content: 'Deleted an personSkill'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-person-skill-delete-popup',
    template: ''
})
export class PersonSkillDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private route: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.route.data.subscribe(({ personSkill }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(PersonSkillDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.personSkill = personSkill.body;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
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
