import { Component, signal } from '@angular/core';

import { environment } from '@env/environment';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { AuthenticationService } from '@app/auth';
import { ActivatedRoute, Router } from '@angular/router';

@UntilDestroy()
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: false,
})
export class LoginComponent {
  version: string | null = environment.version;
  email: string = '';
  password: string = '';
  isPageReady = signal(false);

  constructor(
    private readonly _router: Router,
    private readonly _route: ActivatedRoute,
    private readonly _authService: AuthenticationService,
  ) {
    window.addEventListener('load', () => {
      this.isPageReady.set(true);
    });
  }
  signin() {
    this._router.navigate([this._route.snapshot.queryParams['redirect'] || '/signin'], { replaceUrl: true }).then(() => {});
  }
  login() {
    this._authService
      .login({
        email: this.email,
        password: this.password,
      })
      .pipe(untilDestroyed(this))
      .subscribe({
        next: (res) => {
          // Navigate to the home page or any other page after successful login.
          if (res) {
            console.log('Login successful', res);
            this._router.navigate([this._route.snapshot.queryParams['redirect'] || '/dashboard'], { replaceUrl: true }).then(() => {
              // Handle the navigation
              console.log('Navigated to dashboard');
            });
          }
        },
        error: (error) => {
          // Handle the error here
        },
      });
  }
}
