import { IPerson } from 'app/shared/model/person.model';

export interface PersonScore {
    person?: IPerson;
    score?: number;
}

export class PersonScore implements PersonScore {
    constructor(public person?: IPerson, public score?: number) {}
}
