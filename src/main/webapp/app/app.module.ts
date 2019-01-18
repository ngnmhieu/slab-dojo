import './vendor.ts';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgbDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';
import { Ng2Webstorage } from 'ngx-webstorage';
import { NgJhipsterModule } from 'ng-jhipster';
import { StarRatingModule } from 'angular-star-rating';

import { AuthExpiredInterceptor } from './blocks/interceptor/auth-expired.interceptor';
import { ErrorHandlerInterceptor } from './blocks/interceptor/errorhandler.interceptor';
import { NotificationInterceptor } from './blocks/interceptor/notification.interceptor';
import { TeamdojoSharedModule } from 'app/shared';
import { TeamdojoCoreModule } from 'app/core';
import { TeamdojoAppRoutingModule } from './app-routing.module';
import { TeamdojoHomeModule } from './home/home.module';
import { TeamdojoAccountModule } from './account/account.module';
import { TeamdojoEntityModule } from './entities/entity.module';
import { OverviewModule } from 'app/overview';
import { TeamsModule } from './teams/teams.module';
import { FeedbackModule } from './feedback/feedback.module';
import { PaginationConfig } from './blocks/config/uib-pagination.config';
// jhipster-needle-angular-add-module-import JHipster will add new module here

import {
    ActiveMenuDirective,
    ErrorComponent,
    FooterComponent,
    JhiMainComponent,
    NavbarComponent,
    PageRibbonComponent,
    ProfileService
} from './layouts';
import * as moment from 'moment';

// ???
@NgModule({
    imports: [
        StarRatingModule.forRoot(),
        BrowserModule,
        TeamdojoAppRoutingModule,
        Ng2Webstorage.forRoot({ prefix: 'jhi', separator: '-' }),
        NgJhipsterModule.forRoot({
            // set below to true to make alerts look like toast
            alertAsToast: false,
            alertTimeout: 5000,
            i18nEnabled: true,
            defaultI18nLang: 'en'
        }),
        TeamdojoSharedModule.forRoot(),
        TeamdojoCoreModule,
        OverviewModule,
        TeamdojoHomeModule,
        TeamdojoAccountModule,
        // jhipster-needle-angular-add-module JHipster will add new module here
        TeamdojoEntityModule,
        TeamsModule,
        FeedbackModule
    ],
    declarations: [JhiMainComponent, NavbarComponent, ErrorComponent, PageRibbonComponent, ActiveMenuDirective, FooterComponent],
    providers: [
        ProfileService,
        PaginationConfig,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthExpiredInterceptor,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ErrorHandlerInterceptor,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: NotificationInterceptor,
            multi: true
        }
    ],
    bootstrap: [JhiMainComponent]
})
export class TeamdojoAppModule {
    constructor(private dpConfig: NgbDatepickerConfig) {
        this.dpConfig.minDate = { year: moment().year() - 100, month: 1, day: 1 };
    }
}
