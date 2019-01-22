import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ITraining } from 'app/shared/model/training.model';
import { map } from 'rxjs/operators';

export type EntityResponseType = HttpResponse<ITraining>;
export type EntityArrayResponseType = HttpResponse<ITraining[]>;

@Injectable()
export class TrainingService {
    private resourceUrl = SERVER_API_URL + 'api/trainings';

    constructor(private http: HttpClient) {}

    create(training: ITraining): Observable<EntityResponseType> {
        const copy = this.convert(training);
        return this.http
            .post<ITraining>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertResponse(res)));
    }

    update(training: ITraining): Observable<EntityResponseType> {
        const copy = this.convert(training);
        return this.http
            .put<ITraining>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertResponse(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<ITraining>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertResponse(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<ITraining[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertArrayResponse(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: ITraining = this.convertItemFromServer(res.body);
        return res.clone({ body });
    }

    private convertArrayResponse(res: EntityArrayResponseType): EntityArrayResponseType {
        const jsonResponse: ITraining[] = res.body;
        const body: ITraining[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({ body });
    }

    /**
     * Convert a returned JSON object to Training.
     */
    private convertItemFromServer(training: ITraining): ITraining {
        const copy: ITraining = Object.assign({}, training, {
            validUntil: training.validUntil != null ? moment(training.validUntil) : training.validUntil
        });
        return copy;
    }

    /**
     * Convert a Training to a JSON which can be sent to the server.
     */
    private convert(training: ITraining): ITraining {
        const copy: ITraining = Object.assign({}, training, {
            validUntil: training.validUntil != null && training.validUntil.isValid() ? training.validUntil.toJSON() : null
        });
        return copy;
    }
}
