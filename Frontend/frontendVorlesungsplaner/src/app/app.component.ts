import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { KursController } from './controller/kurs-controller.service';
import { StudienjahrgangController } from './controller/studienjahrgang-controller.service';
import { User } from './models/user';
import { AuthenticationService } from './services/authentication.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontendVorlesungsplaner';

  public currentUser: User;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private kursController: KursController,
    private studienJgController: StudienjahrgangController
  ) {
    this.authenticationService.currentUser.subscribe(user => {
      this.currentUser = user;
      this.kursController.loadData();
      this.studienJgController.loadData();
    });
  }

  public logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
}
