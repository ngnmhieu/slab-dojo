import { Moment } from 'moment';

export const enum ReportType {
    BUG = 'BUG',
    WISH = 'WISH',
    REVIEW = 'REVIEW',
    COMPLIMENT = 'COMPLIMENT'
}

export interface IReport {
    id?: number;
    title?: string;
    description?: string;
    type?: ReportType;
    creationDate?: Moment;
}

export class Report implements IReport {
    constructor(
        public id?: number,
        public title?: string,
        public description?: string,
        public type?: ReportType,
        public creationDate?: Moment
    ) {}
}
