import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper, LoginModalService, LoginService, Principal } from 'app/core';
import { ProfileService } from '../profiles/profile.service';
import { TeamsSelectionService } from 'app/shared/teams-selection/teams-selection.service';
import { TeamsSelectionComponent } from 'app/shared/teams-selection/teams-selection.component';
import { PersonsSelectionService } from 'app/shared/persons-selection/persons-selection.service';
import { PersonsSelectionComponent } from 'app/shared/persons-selection/persons-selection.component';
import { ITeam, Team } from 'app/shared/model/team.model';
import { IPerson } from 'app/shared/model/person.model';
import { IBadge } from 'app/shared/model/badge.model';
import { ILevel } from 'app/shared/model/level.model';
import { IDimension } from 'app/shared/model/dimension.model';
import { ISkill } from 'app/shared/model/skill.model';
import { BreadcrumbService } from 'app/layouts/navbar/breadcrumb.service';
import { IBreadcrumb } from 'app/shared/model/breadcrumb.model';

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
    isTeamSelectionOpen = false;
    isPersonSelectionOpen = false;

    activeLevel: ILevel;
    activeBadge: IBadge;
    activeDimension: IDimension;
    activeTeam: ITeam;
    activePerson: IPerson;
    activeSkill: ISkill;
    breadcrumbs: IBreadcrumb[];

    constructor(
        private loginService: LoginService,
        private languageService: JhiLanguageService,
        private languageHelper: JhiLanguageHelper,
        private principal: Principal,
        private loginModalService: LoginModalService,
        private teamsSelectionService: TeamsSelectionService,
        private personsSelectionService: PersonsSelectionService,
        private profileService: ProfileService,
        private modalService: NgbModal,
        private router: Router,
        private route: ActivatedRoute,
        private breadcrumbService: BreadcrumbService
    ) {
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
            this.organizationName = profileInfo.organization.name;
        });
        this.teamsSelectionService.query().subscribe();
        this.personsSelectionService.query().subscribe();
    }

    loadBreadcrumb() {
        this.activeLevel = null;
        this.activeBadge = null;
        this.activeDimension = null;
        this.activeTeam = null;
        this.activePerson = null;
        this.activeSkill = null;
        this.breadcrumbs = null;
        this.breadcrumbs = this.breadcrumbService.getCurrentBreadcrumb();
    }

    changeLanguage(languageKey: string) {
        this.languageService.changeLanguage(languageKey);
    }

    collapseNavbar() {
        this.isNavbarCollapsed = true;
    }

    isAuthenticated() {
        return this.principal.isAuthenticated();
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
        return this.isAuthenticated() ? this.principal.getImageUrl() : null;
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

    selectPerson(): NgbModalRef {
        if (this.isPersonSelectionOpen) {
            return;
        }
        this.isPersonSelectionOpen = true;
        const modalRef = this.modalService.open(PersonsSelectionComponent, { size: 'lg' });
        modalRef.result.then(
            result => {
                this.isPersonSelectionOpen = false;
            },
            reason => {
                this.isPersonSelectionOpen = false;
            }
        );
        return modalRef;
    }

    isPersonOverview() {
        return this.activePerson !== null && this.activePerson !== 'undefined';
    }

    isSkillDetail() {
        return this.activeSkill !== null && this.activeSkill !== 'undfined';
    }

    get selectedTeam() {
        return this.teamsSelectionService.selectedTeam;
    }

    get selectedPerson() {
        return this.personsSelectionService.selectedPerson;
    }
}
