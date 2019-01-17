import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IDimension } from 'app/shared/model/dimension.model';

type EntityResponseType = HttpResponse<IDimension>;
type EntityArrayResponseType = HttpResponse<IDimension[]>;

@Injectable({ providedIn: 'root' })
export class DimensionService {
    public resourceUrl = SERVER_API_URL + 'api/dimensions';

    constructor(protected http: HttpClient) {}

    create(dimension: IDimension): Observable<EntityResponseType> {
        return this.http.post<IDimension>(this.resourceUrl, dimension, { observe: 'response' });
    }

    update(dimension: IDimension): Observable<EntityResponseType> {
        return this.http.put<IDimension>(this.resourceUrl, dimension, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IDimension>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IDimension[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
