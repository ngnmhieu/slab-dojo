/* tslint:disable max-line-length */
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { take, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { BadgeService } from 'app/entities/badge/badge.service';
import { IBadge, Badge } from 'app/shared/model/badge.model';

describe('Service Tests', () => {
    describe('Badge Service', () => {
        let injector: TestBed;
        let service: BadgeService;
        let httpMock: HttpTestingController;
        let elemDefault: IBadge;
        let currentDate: moment.Moment;
        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [HttpClientTestingModule]
            });
            injector = getTestBed();
            service = injector.get(BadgeService);
            httpMock = injector.get(HttpTestingController);
            currentDate = moment();

            elemDefault = new Badge(0, 'AAAAAAA', 'AAAAAAA', currentDate, 0, 0, 0, 0);
        });

        describe('Service methods', async () => {
            it('should find an element', async () => {
                const returnedFromService = Object.assign(
                    {
                        availableUntil: currentDate.format(DATE_TIME_FORMAT)
                    },
                    elemDefault
                );
                service
                    .find(123)
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: elemDefault }));

                const req = httpMock.expectOne({ method: 'GET' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should create a Badge', async () => {
                const returnedFromService = Object.assign(
                    {
                        id: 0,
                        availableUntil: currentDate.format(DATE_TIME_FORMAT)
                    },
                    elemDefault
                );
                const expected = Object.assign(
                    {
                        availableUntil: currentDate
                    },
                    returnedFromService
                );
                service
                    .create(new Badge(null))
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
                const req = httpMock.expectOne({ method: 'POST' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should update a Badge', async () => {
                const returnedFromService = Object.assign(
                    {
                        name: 'BBBBBB',
                        description: 'BBBBBB',
                        availableUntil: currentDate.format(DATE_TIME_FORMAT),
                        availableAmount: 1,
                        requiredScore: 1,
                        instantMultiplier: 1,
                        completionBonus: 1
                    },
                    elemDefault
                );

                const expected = Object.assign(
                    {
                        availableUntil: currentDate
                    },
                    returnedFromService
                );
                service
                    .update(expected)
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
                const req = httpMock.expectOne({ method: 'PUT' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should return a list of Badge', async () => {
                const returnedFromService = Object.assign(
                    {
                        name: 'BBBBBB',
                        description: 'BBBBBB',
                        availableUntil: currentDate.format(DATE_TIME_FORMAT),
                        availableAmount: 1,
                        requiredScore: 1,
                        instantMultiplier: 1,
                        completionBonus: 1
                    },
                    elemDefault
                );
                const expected = Object.assign(
                    {
                        availableUntil: currentDate
                    },
                    returnedFromService
                );
                service
                    .query(expected)
                    .pipe(
                        take(1),
                        map(resp => resp.body)
                    )
                    .subscribe(body => expect(body).toContainEqual(expected));
                const req = httpMock.expectOne({ method: 'GET' });
                req.flush(JSON.stringify([returnedFromService]));
                httpMock.verify();
            });

            it('should delete a Badge', async () => {
                const rxPromise = service.delete(123).subscribe(resp => expect(resp.ok));

                const req = httpMock.expectOne({ method: 'DELETE' });
                req.flush({ status: 200 });
            });
        });

        afterEach(() => {
            httpMock.verify();
        });
    });
});
