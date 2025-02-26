import { inject, Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Logger } from '../services/misc';
import { HotToastService } from '@ngneat/hot-toast';

const log = new Logger('ErrorHandlerInterceptor');

/**
 * Adds a default error handler to all requests.
 */
@Injectable({
  providedIn: 'root',
})
export class ErrorHandlerInterceptor implements HttpInterceptor {
  private readonly _toast = inject(HotToastService);

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError((error) => this._errorHandler(error)));
  }

  private _errorHandler(error: any): Observable<never> {
    if (error instanceof HttpErrorResponse) {
      if (error.error instanceof ErrorEvent) {
        console.error('Error Event');
      } else {
        switch (error.status) {
          case 401: //login
            this._toast.error('Compte inexistant ou mauvais mot de passe', {
              theme: 'snackbar',
              icon: '⚠️',
              position: 'bottom-center',
            });

            //this.router.navigateByUrl("/login");
            break;
          case 403: //forbidden
            //this.router.navigateByUrl("/unauthorized");
            break;
          default:
            this._toast.error(`error status : ${error.status} ${error.statusText}`, {
              theme: 'snackbar',
              icon: '⚠️',
              position: 'bottom-center',
            });
        }
      }
    } else {
      //some thing else happened
    }

    return throwError(() => new Error(error.message || 'Erreur inconnue'));
  }
}
