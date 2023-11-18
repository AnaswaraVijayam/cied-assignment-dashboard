import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private service: LoginService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  login() {
    this.service.login(this.loginForm.value).subscribe(
      (res: any) => {
        if (res.code === 201) {
          const token = res.data.token;
          const userId = res.data.id;
          this.service.setToken(token, userId);
          this.router.navigate(['dashboard']);
        }
      },
      (error: string) => {
        console.error('Login failed:', error);
        // Handle error
      }
    );
  }
}
