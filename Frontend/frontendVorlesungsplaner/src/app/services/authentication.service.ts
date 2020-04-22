import { Injectable } from '@angular/core';
import { RestService } from '@app/controller/rest.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, Observable } from 'rxjs';
import { LoginRequest, LoginResponse, User, UserTokenData } from '../models/user';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;
    private jwtHelper: JwtHelperService;
    private token: string;

    constructor(private restService: RestService) {
        this.jwtHelper = new JwtHelperService();

        this.token = localStorage.getItem('userToken');
        if (this.token) {
            const tokenData = this.getUserToken();
            this.currentUserSubject = new BehaviorSubject<User>(tokenData.user);
        } else {
            this.currentUserSubject = new BehaviorSubject<User>(null);
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
        const response = await this.restService.login(body);

        localStorage.setItem('userToken', response.access_token);
        this.token = response.access_token;
        const userToken = this.getUserToken();
        this.currentUserSubject.next(userToken.user);

        return response;
    }

    public logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('userToken');
        this.currentUserSubject.next(null);
    }
}