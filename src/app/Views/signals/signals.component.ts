import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountServicesService } from 'src/app/Services/account-services.service';
import { EmittService } from 'src/app/Services/services/emitt.service';
import { SignalrService } from 'src/app/Services/services/signalr.service';
import { SessionServicesService } from 'src/app/Services/session-services.service';
import { ToastrServiceServiceService } from 'src/app/Services/toastr-service-service.service';

@Component({
  selector: 'app-signals',
  templateUrl: './signals.component.html',
  styleUrls: ['./signals.component.scss']
})
export class SignalsComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,public signalRService: SignalrService,private emittService :EmittService,private router: Router,private sessionService: SessionServicesService,private AccountServices: AccountServicesService,private toastr : ToastrServiceServiceService) {
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
  NIFTY50:any;
NIFTYBANK:any;
NIFTYFINSERVICE:any;
  ngOnInit(): void {
    this.signalRService.startConnection();
    this.GetSignals();
    this.GetHeaderSymbols()
    setTimeout(() =>{ 
      this.GetHeaderSymbols();
    },1000);
    setTimeout(()=>{
      console.clear();
    },1500)
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

  SignalsList : any;
  GetSignals(): any {
    let filterid:any = $("#txtActive").val();
  this.AccountServices.GetTradeSignals(filterid).subscribe(res => {
    if(res != null && res != ""){
      this.SignalsList = res.result;
      //console.log(this.SignalsList)
    }else{
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

}
