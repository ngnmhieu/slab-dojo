import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { SessionStorageService } from 'ngx-webstorage';
import { IPerson } from 'app/shared/model/person.model';
import { PersonsSkillsService } from './persons-skills.service';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Location } from '@angular/common';
import { AchievableSkill, IAchievableSkill } from 'app/shared/model/achievable-skill.model';
import { JhiAlertService, JhiParseLinks } from 'ng-jhipster';
import { PersonsSelectionService } from 'app/shared/persons-selection/persons-selection.service';
import * as moment from 'moment';
import { ISkill } from 'app/shared/model/skill.model';
import { SkillService } from 'app/entities/skill';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { BreadcrumbService } from 'app/layouts/navbar/breadcrumb.service';
import { LevelService } from 'app/entities/level';
import { ILevel } from 'app/shared/model/level.model';
import { BadgeService } from 'app/entities/badge';
import { IBadge } from 'app/shared/model/badge.model';
import { IDimension } from 'app/shared/model/dimension.model';
import { DimensionService } from 'app/entities/dimension';
import 'simplebar';
import { Subject } from 'rxjs/Subject';

@Component({
    selector: 'jhi-persons-skills',
    templateUrl: './persons-skills.component.html',
    styleUrls: ['persons-skills.scss']
})
export class PersonsSkillsComponent implements OnInit, OnChanges {
    @Input() person: IPerson;
    @Input() skill: IAchievableSkill;
    @Input() iSkills: ISkill[];
    @Output() onSkillClicked = new EventEmitter<{ iSkill: ISkill; aSkill: AchievableSkill }>();
    @Output() onSkillChanged = new EventEmitter<{ iSkill: ISkill; aSkill: AchievableSkill }>();
    skills: IAchievableSkill[];
    filters: string[];
    levelId: number;
    badgeId: number;
    activeBadge: IBadge;
    activeLevel: ILevel;
    activeDimension: IDimension;
    activeSkill: ISkill;
    search$: Subject<string>;
    search: string;

    constructor(
        private personsSkillsService: PersonsSkillsService,
        private skillService: SkillService,
        private jhiAlertService: JhiAlertService,
        private parseLinks: JhiParseLinks,
        private personsSelectionService: PersonsSelectionService,
        private storage: SessionStorageService,
        private route: ActivatedRoute,
        private location: Location,
        private router: Router,
        private breadcrumbService: BreadcrumbService,
        private levelService: LevelService,
        private badgeService: BadgeService,
        private dimensionService: DimensionService
    ) {}

