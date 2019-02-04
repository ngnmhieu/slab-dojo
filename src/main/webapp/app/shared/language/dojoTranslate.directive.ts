import { Directive, ElementRef, Input, OnChanges, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { JhiConfigService } from 'ng-jhipster';
import { OrganizationService } from 'app/entities/organization';
import { UserMode } from 'app/shared/model/organization.model';

/**
 * A wrapper directive on top of the translate pipe as the inbuilt translate directive from ngx-translate is too verbose and buggy
 */
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
        let translationKey = this.dojoTranslate;

        if (this.organizationService.getCurrent().userMode == UserMode.PERSON) {
            translationKey = translationKey.replace('teamdojoApp', 'persondojoApp');
        }

        this.translateService.get(translationKey, this.translateValues).subscribe(
            value => {
                this.el.nativeElement.innerHTML = value;
            },
            () => {
                return `${this.configService.getConfig().noi18nMessage}[${this.dojoTranslate}]`;
            }
        );
    }
}
