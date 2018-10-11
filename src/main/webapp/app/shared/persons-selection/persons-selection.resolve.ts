import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { PersonsSelectionService } from 'app/shared/persons-selection/persons-selection.service';
import { Injectable } from '@angular/core';

@Injectable()
export class PersonsSelectionResolve implements Resolve<any> {
    constructor(private personsSelectionService: PersonsSelectionService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.personsSelectionService.query();
    }
}
