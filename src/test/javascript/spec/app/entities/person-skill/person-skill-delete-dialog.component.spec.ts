/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { TeamdojoTestModule } from '../../../test.module';
import { PersonSkillDeleteDialogComponent } from 'app/entities/person-skill/person-skill-delete-dialog.component';
import { PersonSkillService } from 'app/entities/person-skill/person-skill.service';

describe('Component Tests', () => {
    describe('PersonSkill Management Delete Component', () => {
        let comp: PersonSkillDeleteDialogComponent;
        let fixture: ComponentFixture<PersonSkillDeleteDialogComponent>;
        let service: PersonSkillService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TeamdojoTestModule],
                declarations: [PersonSkillDeleteDialogComponent],
                providers: [PersonSkillService]
            })
                .overrideTemplate(PersonSkillDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(PersonSkillDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PersonSkillService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it(
                'Should call delete service on confirmDelete',
                inject(
                    [],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(Observable.of({}));

                        // WHEN
                        comp.confirmDelete(123);
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith(123);
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });
});
