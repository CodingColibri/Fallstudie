import { Component } from '@angular/core';
import { AppComponent } from '../../app.component';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { User } from 'src/app/models/user';
import { first } from 'rxjs/operators';
import { Kurs } from '@app/models/kurse-models';
import { KursController } from '@app/controller/kurs-controller.service';
import { MatSelectChange } from '@angular/material/select';
import { Studienjahrgang } from '@app/models/studienjahrgang-models';
import { StudienjahrgangController } from '@app/controller/studienjahrgang-controller.service';

@Component({
    selector: 'adminheader',
    templateUrl: './adminheader.component.html',
    styleUrls: ['./adminheader.component.css']
})

export class AdminheaderComponent {
    loading = false;
    users: User[];
    kurse: Kurs[] = [];

    constructor(private userService: UserService,
        private router: Router,
        private authenticationService: AuthenticationService,
        public kursController: KursController,
        public studienJgController: StudienjahrgangController) {
        this.kursController.kursListe.subscribe((kurse: Kurs[]) => {
            this.kurse = kurse;
        });
    }

    ngOnInit() {
        this.loading = true;
        this.userService.getAll().pipe(first()).subscribe(users => {
            this.loading = false;
            this.users = users;
        });
    }

    public logout() {
        this.authenticationService.logout();
        this.router.navigate(['/login']);
    }

    public changeKurs(event: MatSelectChange) {
        console.log("changeKurs", event);
        this.kursController.setCurrentKurs(event.value);
    }
}
