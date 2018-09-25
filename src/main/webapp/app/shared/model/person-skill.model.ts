import { Moment } from 'moment';

export interface IPersonSkill {
    id?: number;
    completedAt?: Moment;
    verifiedAt?: Moment;
    irrelevant?: boolean;
    note?: string;
    skillId?: number;
    personId?: number;
}

export class PersonSkill implements IPersonSkill {
    constructor(
        public id?: number,
        public completedAt?: Moment,
        public verifiedAt?: Moment,
        public irrelevant?: boolean,
        public note?: string,
        public skillId?: number,
        public personId?: number
    ) {
        this.irrelevant = false;
    }
}
