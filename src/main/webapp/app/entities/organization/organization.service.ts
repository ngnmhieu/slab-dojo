import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IOrganization, Organization, UserMode } from 'app/shared/model/organization.model';
import { LocalStorageService } from 'ngx-webstorage';

type EntityResponseType = HttpResponse<IOrganization>;
type EntityArrayResponseType = HttpResponse<IOrganization[]>;

const USER_MODE_STORAGE_KEY = 'userMode';

@Injectable({ providedIn: 'root' })
export class OrganizationService {
    public resourceUrl = SERVER_API_URL + 'api/organizations';

    private currentOrganization: IOrganization;

    constructor(protected http: HttpClient, private storage: LocalStorageService) {}

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
        const result = this.http.get<IOrganization>(`${this.resourceUrl}/current`, { observe: 'response' });
        result.subscribe(res => {
            this.currentOrganization = res.body;
            this.storage.store(USER_MODE_STORAGE_KEY, this.currentOrganization.userMode);
        });
        return result;
    }

    getCurrentUserMode(): UserMode {
        const userMode = this.storage.retrieve(USER_MODE_STORAGE_KEY);
        if (userMode) {
            return userMode;
        }
        // if user mode didn't exist in storage, fetch it from backend. fallback to team mode on error.
        this.findCurrent().subscribe(
            res => {
                return res.body.userMode;
            },
            () => {
                return UserMode.TEAM;
            }
        );
    }
}
