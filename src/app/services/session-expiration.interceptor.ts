import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Injectable()
export class SessionExpirationInterceptor implements HttpInterceptor {
  
  constructor(private router: Router) {}

  //Metodo para validar el login de un usuario, validar token si no esta expirado
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: any) => {
        if (error instanceof HttpErrorResponse && error.status === 401) {
          Swal.fire({
            icon: 'error',
            title: 'Session expired',
            text: 'Your session has expired. Please log in again.'
          });
          this.router.navigate(['/login']);
          localStorage.clear();
        }
        return throwError(error);
      })
    );
  }
}
