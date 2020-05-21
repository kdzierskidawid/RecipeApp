import {
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { catchError, map, tap } from 'rxjs/operators';
import { TokenStorage } from './token.storage';
import {Observable, of} from 'rxjs';

const TOKEN_HEADER_KEY = 'Authorization';

@Injectable()
export class Interceptor implements HttpInterceptor {

    constructor(private token: TokenStorage, private router: Router) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let authReq = req;
        if (this.token.getToken() != null) {
            authReq = req.clone({headers: req.headers.set(TOKEN_HEADER_KEY, this.token.getToken())});
            console.log(authReq);
        }

        return next.handle(authReq)
            .pipe(
                tap((event: HttpEvent<any>) => {
                }),
                catchError((err) => {
                    console.log(err);
                    console.log('req url :: ' + req.url);
                    if (err.status === 401) {
                        this.router.navigate(['login']);
                    }
                    return of(err);
                })
            );

    }


}
