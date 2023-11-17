import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountServicesService } from 'src/app/Services/account-services.service';
import { AlertServiceService } from 'src/app/Services/alert-service-service.service';
import { EmittService } from 'src/app/Services/services/emitt.service';
import { SignalrService } from 'src/app/Services/services/signalr.service';
import { SessionServicesService } from 'src/app/Services/session-services.service';
import { ToastrServiceServiceService } from 'src/app/Services/toastr-service-service.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private alerts: AlertServiceService, public signalRService: SignalrService, private emittService: EmittService, private router: Router, private sessionService: SessionServicesService, private AccountServices: AccountServicesService, private toastr: ToastrServiceServiceService) {
    this.emittService.getn50().subscribe(res => {
      this.NIFTY50 = this.sessionService.getNIFTY50();
      this.NIFTYFINSERVICE = this.sessionService.getNIFTYFINSERVICE();
      this.NIFTYBANK = this.sessionService.getNIFTYBANK();
   if (this.NIFTYFINSERVICE != ""){
        this.NIFTYFINSERVICE = JSON.parse(this.NIFTYFINSERVICE);
        
        
    }  
        
      if (this.NIFTY50 != ""){
        this.NIFTY50 = JSON.parse(this.NIFTY50);
        
    }
      if (this.NIFTYBANK != ""){
        this.NIFTYBANK = JSON.parse(this.NIFTYBANK);
        
    }
    })
  }
  Name: any;
  TotalFund: any;
  NIFTY50: any;
  NIFTYBANK: any;
  NIFTYFINSERVICE: any;
  ngOnInit(): void {
    this.UnreadNotificationByUserID()
    this.signalRService.startConnection();
    this.Name = this.sessionService.getUsername();
    this.TotalFund = this.sessionService.getTotalFund();
    this.GetHeaderSymbols()
    setTimeout(() =>{ 
      this.GetHeaderSymbols();
    },1000);
      this.GetNotificationByUserID()
     
    setTimeout(() => {
      console.clear();
    }, 1500)
    
  }
  
  GetHeaderSymbol: any;
 GetHeaderSymbols(): any {
    this.AccountServices.GetHeaderSymbol().subscribe(res => {
      if (res != null && res != "") {
        this.GetHeaderSymbol = res.result;
        setTimeout(()=>{
        this.GetHeaderSymbol.forEach((element, test) => {
          this.signalRService.ordersignalr(element.identifier);
          this.emittService.getordersignal().subscribe(res => {
            let maindata = JSON.parse(res);
            if (maindata != null) {
              let value = this.GetHeaderSymbol.find(x => x.identifier.toLowerCase() == maindata.s2.toLowerCase());
              if(value != null){
              value.lastTradePrice = maindata.s8;
              value.priceChange = maindata.s14;
              }
              //  element.buyPrice = maindata.s4;
              // value.profitLost = naiveRound(value.lastBuyPrice*value.quantity-value.entryPrice*value.quantity,2)
              // function naiveRound(num, decimalPlaces = 0) {
              //   var p = Math.pow(10, decimalPlaces);
              //   return Math.round(num * p) / p;
              // }
            }
          });
        });
      },500)
        
        // this.toastr.SuccessToastr("Success");
      } else {
        this.toastr.ErrorToastr("Please try again.");
      }
    },
      (err: any) => {
        if (err.status == 401) {
          this.router.navigate(['/']);
        }
        else {
        }
      })
  }
  NotificationByUserID:any
  GetNotificationByUserID(){
    this.AccountServices.GetNotificationByUserID().subscribe(res => {
      if(res != null && res != ""){
        this.NotificationByUserID = res.result;
      }else{
        //this.toastr.ErrorToastr("Please try again.");
      }
    },
      (err: any) => {
        if (err.status == 401) {
          this.router.navigate(['/']);
        }
        else {
        }
      })
  }

  getNotificationByUserID:any
  UnreadNotificationByUserID(){
    this.AccountServices.GetUnreadNotificationByUserID().subscribe(res => {
      if(res != null && res != ""){
        this.getNotificationByUserID = res.result;
        this.getNotificationByUserID.forEach(element => {
          this.NotificationStatus(element.notificationID)
          if(this.getNotificationByUserID.length!=0){
            window.location.href="Notifications"
          }
        });
        
      }else{
        //this.toastr.ErrorToastr("Please try again.");
      }
    },
      (err: any) => {
        if (err.status == 401) {
          this.router.navigate(['/']);
        }
        else {
        }
      })
  }

  NotificationStatus(id:any){
    let Data ={
      NotificationID : id,
      ReadStatus:1
    }
    this.AccountServices.PostNotificationStatus(Data).subscribe(res => {
      if(res != null && res != ""){
        //this.UnreadNotificationByUserID()
      }else{
        //this.toastr.ErrorToastr("Please try again.");
       // this.GetNotificationByUserID()
      }
    },
      (err: any) => {
        if (err.status == 401) {
          this.router.navigate(['/']);
        }
        else {
        }
      })
  }
}
