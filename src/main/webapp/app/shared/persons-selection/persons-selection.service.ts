import { Injectable, OnInit } from '@angular/core';
import { IPerson } from 'app/shared/model/person.model';
import { PersonsService } from 'app/persons/persons.service';
import { LocalStorageService } from 'ngx-webstorage';
import { PersonSkillService } from 'app/entities/person-skill';
import { Observable } from 'rxjs/Observable';

const TEAM_STORAGE_KEY = 'selectedPersonId';

@Injectable()
export class PersonsSelectionService {
    private _selectedPerson: IPerson = null;

    constructor(
        private personsService: PersonsService,
        private personSkillService: PersonSkillService,
        private storage: LocalStorageService
    ) {
        this.query();
    }

    query(): Observable<IPerson> {
        const personIdStr = this.storage.retrieve(TEAM_STORAGE_KEY);
        if (personIdStr !== null && !isNaN(Number(personIdStr))) {
            return this.personsService
                .find(personIdStr)
                .do(result => {
                    this._selectedPerson = result.body || null;
                })
                .flatMap(result => {
                    return this.personSkillService
                        .query({ 'personId.equals': result.body.id })
                        .do(personSkillRes => {
                            this._selectedPerson.skills = personSkillRes.body || [];
                        })
                        .map(() => result.body);
                });
        }
        return Observable.of(this._selectedPerson);
    }

    get selectedPerson() {
        return this._selectedPerson;
    }

    set selectedPerson(person: IPerson) {
        this._selectedPerson = person;
        if (person !== null) {
            this.storage.store(TEAM_STORAGE_KEY, this._selectedPerson.id.toString());
        } else {
            this.storage.clear(TEAM_STORAGE_KEY);
        }
    }
}