    ngOnInit() {
        this.filters = this.getFiltersFromStorage();
        this.skills = [];
        this.route.queryParamMap.subscribe((params: ParamMap) => {
            const levelId = this.getParamAsNumber('level', params);
            const badgeId = this.getParamAsNumber('badge', params);
            this.levelId = levelId ? levelId : null;
            this.badgeId = badgeId ? badgeId : null;
            this.loadAll();
        });
        this.search = '';
        this.search$ = new Subject<string>();
        this.search$
            .debounceTime(400)
            .distinctUntilChanged()
            .subscribe(value => {
                this.search = value;
                return value;
            });
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.person && changes.person.previousValue && changes.person.previousValue.id !== changes.person.currentValue.id) {
            this.loadAll();
        }
    }

    private getParamAsNumber(name: string, params: ParamMap) {
        return Number.parseInt(params.get(name));
    }

    loadAll() {
        this.personsSkillsService
            .queryAchievableSkills(this.person.id, {
                filter: this.filters,
                levelId: this.levelId || null,
                badgeId: this.badgeId || null
            })
            .subscribe(
                (res: HttpResponse<IAchievableSkill[]>) => (this.skills = res.body),
                (res: HttpErrorResponse) => this.onError(res.message)
            );

        this.activeBadge = null;
        this.activeLevel = null;
        this.activeDimension = null;
        this.activeSkill = null;

        if (this.badgeId) {
            this.badgeService.find(this.badgeId).subscribe(badge => {
                this.activeBadge = badge.body;
                this.updateBreadcrumb();
            });
        }

        if (this.levelId) {
            this.levelService.find(this.levelId).subscribe(level => {
                this.activeLevel = level.body;
                this.dimensionService.find(this.activeLevel.dimensionId).subscribe(dimension => {
                    this.activeDimension = dimension.body;
                    this.updateBreadcrumb();
                });
            });
        }

        if (this.skill && this.skill.skillId) {
            this.skillService.find(this.skill.skillId).subscribe(skillRes => {
                this.activeSkill = skillRes.body;
                this.updateBreadcrumb();
            });
        }

        this.updateBreadcrumb();
    }

    goToDetails(skill: IAchievableSkill) {
        const queryParams = {};
        if (this.levelId) {
            queryParams['level'] = this.levelId;
        }
        if (this.badgeId) {
            queryParams['badge'] = this.badgeId;
        }
        this.router.navigate(['persons', this.person.mnemonic, 'skills', skill.skillId], {
            queryParams
        });
    }

    private updateBreadcrumb() {
        this.breadcrumbService.setBreadcrumb(this.person, this.activeDimension, this.activeLevel, this.activeBadge, this.activeSkill);
    }

    setComplete(skill: IAchievableSkill) {
        if (!skill.irrelevant) {
            skill.achievedAt = moment();
            this.updateSkill(skill);
        }
    }

    setIncomplete(skill: IAchievableSkill) {
        if (!skill.irrelevant) {
            skill.achievedAt = null;
            this.updateSkill(skill);
        }
    }

    setIrrelevant(skill: IAchievableSkill) {
        skill.irrelevant = true;
        skill.achievedAt = null;
        this.updateSkill(skill);
    }

    setRelevant(skill: IAchievableSkill) {
        skill.irrelevant = false;
        this.updateSkill(skill);
    }

    private updateSkill(skill: IAchievableSkill) {
        this.personsSkillsService.updateAchievableSkill(this.person.id, skill).subscribe(
            (res: HttpResponse<IAchievableSkill>) => {
                skill = res.body;
                this.skillService.find(skill.skillId).subscribe(skillRes => {
                    this.onSkillChanged.emit({
                        iSkill: skillRes.body,
                        aSkill: skill
                    });
                });
                this.loadAll();
            },
            (res: HttpErrorResponse) => {
                console.log(res);
            }
        );
    }

    onFilterClicked(filterName: string) {
        const index = this.filters.indexOf(filterName);
        if (index > -1) {
            this.filters.splice(index, 1);
        } else {
            this.filters.push(filterName);
        }
        this.storage.store('filterKey', this.filters);
        this.loadAll();
    }

    isSamePersonSelected() {
        const selectedPerson = this.personsSelectionService.selectedPerson;
        return selectedPerson && selectedPerson.id === this.person.id;
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    isInSkillDetails() {
        return typeof this.skill !== 'undefined' && this.skill !== null;
    }

    handleSkillClicked(s: IAchievableSkill) {
        if (this.isInSkillDetails()) {
            const url = this.router
                .createUrlTree(['/persons', this.person.mnemonic, 'skills', s.skillId], {
                    queryParams: { level: this.levelId || '', badge: this.badgeId || '' }
                })
                .toString();
            this.location.replaceState(url);
            this.skillService.find(s.skillId).subscribe(skill => {
                this.onSkillClicked.emit({
                    iSkill: skill.body,
                    aSkill: s
                });
                this.breadcrumbService.setBreadcrumb(this.person, this.activeDimension, this.activeLevel, this.activeBadge, skill.body);
            });
        }
    }

    isActiveSkill(s: IAchievableSkill) {
        return this.skill && this.skill.skillId === s.skillId;
    }

    handleSkillChanged(s: IAchievableSkill) {
        this.updateSkill(s);
        this.skills = this.skills.map(skill => {
            return skill.skillId === s.skillId ? s : skill;
        });
        this.loadAll();
    }

    getRateCount(rateCount: number) {
        return rateCount !== null && typeof rateCount !== 'undefined' ? rateCount : 0;
    }

    private getFiltersFromStorage(): string[] {
        return this.storage.retrieve('filterKey') || [];
    }
}
