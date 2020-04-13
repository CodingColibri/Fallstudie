import { Injectable } from '@angular/core';
import { Toast } from '../models/toast';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  public toasts: Toast[] = [];

  add(type: string, message: string) {
    var t = new Toast(type, message);
    this.toasts.push(t);

    this.clearTimeout(t);
  }

  addWarning(message: string) {
    var t = new Toast("warning", message);
    this.toasts.push(t);

    this.clearTimeout(t);
  }

  addInfo(message: string) {
    var t = new Toast("info", message);
    this.toasts.push(t);

    this.clearTimeout(t);
  }

  addSuccess(message: string) {
    var t = new Toast("success", message);
    this.toasts.push(t);

    this.clearTimeout(t);
  }

  addError(message: string) {
    var t = new Toast("error", message);
    this.toasts.push(t);

    this.clearTimeout(t);
  }

  remove(t: Toast) {
    var index = this.toasts.indexOf(t);
    this.toasts.splice(index, 1);
  }

  clearTimeout(t: Toast) {
    setTimeout(() => {
      var index = this.toasts.indexOf(t);
      this.toasts.splice(index, 1);
    }, environment.toastDelay);
  }

  clear() {
    this.toasts = [];
  }
}