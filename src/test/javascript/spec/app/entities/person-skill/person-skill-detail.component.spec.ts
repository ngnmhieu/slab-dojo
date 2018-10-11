/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs/observable/of';

import { TeamdojoTestModule } from '../../../test.module';
import { PersonSkillDetailComponent } from 'app/entities/person-skill/person-skill-detail.component';
import { PersonSkill } from 'app/shared/model/person-skill.model';

describe('Component Tests', () => {
    describe('PersonSkill Management Detail Component', () => {
        let comp: PersonSkillDetailComponent;
        let fixture: ComponentFixture<PersonSkillDetailComponent>;
        const route = ({ data: of({ personSkill: new PersonSkill(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TeamdojoTestModule],
                declarations: [PersonSkillDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(PersonSkillDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(PersonSkillDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.personSkill).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
