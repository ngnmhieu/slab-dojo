import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiLanguageService } from 'ng-jhipster';
import { SessionStorageService } from 'ngx-webstorage';

import { VERSION } from 'app/app.constants';
import { JhiLanguageHelper, AccountService, LoginModalService, LoginService } from 'app/core';
import { ProfileService } from 'app/layouts/profiles/profile.service';
import { TeamsSelectionService } from 'app/shared/teams-selection/teams-selection.service';
import { TeamsSelectionComponent } from 'app/shared/teams-selection/teams-selection.component';
import { ITeam, Team } from 'app/shared/model/team.model';
import { IBadge } from 'app/shared/model/badge.model';
import { ILevel } from 'app/shared/model/level.model';
import { IDimension } from 'app/shared/model/dimension.model';
import { ISkill } from 'app/shared/model/skill.model';
import { BreadcrumbService } from 'app/layouts/navbar/breadcrumb.service';
import { IBreadcrumb } from 'app/shared/model/breadcrumb.model';
import { OrganizationService } from 'app/entities/organization';
import { IOrganization, Organization } from 'app/shared/model/organization.model';
import { filter, map } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';

@Component({
    selector: 'jhi-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['navbar.scss']
})
export class NavbarComponent implements OnInit {
    inProduction: boolean;
    isNavbarCollapsed: boolean;
    languages: any[];
    swaggerEnabled: boolean;
    organizationName: string;
    modalRef: NgbModalRef;
    version: string;
    isTeamSelectionOpen = false;

    activeLevel: ILevel;
    activeBadge: IBadge;
    activeDimension: IDimension;
    activeTeam: ITeam;
    activeSkill: ISkill;
    breadcrumbs: IBreadcrumb[];

    constructor(
        private loginService: LoginService,
        private languageService: JhiLanguageService,
        private languageHelper: JhiLanguageHelper,
        private sessionStorage: SessionStorageService,
        private accountService: AccountService,
        private loginModalService: LoginModalService,
        private teamsSelectionService: TeamsSelectionService,
        private profileService: ProfileService,
        private modalService: NgbModal,
        private router: Router,
        private route: ActivatedRoute,
        private breadcrumbService: BreadcrumbService,
        private organizationService: OrganizationService
    ) {
        this.version = VERSION ? 'v' + VERSION : '';
        this.isNavbarCollapsed = true;
    }

    ngOnInit() {
        this.breadcrumbs = this.breadcrumbService.getCurrentBreadcrumb();
        this.breadcrumbService.breadcrumbChanged.subscribe(breadcrumb => {
            this.breadcrumbs = this.breadcrumbService.getCurrentBreadcrumb();
        });

        this.languageHelper.getAll().then(languages => {
            this.languages = languages;
        });

        this.profileService.getProfileInfo().then(profileInfo => {
            this.inProduction = profileInfo.inProduction;
            this.swaggerEnabled = profileInfo.swaggerEnabled;
        });

        this.organizationService
            .findCurrent()
            .pipe(
                filter((response: HttpResponse<Organization>) => response.ok),
                map((organization: HttpResponse<Organization>) => organization.body)
            )
            .subscribe((current: IOrganization) => {
                this.organizationName = current.name;
            });
        this.teamsSelectionService.query().subscribe();
    }

    loadBreadcrumb() {
        this.activeLevel = null;
        this.activeBadge = null;
        this.activeDimension = null;
        this.activeTeam = null;
        this.activeSkill = null;
        this.breadcrumbs = null;
        this.breadcrumbs = this.breadcrumbService.getCurrentBreadcrumb();
    }

    changeLanguage(languageKey: string) {
        this.sessionStorage.store('locale', languageKey);
        this.languageService.changeLanguage(languageKey);
    }

    collapseNavbar() {
        this.isNavbarCollapsed = true;
    }

    isAuthenticated() {
        return this.accountService.isAuthenticated();
    }

    login() {
        this.modalRef = this.loginModalService.open();
    }

    logout() {
        this.collapseNavbar();
        this.loginService.logout();
        this.router.navigate(['']);
    }

    toggleNavbar() {
        this.isNavbarCollapsed = !this.isNavbarCollapsed;
    }

    getImageUrl() {
        return this.isAuthenticated() ? this.accountService.getImageUrl() : null;
    }

    selectTeam(): NgbModalRef {
        if (this.isTeamSelectionOpen) {
            return;
        }
        this.isTeamSelectionOpen = true;
        const modalRef = this.modalService.open(TeamsSelectionComponent, { size: 'lg' });
        modalRef.result.then(
            result => {
                this.isTeamSelectionOpen = false;
            },
            reason => {
                this.isTeamSelectionOpen = false;
            }
        );
        return modalRef;
    }

    isTeamOverview() {
        return this.activeTeam !== null && this.activeTeam !== 'undefined';
    }

    isSkillDetail() {
        return this.activeSkill !== null && this.activeSkill !== 'undfined';
    }

    get selectedTeam() {
        return this.teamsSelectionService.selectedTeam;
    }
}
