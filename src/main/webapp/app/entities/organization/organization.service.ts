import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IOrganization, Organization, UserMode } from 'app/shared/model/organization.model';

type EntityResponseType = HttpResponse<IOrganization>;
type EntityArrayResponseType = HttpResponse<IOrganization[]>;

@Injectable({ providedIn: 'root' })
export class OrganizationService {
    public resourceUrl = SERVER_API_URL + 'api/organizations';

    private currentOrganization: IOrganization;

    constructor(protected http: HttpClient) {}

    create(organization: IOrganization): Observable<EntityResponseType> {
        return this.http.post<IOrganization>(this.resourceUrl, organization, { observe: 'response' });
    }

    update(organization: IOrganization): Observable<EntityResponseType> {
        return this.http.put<IOrganization>(this.resourceUrl, organization, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IOrganization>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IOrganization[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    findCurrent(): Observable<EntityResponseType> {
        let result = this.http.get<IOrganization>(`${this.resourceUrl}/current`, { observe: 'response' });
        result.subscribe(res => (this.currentOrganization = res.body));
        return result;
    }

    getCurrent(): IOrganization {
        let defaultOrganization = new Organization(null, 'Organization', 1, UserMode.TEAM, '');
        return this.currentOrganization ? this.currentOrganization : defaultOrganization;
    }
}
