import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

export interface TableField {
    name: string;
    filter: boolean;
}

export interface FilterQuery {
    fieldName: string;
    query: string;
}

@Component({
    selector: 'tr[jhi-table-filter]',
    templateUrl: './table-filter.component.html',
    styleUrls: ['./table-filter.scss']
})
export class TableFilterComponent {
    @Input() fields: TableField[];

    @Output() onFilterChanged = new EventEmitter<FilterQuery[]>();

    private filterInputs: { [k: string]: string } = {};

    updateFilter() {
        const query: FilterQuery[] = Object.keys(this.filterInputs)
            .filter(field => this.filterInputs[field] && this.filterInputs[field] !== '')
            .map(field => <FilterQuery>{ fieldName: field, query: this.filterInputs[field] });
        this.onFilterChanged.emit(query);
    }
}
