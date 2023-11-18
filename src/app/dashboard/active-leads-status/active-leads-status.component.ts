import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/services/dashboard.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-active-leads-status',
  templateUrl: './active-leads-status.component.html',
  styleUrls: ['./active-leads-status.component.scss'],
})
export class ActiveLeadsStatusComponent implements OnInit {
  data: any;
  constructor(
    private loginService: LoginService,
    private service: DashboardService
  ) {}

  ngOnInit(): void {
    const token = this.loginService.getToken();
    const userId = this.loginService.getUserId();
    this.service.getActiveLeadsStatus(token, userId).subscribe((res: any) => {
      this.data = res.data.results;
    });
  }
}
