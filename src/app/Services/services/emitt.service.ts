import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmittService {
  private signalrdata: EventEmitter<any> = new EventEmitter();
  private n500data: EventEmitter<any> = new EventEmitter();
  private orderdata: EventEmitter<any> = new EventEmitter();
  constructor() { }

  public getsignalrDetail() {
    return this.signalrdata;
   }
   public addsignalrDetail(data:any) {
     this.signalrdata.emit(data);
   }

   public getusername() {
    return this.orderdata;
   }
   public getordersignal() {
    return this.orderdata;
   }
   public addordersignals(data:any) {
     this.orderdata.emit(data);
   }
   public addusername(data:any) {
    this.orderdata.emit(data);
  }
   public getn50() {
    return this.n500data;
   }
   public addn50(data:any) {
     this.n500data.emit(data);
   }
  
}
