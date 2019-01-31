export const enum UserMode {
    PERSON = 'PERSON',
    TEAM = 'TEAM'
}

export interface IOrganization {
    id?: number;
    name?: string;
    levelUpScore?: number;
    userMode?: UserMode;
    mattermostUrl?: string;
}

export class Organization implements IOrganization {
    constructor(
        public id?: number,
        public name?: string,
        public levelUpScore?: number,
        public userMode?: UserMode,
        public mattermostUrl?: string
    ) {}
}
