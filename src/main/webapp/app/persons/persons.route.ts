import { ActivatedRouteSnapshot, Resolve, Route, Router, RouterStateSnapshot } from '@angular/router';

import { PersonsComponent } from './';
import { PersonsService } from 'app/persons/persons.service';
import { Person } from 'app/shared/model/person.model';
import { Injectable } from '@angular/core';
import { SkillDetailsComponent } from 'app/persons/skill-details/skill-details.component';
import { PersonSkillService } from 'app/entities/person-skill';
import { PersonsSelectionResolve } from 'app/shared/persons-selection/persons-selection.resolve';
import {
    AllBadgesResolve,
    AllCommentsResolve,
    AllSkillsResolve,
    AllPersonsResolve,
    DojoModelResolve,
    SkillResolve
} from 'app/shared/common.resolver';

@Injectable()
export class PersonAndPersonSkillResolve implements Resolve<any> {
    constructor(private personService: PersonsService, private personSkillService: PersonSkillService, private router: Router) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const mnemonic = route.params['mnemonic'] ? route.params['mnemonic'] : null;
        if (mnemonic) {
            return this.personService
                .query({
                    'mnemonic.equals': mnemonic
                })
                .flatMap(personResponse => {
                    if (personResponse.body.length === 0) {
                        this.router.navigate(['/error']);
                    }
                    const person = personResponse.body[0];
                    return this.personSkillService.query({ 'personId.equals': person.id }).map(personSkillResponse => {
                        person.skills = personSkillResponse.body;
                        return person;
                    });
                });
        }
        return new Person();
    }
}

export const PERSONS_ROUTES: Route[] = [
    {
        path: 'persons/:mnemonic',
        component: PersonsComponent,
        resolve: {
            dojoModel: DojoModelResolve,
            person: PersonAndPersonSkillResolve,
            skills: AllSkillsResolve
        },
        data: {
            authorities: [],
            pageTitle: 'teamdojoApp.persons.home.title'
        }
    },
    {
        path: 'persons/:mnemonic/skills/:skillId',
        component: SkillDetailsComponent,
        resolve: {
            dojoModel: DojoModelResolve,
            person: PersonAndPersonSkillResolve,
            skill: SkillResolve,
            skills: AllSkillsResolve,
            comments: AllCommentsResolve,
            selectedPerson: PersonsSelectionResolve
        },
        data: {
            authorities: [],
            pageTitle: 'teamdojoApp.persons.skills.title'
        }
    }
];
