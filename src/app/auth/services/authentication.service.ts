import { Injectable, signal } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { CredentialsService } from '@app/auth';
import { Credentials } from '@core/entities';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

export interface LoginContext {
  email: string;
  password: string;
  remember?: boolean;
  isMobile?: boolean;
}
export interface ResetPasswordRequestContext {
  email: string;
}
export interface ResetPasswordContext {
  password: string;
  token: string;
  email: string;
}
export interface RegisterContext {
  nom: string;
  email: string;
  password: string;
  remember?: boolean;
  isMobile?: boolean;
}

/**
 * Provides a base for authentication workflow.
 * The login/logout methods should be replaced with proper implementation.
 */
@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private apiUrl = environment.apiUrl;
  public currentUser = signal<any | null>(this.getStoredUser());

  constructor(
    private readonly _credentialsService: CredentialsService,
    private http: HttpClient,
  ) {}

  private getStoredUser(): any | null {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
  }

  /**
   * Authenticates the user.
   * @param context The login parameters.
   * @return The user credentials.
   */
  login(context: LoginContext) {
    return this.http.post<any>(`${this.apiUrl}/login_check`, context).pipe(
      map((user) => {
        if (user?.token) {
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUser.set(user);
          const credentials: Credentials = new Credentials({
            token: user.token,
            refreshToken: user.refresh_token,
            expiresIn: 3600,
            email: context.email,
            roles: user.roles,
          });
          this._credentialsService.setCredentials(credentials, context.remember);
          return of(credentials);
        }

        return false;
      }),
    );
  }

  resetPasswordRequest(context: ResetPasswordRequestContext) {
    return this.http.post<any>(`${this.apiUrl}/requestResetPassword`, context).pipe(
      map((reponse) => {
        return reponse;
      }),
    );
  }

  resetPassword(context: ResetPasswordContext) {
    return this.http.post<any>(`${this.apiUrl}/resetpassword`, context).pipe(
      map((reponse) => {
        return reponse;
      }),
    );
  }

  /**
   * Register the user.
   * @param context The login parameters.
   * @return The user credentials.
   */
  register(context: RegisterContext) {
    return this.http.post<any>(`${this.apiUrl}/register`, context).pipe(
      map((reponse) => {
        return reponse.message;
      }),
    );
  }

  /**
   * Logs out the user and clear credentials.
   * @return True if the user was logged out successfully.
   */
  logout(): Observable<any> {
    return of(true);
  }
}
