import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountServicesService } from 'src/app/Services/account-services.service';
import { EmittService } from 'src/app/Services/services/emitt.service';
import { SignalrService } from 'src/app/Services/services/signalr.service';
import { SessionServicesService } from 'src/app/Services/session-services.service';
import { ToastrServiceServiceService } from 'src/app/Services/toastr-service-service.service';
import { AppConfig } from 'src/app/appconfig';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
Name:any;
Mobile:any;
Email:any;
Emailall:any;
Emaillast:any;
Nameall:any;
Namelast:any;
Mobileall:any;
Mobilelast:any;
Address:any;
ProfileForm: FormGroup = new FormGroup({
  Mobile: new FormControl(),
  Name: new FormControl(),
  Email: new FormControl(),
  username: new FormControl(),
  //Address: new FormControl(),
})
companyform: FormGroup = new FormGroup({
  code: new FormControl()
})
  constructor(private formBuilder: FormBuilder,private appConfig: AppConfig,public signalRService: SignalrService,private emittService :EmittService,private router: Router,private AccountServices: AccountServicesService,private sessionService: SessionServicesService,private toastr : ToastrServiceServiceService ) {
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
      Mobile: ['', Validators.required],
      Name:['',Validators.required],
      Email:['',Validators.required],
      username:['',Validators.required],
    }); 
   }
   NIFTY50:any;
   NIFTYBANK:any;
   NIFTYFINSERVICE:any;
   UserName:any;
  ngOnInit(): void {
    this.signalRService.startConnection();
this.Name = this.sessionService.getUsername();
this.UserName = this.sessionService.getUserName1();
this.Mobile = this.sessionService.getMobileNo();
this.Email = this.sessionService.getEmail();
this.GetHeaderSymbols()
setTimeout(() =>{ 
  this.GetHeaderSymbols();
},1000);
//this.Address = this.sessionService.getAddress();

this.Emaillast=this.Email.slice(this.Email.length - 4);
this.Emailall=this.Email.slice(0,this.Email.length - 4);
this.Emailall=this.Emailall.replace(this.Emailall,'*****');
this.Email=this.Emailall+this.Emaillast;

this.Mobilelast=this.Mobile.slice(this.Mobile.length - 4);
this.Mobileall=this.Mobile.slice(0,this.Mobile.length - 4);
this.Mobileall=this.Mobileall.replace(this.Mobileall,'*****');
this.Mobile=this.Mobileall+this.Mobilelast;

this.Name

this.ProfileForm.get("Name")?.setValue(this.Name)
this.ProfileForm.get("Mobile")?.setValue(this.Mobile)
this.ProfileForm.get("Email")?.setValue(this.Email)
this.ProfileForm.get("username")?.setValue(this.UserName)
this.GetGroupbycustomer()
this.PostCustBrokerStatuslist()
setTimeout(()=>{
  console.clear();
},1500)
//this.ProfileForm.get("Address")?.setValue(this.Address)
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
  
  GetGroupbycustomerList: any;
  GetGroupbycustomerListcategories: any;
  GetGroupbycustomerListstocks: any;
  GetGroupbycustomerListstratergies: any;
GetGroupbycustomer(): any {
    this.AccountServices.GetGroupbycustomerapi().subscribe(res => {
      if (res != null && res != "") {
        this.GetGroupbycustomerList = res.result;
        var k = this.GetGroupbycustomerList.categories
        var array = k.split(",");
        this.GetGroupbycustomerListcategories=array

        var k1 = this.GetGroupbycustomerList.stocks
        var array1 = k1.split(",");
        this.GetGroupbycustomerListstocks=array1

        var k2 = this.GetGroupbycustomerList.stratergies
        var array2 = k2.split(",");
        this.GetGroupbycustomerListstratergies=array2

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
  Companydetails:any
  PostCustBrokerStatuslist() {
    var input= JSON.parse(JSON.stringify(this.companyform.getRawValue()));
      input.code = this.appConfig.copanyidpass
      this.AccountServices.getcinf(input).subscribe(res => {
        if (res != null && res != "") {
          this.Companydetails=res.result
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
}
