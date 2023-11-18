import { Component, Input, OnInit } from '@angular/core';
import * as echarts from 'echarts';
import { DashboardService } from 'src/app/services/dashboard.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss'],
})
export class GraphComponent implements OnInit {
  @Input() stageType!: string;
  graphData: any;

  constructor(
    private loginService: LoginService,
    private service: DashboardService
  ) {}

  ngOnInit(): void {
    const token = this.loginService.getToken();
    const userId = this.loginService.getUserId();
    this.service
      .getGraphDetails(this.stageType, token, userId)
      .subscribe((res: any) => {
        this.initChart(res?.data);
      });
  }

  initChart(data: any): void {
    const xAxisData: string[] = data.graph.map((item: any) => item?.stage_name);
    const yAxisData: number[] = data.graph.map((item: any) => item?.leads);
    const chartDom = document.getElementById('main');
    const myChart = echarts.init(chartDom);

    const option = {
      xAxis: {
        type: 'category',
        data: xAxisData,
        axisLabel: {
          rotate: 20,
        },
      },
      yAxis: {
        type: 'value',
      },
      grid: {
        left: '5%',
        right: '5%',
        bottom: '5%',
        containLabel: true,
      },
      series: [
        {
          data: yAxisData,
          type: 'bar',
        },
      ],
    };

    myChart.setOption(option);
  }
}
