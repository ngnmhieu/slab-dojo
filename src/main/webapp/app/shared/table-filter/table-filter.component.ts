import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';

export interface TableField {
    name: string;
    filter: boolean;
    operator?: string;
}

export interface FilterQuery {
    fieldName: string;
    query: string;
    operator: string;
}

@Component({
    selector: 'tr[jhi-table-filter]',
    templateUrl: './table-filter.component.html',
    styleUrls: ['./table-filter.scss']
})
export class TableFilterComponent implements OnInit {
    @Input() fields: TableField[];

    @Output() onFilterChanged = new EventEmitter<FilterQuery[]>();

    filterChanged: Subject<FilterQuery[]> = new Subject();

    private filterInputs: { [k: string]: string } = {};

    private filterOperators: { [k: string]: string } = {};

    constructor() {
        this.filterChanged.debounceTime(500).subscribe(query => this.onFilterChanged.emit(query));
    }

    ngOnInit(): void {
        this.fields.forEach(f => {
            this.filterOperators[f.name] = f.operator;
        });
    }

    updateFilter() {
        const query: FilterQuery[] = Object.keys(this.filterInputs)
            .filter(field => this.filterInputs[field] && this.filterInputs[field] !== '')
            .map(
                field =>
                    <FilterQuery>{
                        fieldName: field,
                        query: this.filterInputs[field],
                        operator: this.filterOperators[field] || 'contains'
                    }
            );
        this.filterChanged.next(query);
    }
}
