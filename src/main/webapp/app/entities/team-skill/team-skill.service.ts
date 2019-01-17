import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ITeamSkill } from 'app/shared/model/team-skill.model';

type EntityResponseType = HttpResponse<ITeamSkill>;
type EntityArrayResponseType = HttpResponse<ITeamSkill[]>;

@Injectable({ providedIn: 'root' })
export class TeamSkillService {
    public resourceUrl = SERVER_API_URL + 'api/team-skills';

    constructor(protected http: HttpClient) {}

    create(teamSkill: ITeamSkill): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(teamSkill);
        return this.http
            .post<ITeamSkill>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(teamSkill: ITeamSkill): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(teamSkill);
        return this.http
            .put<ITeamSkill>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<ITeamSkill>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<ITeamSkill[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    protected convertDateFromClient(teamSkill: ITeamSkill): ITeamSkill {
        const copy: ITeamSkill = Object.assign({}, teamSkill, {
            completedAt: teamSkill.completedAt != null && teamSkill.completedAt.isValid() ? teamSkill.completedAt.toJSON() : null,
            verifiedAt: teamSkill.verifiedAt != null && teamSkill.verifiedAt.isValid() ? teamSkill.verifiedAt.toJSON() : null
        });
        return copy;
    }

    protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
        if (res.body) {
            res.body.completedAt = res.body.completedAt != null ? moment(res.body.completedAt) : null;
            res.body.verifiedAt = res.body.verifiedAt != null ? moment(res.body.verifiedAt) : null;
        }
        return res;
    }

    protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        if (res.body) {
            res.body.forEach((teamSkill: ITeamSkill) => {
                teamSkill.completedAt = teamSkill.completedAt != null ? moment(teamSkill.completedAt) : null;
                teamSkill.verifiedAt = teamSkill.verifiedAt != null ? moment(teamSkill.verifiedAt) : null;
            });
        }
        return res;
    }
}
