import { Moment } from 'moment';
import { ITeam } from 'app/shared/model/team.model';

export interface IComment {
    id?: number;
    text?: string;
    creationDate?: Moment;
    teamShortName?: string;
    teamId?: number;
    personId?: number;
    personMnemonic?: string;
    author?: ITeam;
    skillTitle?: string;
    skillId?: number;
}

export class Comment implements IComment {
    constructor(
        public id?: number,
        public text?: string,
        public creationDate?: Moment,
        public teamShortName?: string,
        public teamId?: number,
        public personId?: number,
        public personMnemonic?: string,
        public author?: ITeam,
        public skillTitle?: string,
        public skillId?: number
    ) {}
}
