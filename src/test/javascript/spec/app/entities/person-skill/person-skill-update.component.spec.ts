/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { TeamdojoTestModule } from '../../../test.module';
import { PersonSkillUpdateComponent } from 'app/entities/person-skill/person-skill-update.component';
import { PersonSkillService } from 'app/entities/person-skill/person-skill.service';
import { PersonSkill } from 'app/shared/model/person-skill.model';

import { SkillService } from 'app/entities/skill';
import { PersonService } from 'app/entities/person';

describe('Component Tests', () => {
    describe('PersonSkill Management Update Component', () => {
        let comp: PersonSkillUpdateComponent;
        let fixture: ComponentFixture<PersonSkillUpdateComponent>;
        let service: PersonSkillService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TeamdojoTestModule],
                declarations: [PersonSkillUpdateComponent],
                providers: [SkillService, PersonService, PersonSkillService]
            })
                .overrideTemplate(PersonSkillUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(PersonSkillUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PersonSkillService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new PersonSkill(123);
                    spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({ body: entity })));
                    comp.personSkill = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.update).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );

            it(
                'Should call create service on save for new entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new PersonSkill();
                    spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({ body: entity })));
                    comp.personSkill = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.create).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );
        });
    });
});
