import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { KursController } from './controller/kurs-controller.service';
import { StudienjahrgangController } from './controller/studienjahrgang-controller.service';
import { User, UserRoleEnum } from './models/user';
import { AuthenticationService } from './services/authentication.service';
import { DozentenController } from './controller/dozenten-controller.service';


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
    private studienJgController: StudienjahrgangController,
    private dozentenController: DozentenController
  ) {
    this.authenticationService.currentUser.subscribe(user => {
      this.currentUser = user;
      if (user) {
        this.kursController.loadData();
        this.studienJgController.loadData();
        this.dozentenController.loadData();
      }
    });
  }

  get isAdmin() {
    return this.currentUser && this.currentUser.role === UserRoleEnum.Admin;
  }

  public logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
}
