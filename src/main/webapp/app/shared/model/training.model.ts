import { Moment } from 'moment';
import { ISkill } from 'app/shared/model//skill.model';

export interface ITraining {
    id?: number;
    title?: string;
    description?: string;
    contactPerson?: string;
    link?: string;
    validUntil?: Moment;
    isOfficial?: boolean;
    suggestedBy?: string;
    skills?: ISkill[];
}

export class Training implements ITraining {
    constructor(
        public id?: number,
        public title?: string,
        public description?: string,
        public contactPerson?: string,
        public link?: string,
        public validUntil?: Moment,
        public isOfficial?: boolean,
        public suggestedBy?: string,
        public skills?: ISkill[]
    ) {
        this.isOfficial = this.isOfficial || false;
    }
}
