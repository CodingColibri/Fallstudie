import { Component } from '@angular/core';
import { AppComponent } from '../../app.component';
import { Kurs } from '../../models/kurse-models';
import { User } from '@app/models/user';
import { UserService } from '@app/services/user.service';
import { Router } from '@angular/router';
import { AuthenticationService } from '@app/services/authentication.service';
import { first } from 'rxjs/operators';
import { KursController } from '@app/controller/kurs-controller.service';
import { MatSelectChange } from '@angular/material/select';

@Component({
    selector: 'dozentenheader',
    templateUrl: './dozentenheader.component.html',
    styleUrls: ['./dozentenheader.component.css']
})

export class DozentenheaderComponent {

    loading = false;
    public currentUser: User;
    users: User[];
    kurse: Kurs[] = [];

    constructor(private userService: UserService,
                private router: Router,
                private authenticationService: AuthenticationService,
                public kursController: KursController) {
        this.kursController.kursListe.subscribe((kurse: Kurs[]) => {
        this.kurse = kurse;
      });
    }

    ngOnInit() {
        this.loading = true;
        this.currentUser = this.authenticationService.currentUserValue;
    }
    logout() {
        this.authenticationService.logout();
        this.router.navigate(['/login']);
    }
    public changeKurs(event: MatSelectChange) {
        console.log('changeKurs', event);
        this.kursController.setCurrentKurs(event.value);
    }
}
