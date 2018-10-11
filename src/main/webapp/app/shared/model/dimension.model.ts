import { ITeam } from './team.model';
import { ILevel } from './level.model';
import { IBadge } from './badge.model';
import { IPerson } from './person.model';

export interface IDimension {
    id?: number;
    name?: string;
    description?: string;
    participants?: ITeam[];
    levels?: ILevel[];
    badges?: IBadge[];
    personParticipants?: IPerson[];
}

export class Dimension implements IDimension {
    constructor(
        public id?: number,
        public name?: string,
        public description?: string,
        public participants?: ITeam[],
        public levels?: ILevel[],
        public badges?: IBadge[],
        public personParticipants?: IPerson[]
    ) {}
}
