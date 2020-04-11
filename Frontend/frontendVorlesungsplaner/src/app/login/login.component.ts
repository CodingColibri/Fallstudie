import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AuthenticationService } from '../services/authentication.service';
import { LoginRequest, BackendErrorResponse } from '@app/models/user';
import { HttpErrorResponse } from '@angular/common/http';
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
        if (this.authenticationService.currentUserValue) {
            this.router.navigate(['/']);
        }
    }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            mail: ['', Validators.required],
            password: ['', Validators.required]
        });

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
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

            this.router.navigate([this.returnUrl]);
            console.log(this.returnUrl);
            console.log("Login erfolgreich");
        } catch (err) {
            if (err instanceof HttpErrorResponse) {
                console.error(err);
                const error = err.error as BackendErrorResponse;
                this.error = error.msg;
            } else {
                console.error("Unknown error occured");
                console.error(err);
            }
            this.loading = false;
        }
    }
}
