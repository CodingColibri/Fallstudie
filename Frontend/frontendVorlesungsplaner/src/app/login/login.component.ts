import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BackendErrorResponse, LoginRequest } from '@app/models/user';
import { AuthenticationService } from '../services/authentication.service';

@Component({
    selector: 'login',
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.css']
})

export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;
    error = '';

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService
    ) {
        // redirect to home if already logged in
        if (this.authenticationService.currentUserValue != null) {
            if (this.authenticationService.currentUserValue.role == 'admin') {
                this.router.navigate(['/']);
            } else if (this.authenticationService.currentUserValue.role == 'dozent') {
                this.router.navigate(['/dwelcome']);
            }
        }
    }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            mail: ['', Validators.required],
            password: ['', Validators.required]
        });

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams.returnUrl || null;
    }

    // convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }

    public async onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }

        this.loading = true;

        try {
            const body = {
                mail: this.f.mail.value,
                password: this.f.password.value
            } as LoginRequest;
            const response = await this.authenticationService.login(body);
            if (this.returnUrl == null) {
                if (this.authenticationService.currentUserValue.role == 'admin') {
                    this.returnUrl = '/';
                } else if (this.authenticationService.currentUserValue.role == 'dozent') {
                    this.returnUrl = '/dwelcome';
                }
            } else if (this.returnUrl == '/' && this.authenticationService.currentUserValue.role == 'dozent') {
                this.returnUrl = '/dwelcome';
            }
            this.router.navigate([this.returnUrl]);
            console.log(this.returnUrl);
            console.log('Login erfolgreich');
        } catch (err) {
            if (err instanceof HttpErrorResponse) {
                console.error(err);
                const error = err.error as BackendErrorResponse;
                this.error = error.msg;
            } else {
                console.error('Unknown error occured');
                console.error(err);
            }
            this.loading = false;
        }
    }
}
