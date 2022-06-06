import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private toastr: ToastrService) {}

  showErr(message: string){
    this.toastr.error(message, 'Error', {
      positionClass: 'toast-bottom-right',
      timeOut: 1500
    })
  }
  showSuccess(message: string){
    this.toastr.success(message, 'Exito', {
      positionClass: 'toast-bottom-right',
      timeOut: 1500
    })
  }
}
