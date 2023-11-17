import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';


@Injectable({
  providedIn: 'root'
})
export class ToastrServiceServiceService {

  constructor(private toastr:ToastrService) { }
  SuccessToastr(msg:any){
    this.toastr.success(msg);
  }

  ErrorToastr(msg:any){
    this.toastr.error(msg);
  }
}
