import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private loginUrl =
    'https://assignment.leadtracker.cied.dev/v1/accounts/login/';

  constructor(private http: HttpClient) {}

  login(data: any) {
    const body = { ...data, device_id: 'fgdg' };
    return this.http.post(this.loginUrl, body);
  }
  setToken(token: string, userId: string): void {
    localStorage.setItem('token', token);
    localStorage.setItem('userId', userId);
  }

  getToken(): any {
    return localStorage.getItem('token');
  }
  getUserId(): any {
    return localStorage.getItem('userId');
  }

  removeData(key: string) {
    localStorage.removeItem(key);
  }
}
