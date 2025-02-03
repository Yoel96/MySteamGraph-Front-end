import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthServiceService } from './auth-service.service';
import { catchError, switchMap, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  console.log(req.url);
  if (!req.url.includes('Auth')) {
    const authService = inject(AuthServiceService);
    const newReq = req.clone({
      headers: req.headers.append(
        'Authorization',
        'Bearer '+ localStorage.getItem('accessToken')!
      ),
    });
    return next(newReq).pipe(
      catchError((err) => {
         console.log(err.status)
        if(err.status==401){
        return authService.refresh().pipe(
          switchMap((res) => {
            localStorage.setItem('accessToken', res.accessToken);
            localStorage.setItem('refreshToken', res.refreshToken);
            const newReq = req.clone({
              headers: req.headers.append(
                'Authorization',
                'Bearer '+ localStorage.getItem('accessToken')!
              ),
            });
            return next(newReq);
          }),
          catchError((err)=>{

            return throwError(()=>err)
          })
        );}
        else{
          return throwError(()=>err)
        }
      })
    );
  } else {
    return next(req);
  }
};
