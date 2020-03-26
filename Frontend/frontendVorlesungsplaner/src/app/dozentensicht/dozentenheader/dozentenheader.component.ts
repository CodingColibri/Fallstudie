import { Component } from '@angular/core';
import { AppComponent } from '../../app.component';
import { MatIconRegistry } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatFormFieldModule} from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { Kurs } from '../../models/kurse-models';

@Component({
    selector: 'dozentenheader',
    templateUrl: './dozentenheader.component.html',
    styleUrls: ['./dozentenheader.component.css']
})

export class DozentenheaderComponent {

    kurse: Kurs[] = [
        {value: 'kursA-0', viewValue: 'WWI 2018A'},
        {value: 'kursB-1', viewValue: 'WWI 2018B'},
        {value: 'kursC-2', viewValue: 'WWI 2018C'}
      ]; 
}
