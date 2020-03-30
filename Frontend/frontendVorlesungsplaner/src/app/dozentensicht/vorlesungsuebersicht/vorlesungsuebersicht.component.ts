import { Component } from '@angular/core';
import { AppComponent } from '../../app.component';
import { KalenderComponent } from '../../calendar/calendar.component';
import { CalenderData, Week, CalenderDay } from '../../models/calender-models';

@Component({
    selector: 'vorlesungsuebersicht',
    templateUrl: './vorlesungsuebersicht.component.html',
    styleUrls: ['./vorlesungsuebersicht.component.css']
})

export class VorlesungsuebersichtComponent {

    calenderData: CalenderData = {
        weeks: []
    }

    calenderDay: CalenderDay;
}
