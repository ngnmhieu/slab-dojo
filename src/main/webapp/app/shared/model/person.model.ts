import { IDimension } from './dimension.model';
import { IPersonSkill } from './person-skill.model';

export interface IPerson {
    id?: number;
    name?: string;
    firstname?: string;
    mnemonic?: string;
    participations?: IDimension[];
    imageId?: number;
    skills?: IPersonSkill[];
}

export class Person implements IPerson {
    constructor(
        public id?: number,
        public name?: string,
        public firstname?: string,
        public mnemonic?: string,
        public participations?: IDimension[],
        public imageId?: number,
        public skills?: IPersonSkill[]
    ) {}
}
