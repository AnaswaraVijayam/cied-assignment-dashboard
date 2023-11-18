import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DashboardService } from 'src/app/services/dashboard.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-lead-list',
  templateUrl: './lead-list.component.html',
  styleUrls: ['./lead-list.component.scss'],
})
export class LeadListComponent implements OnInit {
  tableTitle = 'Your Table Title';
  tableData: any[] = []; // Replace with your actual data
  searchTerm: string = '';
  @Input() stageType!: string;
  formGroup!: FormGroup;
  tableDatas: any;
  tableHeaders: string[] = [
    'Name',
    'Date added',
    'Current status',
    'Deal value',
    'Probabilit',
    'Team size',
    'Location',
    'Revenue',
    'Category',
  ];
  limit = 10;
  offset = 0;
  constructor(
    private loginService: LoginService,
    private service: DashboardService,
    private fb: FormBuilder
  ) {}
  ngOnInit() {
    this.formGroup = this.fb.group({
      searchText: [],
    });
    const token = this.loginService.getToken();
    const userId = this.loginService.getUserId();
    const paramData = { limit: 10, offset: 0, search: '' };
    this.service
      .getLeadTableData(this.stageType, token, paramData, userId)
      .subscribe((tableData: any) => {
        this.tableDatas = tableData.data.results;
      });
  }
  search() {
    const searchTerm =
      this.formGroup.get('searchText')?.value?.toLowerCase() || '';
    // filter based on name.
    this.tableDatas = this.tableDatas.filter((item: any) =>
      item.name.toLowerCase().includes(searchTerm)
    );
    this.viewAll();
  }
  getProbabilityStyle(probability: number): {
    text: string;
    textColor: string;
    backgroundColor: string;
  } {
    let style: { text: string; textColor: string; backgroundColor: string } = {
      text: '',
      textColor: 'black',
      backgroundColor: '',
    };

    if (probability >= 0 && probability <= 24) {
      style.text = 'Low';
      style.backgroundColor = '#F8CDD9';
      style.textColor = '#8E4358';
    } else if (probability >= 25 && probability <= 49) {
      style.text = 'Medium';
      style.backgroundColor = '#F9D8F8';
      style.textColor = '#853282';
    } else if (probability >= 50 && probability <= 99) {
      style.text = 'High';
      style.backgroundColor = '#C9ECDC';
      style.textColor = '#3C7E60';
    }

    return style;
  }
  viewAll() {
    this.offset += this.limit;
  }
}
