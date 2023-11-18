import { Injectable } from '@angular/core';
import { LoginService } from './login.service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private apiUrl = 'https://assignment.leadtracker.cied.dev/v1/';

  constructor(private http: HttpClient) {}

  getUserDetails(token: string, userId: string) {
    const headers = new HttpHeaders({
      BEARER: token,
      'USER-ID': userId,
    });
    return this.http.get(this.apiUrl + `accounts/user/85NPW/`, { headers });
  }

  getActiveLeadsStatus(token: string, userId: any) {
    const headers = new HttpHeaders({
      BEARER: token,
      'USER-ID': userId,
    });
    return this.http.get(this.apiUrl + `leads/stage/`, { headers });
  }

  getLeadsList(token: string, userId: any) {
    const headers = new HttpHeaders({
      BEARER: token,
      'USER-ID': userId,
    });
    return this.http.get(this.apiUrl + `leads/stage/`, { headers });
  }

  getGraphDetails(stageType: string, token: string, userId: string) {
    const headers = new HttpHeaders()
      .set('BEARER', token)
      .set('USER-ID', userId);

    const params = new HttpParams().set('stage_type', stageType);
    return this.http.get(this.apiUrl + `leads/dashboard/graph/`, {
      headers,
      params,
    });
  }

  getProbability(stageType: string, token: string, userId: string) {
    const headers = new HttpHeaders()
      .set('BEARER', token)
      .set('USER-ID', userId);

    const params = new HttpParams().set('stage_type', stageType);
    return this.http.get(this.apiUrl + `leads/probability/analysis/`, {
      headers,
      params,
    });
  }

  getLeadTableData(
    stageType: string,
    token: string,
    paramsD: any,
    userId: string
  ) {
    const headers = new HttpHeaders({
      BEARER: token,
      'USER-ID': userId,
    });
    const params = new HttpParams()
      .set('stage_type', stageType)
      .set('limit', paramsD.limit)
      .set('offset', paramsD.offset)
      .set('search', paramsD.search)
      .set('ordering', '-probability');
    return this.http.get(this.apiUrl + `leads/`, { headers, params });
  }
}
