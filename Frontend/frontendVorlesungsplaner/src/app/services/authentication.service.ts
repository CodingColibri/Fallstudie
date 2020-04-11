import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from '../../environments/environment';
import { User, UserTokenData, LoginResponse, LoginRequest } from '../models/user';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;
    private jwtHelper: JwtHelperService;
    private token: string;

    constructor(private http: HttpClient) {
        this.jwtHelper = new JwtHelperService();

        this.token = localStorage.getItem('userToken');
        // this.token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE1ODY1OTY4NDEsIm5iZiI6MTU4NjU5Njg0MSwianRpIjoiOTk3MjRlMzAtYzZiOC00YTMyLTljY2ItMjkxNGFhNGYxNTFjIiwiZXhwIjoxNTg2ODU2MDQxLCJpZGVudGl0eSI6ImRldiIsImZyZXNoIjpmYWxzZSwidHlwZSI6ImFjY2VzcyIsInVzZXJfY2xhaW1zIjp7Im1haWwiOiJkZXYiLCJ0aXRlbCI6bnVsbCwidm9ybmFtZSI6bnVsbCwibmFjaG5hbWUiOm51bGwsInJvbGUiOiJkb3plbnQifX0.UfdJkJiZDAp9A8CQFzBsaj9DIt8bJYsF7kXGJ2fbnKk"
        console.log(this.token);
        if (this.token) {
            const tokenData = this.getUserToken();
            this.currentUserSubject = new BehaviorSubject<User>(tokenData.user);
        } else {
            this.currentUserSubject = new BehaviorSubject<User>(undefined);
        }
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    public getUserToken(): UserTokenData {
        if (!this.token)
            return undefined;

        const tokenUser = this.decodeToken(this.token).user_claims;
        console.log(tokenUser);
        return {
            access_token: this.token,
            user: tokenUser
        } as UserTokenData
    }

    public isExpired(token: string): boolean {
        return this.jwtHelper.isTokenExpired(token);
    }

    public decodeToken(token: string): any {
        return this.jwtHelper.decodeToken(token);
    }

    public async login(body: LoginRequest): Promise<LoginResponse> {
        const response = await this.http.post<LoginResponse>(`${environment.backendUrl}/login`, body).toPromise();
        console.log("Test", response);

        localStorage.setItem('userToken', response.access_token);
        this.token = response.access_token;
        const userToken = this.getUserToken();
        this.currentUserSubject.next(userToken.user);

        console.log("test2")
        return response;
    }

    public logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('userToken');
        this.currentUserSubject.next(null);
    }
}