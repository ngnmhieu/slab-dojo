import { Moment } from 'moment';

export const enum ActivityType {
    'PERSON_SKILL_COMPLETED',
    'SKILL_COMPLETED',
    'BADGE_CREATED'
}

export interface IActivity {
    id?: number;
    type?: ActivityType;
    data?: string;
    createdAt?: Moment;
}

export class Activity implements IActivity {
    constructor(public id?: number, public type?: ActivityType, public data?: string, public createdAt?: Moment) {}
}
