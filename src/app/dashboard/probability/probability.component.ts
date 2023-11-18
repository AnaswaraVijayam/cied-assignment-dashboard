import { Component, Input, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/services/dashboard.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-probability',
  templateUrl: './probability.component.html',
  styleUrls: ['./probability.component.scss'],
})
export class ProbabilityComponent implements OnInit {
  @Input() stageType!: string;
  pbData: any;
  constructor(
    private loginService: LoginService,
    private service: DashboardService
  ) {}

  ngOnInit(): void {
    const token = this.loginService.getToken();
    const userId = this.loginService.getUserId();

    this.service
      .getProbability(this.stageType, token, userId)
      .subscribe((pb: any) => {
        this.pbData = pb.data;
      });
  }
}
