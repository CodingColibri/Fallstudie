import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from './services/authentication.service';
import { User } from './models/user';
import { KursController } from './controller/kurs-controller.service';
import { StudienjahrgangController } from './controller/studienjahrgang-controller.service';
import { SemesterController } from './controller/semester-controller.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontendVorlesungsplaner';

  currentUser: User;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private kursController: KursController,
    private studienJgController: StudienjahrgangController,
    private semesterController: SemesterController
  ) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);

    //Initial load data
    this.kursController.loadData();
    this.studienJgController.loadData();
    this.semesterController.loadData();
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
}
