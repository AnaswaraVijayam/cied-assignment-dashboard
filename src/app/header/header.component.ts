import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { DashboardService } from '../services/dashboard.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  data: any;
  constructor(
    private loginService: LoginService,
    private service: DashboardService,
    private router: Router
  ) {}
  ngOnInit(): void {
    const token = this.loginService.getToken();
    const userId = this.loginService.getUserId();
    this.service.getUserDetails(token, userId).subscribe((res: any) => {
      this.data = res.data;
    });
  }
  logout() {
    this.loginService.removeData('token');
    this.router.navigate(['/login']);
  }
}
