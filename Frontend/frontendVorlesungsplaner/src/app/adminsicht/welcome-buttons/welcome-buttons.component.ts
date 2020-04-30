import { Component } from '@angular/core';
import { AppComponent } from '../../app.component';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { first } from 'rxjs/operators';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';

@Component({
    selector: 'welcome-buttons',
    templateUrl: './welcome-buttons.component.html',
    styleUrls: ['./welcome-buttons.component.css']
})

export class WelcomebuttonsComponent {
    loading = false;
    users: User[];

    constructor(private userService: UserService,
                private router: Router,
                private authenticationService: AuthenticationService) { }

    ngOnInit() {
        this.loading = true;
        this.userService.getAll().pipe(first()).subscribe(users => {
            this.loading = false;
            this.users = users;
        });
    }
    logout() {
        this.authenticationService.logout();
        this.router.navigate(['/login']);
    }
}
