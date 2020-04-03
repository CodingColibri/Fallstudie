import { Component } from '@angular/core';
import { AppComponent } from '../../app.component';
import { MatIconRegistry } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatFormFieldModule} from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Kurs } from '../../models/kurse-models';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { User } from 'src/app/models/user';
import { first } from 'rxjs/operators';

@Component({
    selector: 'adminheader',
    templateUrl: './adminheader.component.html',
    styleUrls: ['./adminheader.component.css']
})


export class AdminheaderComponent {

  kurse: Kurs[] = [
    {value: 'kursA-0', viewValue: 'WWI 2018A'},
    {value: 'kursB-1', viewValue: 'WWI 2018B'},
    {value: 'kursC-2', viewValue: 'WWI 2018C'}
  ]; 

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
