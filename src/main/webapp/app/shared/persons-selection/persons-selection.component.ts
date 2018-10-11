import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PersonsSelectionService } from './persons-selection.service';
import { PersonsService } from 'app/persons/persons.service';
import { IPerson } from 'app/shared/model/person.model';
import { Router } from '@angular/router';

@Component({
    selector: 'jhi-persons-selection',
    templateUrl: './persons-selection.component.html',
    styleUrls: ['./persons-selection.scss']
})
export class PersonsSelectionComponent implements OnInit {
    highlightedPerson: IPerson = null;
    selectedPerson: IPerson;

    persons: IPerson[] = [];

    constructor(
        private activeModal: NgbActiveModal,
        private personsSelectionService: PersonsSelectionService,
        private personsService: PersonsService,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.personsService.query().subscribe(persons => {
            this.persons = persons.body.sort((a, b) => a.mnemonic.localeCompare(b.mnemonic));
        });
        this.personsSelectionService.query().subscribe(selectedPerson => {
            this.selectedPerson = this.highlightedPerson = selectedPerson;
        });
    }

    selectPerson(person: IPerson) {
        this.highlightedPerson = person;
    }

    confirmPerson() {
        this.personsSelectionService.selectedPerson = this.highlightedPerson;
        this.activeModal.close('Person selected');
        this.router.navigate(['persons', this.highlightedPerson.mnemonic]);
    }

    deselectPerson() {
        this.highlightedPerson = null;
        this.personsSelectionService.selectedPerson = null;
        this.activeModal.close('No person selected');
        this.router.navigate(['']);
    }

    createNewPerson() {
        this.activeModal.close('Create new Person');
        this.router.navigate(['/person/new']);
    }

    cancelPersonSelection() {
        this.activeModal.dismiss('Person selected cancelled');
    }
}
