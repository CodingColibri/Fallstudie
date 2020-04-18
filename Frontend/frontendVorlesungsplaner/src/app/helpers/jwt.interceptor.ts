import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthenticationService } from '../services/authentication.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // Prevent adding token on specific routes
        if (request.url.includes("login") || request.url.includes("register") || request.url.includes("token")) {
            // console.log("Skipping jwt header");
            return next.handle(request);
        }

        console.log("adding jwt header");
        // add authorization header with jwt token if available
        const userToken = this.authenticationService.getUserToken();
        if (userToken && userToken.access_token && !this.authenticationService.isExpired(userToken.access_token)) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${userToken.access_token}`
                }
            });
        }

        return next.handle(request);
    }
}