import { Directive, ElementRef, Input, OnChanges, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { JhiConfigService } from 'ng-jhipster';
import { OrganizationService } from 'app/entities/organization';
import { UserMode } from 'app/shared/model/organization.model';

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
        const translationKey = this.dojoTranslate;

        // if person mode: if translation key for person mode exists: use it. else: fallback to team translation.
        if (this.organizationService.getCurrentUserMode() === UserMode.PERSON) {
            this.translateService.get(translationKey.replace('teamdojoApp', 'persondojoApp'), this.translateValues).subscribe(
                value => {
                    this.el.nativeElement.innerHTML = value;
                },
                () => {
                    this.translateService.get(translationKey, this.translateValues).subscribe(
                        value => {
                            this.el.nativeElement.innerHTML = value;
                        },
                        () => {
                            return `${this.configService.getConfig().noi18nMessage}[${translationKey}]`;
                        }
                    );
                }
            );
        } else {
            this.translateService.get(translationKey, this.translateValues).subscribe(
                value => {
                    this.el.nativeElement.innerHTML = value;
                },
                () => {
                    return `${this.configService.getConfig().noi18nMessage}[${translationKey}]`;
                }
            );
        }
    }
}
