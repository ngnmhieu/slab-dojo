import { ITeam } from 'app/shared/model/team.model';
import { ILevel } from 'app/shared/model/level.model';
import { IBadge } from 'app/shared/model/badge.model';

export interface IDimension {
    id?: number;
    name?: string;
    description?: string;
    participants?: ITeam[];
    levels?: ILevel[];
    badges?: IBadge[];
}

export class Dimension implements IDimension {
    constructor(
        public id?: number,
        public name?: string,
        public description?: string,
        public participants?: ITeam[],
        public levels?: ILevel[],
        public badges?: IBadge[]
    ) {}
}
