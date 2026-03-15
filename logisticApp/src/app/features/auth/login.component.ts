import { Router } from '@angular/router';
import { AuthService } from './../../core/service/auth.service';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

const PHONE_PATTERN = /^\+998[0-9]{9}$/;

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
})
export class LoginComponent {
  [x: string]: any;
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) {
    this.loginForm = this.fb.nonNullable.group({
      phone: ['', [Validators.required, Validators.pattern(PHONE_PATTERN)]],
      password: ['', Validators.required],
    });
  }

  get phone() {
    return this.loginForm.get('phone');
  }

  get password() {
    return this.loginForm.get('password');
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe((res: any) => {
        this.authService.saveAuth(res);
        this.router.navigate(['/orders']);
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
