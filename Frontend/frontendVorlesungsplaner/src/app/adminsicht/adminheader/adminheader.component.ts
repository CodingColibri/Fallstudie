import { Component } from '@angular/core';
import { AppComponent } from '../../app.component';
import { MatIconRegistry } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatFormFieldModule} from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { User } from 'src/app/models/user';
import { first } from 'rxjs/operators';
import { KursKlasse } from '@app/models/kurse-models';
import { KursController } from '@app/controller/kurs-controller.service';

@Component({
    selector: 'adminheader',
    templateUrl: './adminheader.component.html',
    styleUrls: ['./adminheader.component.css']
})


export class AdminheaderComponent {
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
