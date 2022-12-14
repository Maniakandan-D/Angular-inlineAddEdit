import {ValidatorService} from '../../ngx-material-table/validator.service';
import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import { PersonValidatorService } from '../person-list.validator';
import {TableDataSource} from '../../ngx-material-table/table-data-source';
import {environment} from '../../../environments/environment';
import {Person} from '../person.model';
import {AsyncPersonValidatorService} from './person-list-async.validator';
import {PersonListReactiveFormsComponent} from '../person-list-reative-forms.component';
import {AsyncTableDataSource} from '../../ngx-material-table/async/async-table-data-source';

@Component({
  selector: 'app-person-list-async-reactive-forms',
  providers: [
    {provide: ValidatorService, useClass: AsyncPersonValidatorService }
  ],
  templateUrl: '../person-list-reactive-forms.component.html'
})
export class PersonListAsyncReactiveFormsComponent implements OnInit {

  constructor(private personValidator: ValidatorService) { }

  displayedColumns = ['name', 'age', 'actionsColumn'];

  @Input() personList: Person[];
  @Output() personListChange = new EventEmitter<Person[]>();

  dataSource: AsyncTableDataSource<Person>;

  ngOnInit() {
    this.dataSource = new AsyncTableDataSource<Person>(this.personList || [],
      Person,
      this.personValidator,
      {
        prependNewElements: false,
        suppressErrors: !environment.production
      });

    this.dataSource.datasourceSubject.subscribe(personList => this.personListChange.emit(personList));
  }
}
