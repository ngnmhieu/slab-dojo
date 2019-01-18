import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ILevelSkill } from 'app/shared/model/level-skill.model';

type EntityResponseType = HttpResponse<ILevelSkill>;
type EntityArrayResponseType = HttpResponse<ILevelSkill[]>;

@Injectable({ providedIn: 'root' })
export class LevelSkillService {
    public resourceUrl = SERVER_API_URL + 'api/level-skills';

    constructor(protected http: HttpClient) {}

    create(levelSkill: ILevelSkill): Observable<EntityResponseType> {
        return this.http.post<ILevelSkill>(this.resourceUrl, levelSkill, { observe: 'response' });
    }

    update(levelSkill: ILevelSkill): Observable<EntityResponseType> {
        return this.http.put<ILevelSkill>(this.resourceUrl, levelSkill, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ILevelSkill>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ILevelSkill[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
