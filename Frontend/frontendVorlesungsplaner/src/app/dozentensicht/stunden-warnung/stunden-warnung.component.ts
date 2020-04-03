import { Component } from '@angular/core';
import { AppComponent } from '../../app.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'stunden-warnung',
    templateUrl: './stunden-warnung.component.html',
    styleUrls: ['./stunden-warnung.component.css']
})

export class StundenWarnungComponent {
    labelPosition: 'before' | 'after' = 'after';
}