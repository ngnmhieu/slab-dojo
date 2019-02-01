import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IBadgeSkill } from 'app/shared/model/badge-skill.model';

type EntityResponseType = HttpResponse<IBadgeSkill>;
type EntityArrayResponseType = HttpResponse<IBadgeSkill[]>;

@Injectable({ providedIn: 'root' })
export class BadgeSkillService {
    public resourceUrl = SERVER_API_URL + 'api/badge-skills';

    constructor(protected http: HttpClient) {}

    create(badgeSkill: IBadgeSkill): Observable<EntityResponseType> {
        return this.http.post<IBadgeSkill>(this.resourceUrl, badgeSkill, { observe: 'response' });
    }

    update(badgeSkill: IBadgeSkill): Observable<EntityResponseType> {
        return this.http.put<IBadgeSkill>(this.resourceUrl, badgeSkill, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IBadgeSkill>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IBadgeSkill[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
