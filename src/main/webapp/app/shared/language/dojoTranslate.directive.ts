import { Directive, ElementRef, Input, OnChanges, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { JhiConfigService } from 'ng-jhipster';
import { OrganizationService } from 'app/entities/organization';
import { UserMode } from 'app/shared/model/organization.model';

/* tslint:disable directive-selector */
@Directive({
    selector: '[dojoTranslate]'
})
export class DojoTranslateDirective implements OnChanges, OnInit {
    @Input() dojoTranslate: string;
    @Input() translateValues: any;

    constructor(
        private configService: JhiConfigService,
        private el: ElementRef,
        private translateService: TranslateService,
        private organizationService: OrganizationService
    ) {}

    ngOnInit() {
        const enabled = this.configService.getConfig().i18nEnabled;
        if (enabled) {
            this.translateService.onLangChange.subscribe(() => {
                this.getTranslation();
            });
        }
    }

    ngOnChanges() {
        const enabled = this.configService.getConfig().i18nEnabled;

        if (enabled) {
            this.getTranslation();
        }
    }

    private getTranslation() {
        // if person mode: if translation key for person mode exists: use it. else: fallback to team translation.
        if (this.organizationService.getCurrentUserMode() === UserMode.PERSON) {
            // replace key and check if there is a valid translation for this new key
            const personTranslateKey = this.dojoTranslate.replace('teamdojoApp', 'persondojoApp');

            this.translateService.get(personTranslateKey, this.translateValues).subscribe(personValue => {
                // valid translation exists if the response does not contain the key
                if (!personValue.includes(personTranslateKey)) {
                    this.el.nativeElement.innerHTML = personValue;
                } else {
                    // there was no valid translation so we have to fall back to team translation
                    this.translateService.get(this.dojoTranslate, this.translateValues).subscribe(teamValue => {
                        this.el.nativeElement.innerHTML = teamValue;
                    });
                }
            });
        } else {
            this.translateService.get(this.dojoTranslate, this.translateValues).subscribe(teamValue => {
                this.el.nativeElement.innerHTML = teamValue;
            });
        }
    }
}
