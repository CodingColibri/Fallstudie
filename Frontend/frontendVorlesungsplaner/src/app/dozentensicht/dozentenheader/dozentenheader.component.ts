import { Component } from '@angular/core';
import { AppComponent } from '../../app.component';
import { KursKlasse } from '../../models/kurse-models';
import { User } from '@app/models/user';
import { UserService } from '@app/services/user.service';
import { Router } from '@angular/router';
import { AuthenticationService } from '@app/services/authentication.service';
import { first } from 'rxjs/operators';
import { KursController } from '@app/controller/kurs-controller.service';

@Component({
    selector: 'dozentenheader',
    templateUrl: './dozentenheader.component.html',
    styleUrls: ['./dozentenheader.component.css']
})

export class DozentenheaderComponent {

    loading = false;
    users: User[];
    kurse: KursKlasse[]= [];
  
    constructor(private userService: UserService,
        private router: Router,
        private authenticationService: AuthenticationService,
        public kursController: KursController) {
        this.kursController.kursListe.subscribe((data: KursKlasse[])=> {
        this.kurse = data;
      });
      this.kursController.loadData();
    }
    
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
