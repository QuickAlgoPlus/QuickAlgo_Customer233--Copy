import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountServicesService } from 'src/app/Services/account-services.service';
import { EmittService } from 'src/app/Services/services/emitt.service';
import { SignalrService } from 'src/app/Services/services/signalr.service';
import { SessionServicesService } from 'src/app/Services/session-services.service';
import { ToastrServiceServiceService } from 'src/app/Services/toastr-service-service.service';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.scss']
})
export class ChangepasswordComponent implements OnInit {
  ProfileForm: FormGroup = new FormGroup({
    Currpassword: new FormControl(),
    newPassword : new FormControl(),
    ConfirmPassword: new FormControl()
  })
  constructor(private formBuilder: FormBuilder,public signalRService: SignalrService,private emittService :EmittService,private router: Router,private AccountServices: AccountServicesService,private sessionService: SessionServicesService,private toastr : ToastrServiceServiceService ) {
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
    this.ProfileForm = formBuilder.group({
      Currpassword: ['', Validators.required],
      newPassword:['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]],
      ConfirmPassword:['',[Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]],
    }); 
   }
   Name:any;
   NIFTY50:any;
NIFTYBANK:any;
NIFTYFINSERVICE:any;
   ngOnInit(): void {
    this.signalRService.startConnection();
     this.Name = this.sessionService.getUsername();
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
  isSubmitted:any;
  Changepassword(): any {
        this.isSubmitted = true;
        if($('#newPassword').val()==$('#ConfirmPassword').val()){
        var input = JSON.parse(JSON.stringify(this.ProfileForm.getRawValue()));
        input.CustomerId = this.sessionService.getcustomerID();
        this.AccountServices.ChangePassword(input).subscribe(res => {
        if(res != null && res != ""){
          //this.sessionService.saveSession(res);
          this.router.navigate(['Dashboard']);
          this.toastr.SuccessToastr("Updated Successfully..");
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
      else{
        this.toastr.ErrorToastr("Please try again.");
      }
    }
    
}
