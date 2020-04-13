import { Component, OnInit } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';
import { ToastService } from 'src/app/services/toast.service';
import { Toast } from 'src/app/models/toast';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
  animations: [
    trigger('flyInOut', [
      state('in', style({
        transform: 'translate(0, 0)', 
        opacity: 1
      })),
      transition('void => *', [
        style({
          transform: 'translate(50%, 10%)', 
          opacity: 0
        }),
        animate(300)
      ]),
      transition('* => void', [
        animate(400, style({
          opacity: 0
        }))
      ])
    ])
  ]
})
export class ToastComponent implements OnInit {

  constructor(public toastService: ToastService) { }

  ngOnInit() { }

  toastClicked(t: Toast) {
    this.toastService.remove(t);
  }
}