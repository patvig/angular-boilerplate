import { inject, Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { environment } from '@env/environment';
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

  private _errorHandler(error: HttpEvent<any>): Observable<HttpEvent<any>> {
    if (!environment.production) {
      log.error('Request error', error);
    }

    if (error instanceof HttpErrorResponse) {
      if (error.error instanceof ErrorEvent) {
        console.error('Error Event');
      } else {
        this._toast.error(`error status : ${error.status} ${error.statusText}`, {
          theme: 'snackbar',
          icon: '⚠️',
          position: 'bottom-center',
        });
        switch (error.status) {
          case 401: //login
            //this.router.navigateByUrl("/login");
            break;
          case 403: //forbidden
            //this.router.navigateByUrl("/unauthorized");
            break;
        }
      }
    } else {
      //some thing else happened
    }

    throw error;
  }
}
