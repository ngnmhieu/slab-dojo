import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import * as moment from 'moment';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IPersonSkill } from 'app/shared/model/person-skill.model';

export type EntityResponseType = HttpResponse<IPersonSkill>;
export type EntityArrayResponseType = HttpResponse<IPersonSkill[]>;

@Injectable()
export class PersonSkillService {
    private resourceUrl = SERVER_API_URL + 'api/person-skills';

    constructor(private http: HttpClient) {}

    create(personSkill: IPersonSkill): Observable<EntityResponseType> {
        const copy = this.convert(personSkill);
        return this.http
            .post<IPersonSkill>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(personSkill: IPersonSkill): Observable<EntityResponseType> {
        const copy = this.convert(personSkill);
        return this.http
            .put<IPersonSkill>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IPersonSkill>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IPersonSkill[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: EntityArrayResponseType) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: IPersonSkill = this.convertItemFromServer(res.body);
        return res.clone({ body });
    }

    private convertArrayResponse(res: EntityArrayResponseType): EntityArrayResponseType {
        const jsonResponse: IPersonSkill[] = res.body;
        const body: IPersonSkill[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({ body });
    }

    /**
     * Convert a returned JSON object to PersonSkill.
     */
    private convertItemFromServer(personSkill: IPersonSkill): IPersonSkill {
        const copy: IPersonSkill = Object.assign({}, personSkill, {
            completedAt: personSkill.completedAt != null ? moment(personSkill.completedAt) : personSkill.completedAt,
            verifiedAt: personSkill.verifiedAt != null ? moment(personSkill.verifiedAt) : personSkill.verifiedAt
        });
        return copy;
    }

    /**
     * Convert a PersonSkill to a JSON which can be sent to the server.
     */
    private convert(personSkill: IPersonSkill): IPersonSkill {
        const copy: IPersonSkill = Object.assign({}, personSkill, {
            completedAt: personSkill.completedAt != null && personSkill.completedAt.isValid() ? personSkill.completedAt.toJSON() : null,
            verifiedAt: personSkill.verifiedAt != null && personSkill.verifiedAt.isValid() ? personSkill.verifiedAt.toJSON() : null
        });
        return copy;
    }
}
