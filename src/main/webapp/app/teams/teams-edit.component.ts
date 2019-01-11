import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { JhiAlertService } from 'ng-jhipster';

import { ITeam } from 'app/shared/model/team.model';
import { IDimension } from 'app/shared/model/dimension.model';
import { DimensionService } from 'app/entities/dimension';
import { IImage } from 'app/shared/model/image.model';
import { ImageService } from 'app/entities/image';
import { TeamService } from 'app/entities/team';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'jhi-teams-quickedit',
    templateUrl: './teams-edit.component.html',
    styleUrls: ['teams-edit.scss']
})
export class TeamsEditComponent implements OnInit {
    team: ITeam;
    isSaving: boolean;
    images: IImage[];

    constructor(
        private activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private teamService: TeamService,
        private dimensionService: DimensionService,
        private imageService: ImageService,
        private route: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.imageService.query().subscribe(
            (res: HttpResponse<IImage[]>) => {
                this.images = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    cancel() {
        this.activeModal.dismiss('Team edit cancelled');
    }

    save() {
        this.isSaving = true;
        this.subscribeToSaveResponse(this.teamService.update(this.team));
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ITeam>>) {
        result.subscribe((res: HttpResponse<ITeam>) => this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: ITeam) {
        this.isSaving = false;
        this.activeModal.close(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackImageById(index: number, item: IImage) {
        return item.id;
    }
}
