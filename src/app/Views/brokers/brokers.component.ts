import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountServicesService } from 'src/app/Services/account-services.service';
import { AlertServiceService } from 'src/app/Services/alert-service-service.service';
import { EmittService } from 'src/app/Services/services/emitt.service';
import { SignalrService } from 'src/app/Services/services/signalr.service';
import { SessionServicesService } from 'src/app/Services/session-services.service';
import { ToastrServiceServiceService } from 'src/app/Services/toastr-service-service.service';

@Component({
  selector: 'app-brokers',
  templateUrl: './brokers.component.html',
  styleUrls: ['./brokers.component.scss']
})
export class BrokersComponent implements OnInit {
  BrokerID: any = 1;
  brokerform: FormGroup = new FormGroup({
    BrokerID: new FormControl(),
    AccessToken: new FormControl(),
    ApiUrl: new FormControl(),
    ApiToken: new FormControl(),
    secratKey: new FormControl(),
    ApiKey: new FormControl(),
    ClientCode: new FormControl(),
    Password: new FormControl(),
    RequestToken:new FormControl(),
    TOTP: new FormControl(),
    AppSource:new FormControl(),
    Status: new FormControl(),
    ExpiryDate: new FormControl(),
    CompanyID: new FormControl(),
  })
  brokerStatus: FormGroup = new FormGroup({
    Status: new FormControl(),
    BrokerID : new FormControl(),
    brokerconfigID : new FormControl(),
  })
  constructor(private formBuilder: FormBuilder, private alerts: AlertServiceService,public signalRService: SignalrService, private router: Router, private emittService: EmittService, private sessionService: SessionServicesService, private AccountServices: AccountServicesService, private toastr: ToastrServiceServiceService) {
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
    this.brokerform = formBuilder.group({
      AccessToken: [''],
      secratKey: [''],
      ApiKey: [''],
      ApiToken: [''],
      BrokerID: [''],
      ClientCode: [''],
      Password: [''],
      TOTP: [''],
      RequestToken:[''],
      AppSource:[''],
    });
  }
  NIFTY50: any;
  NIFTYBANK: any;
  NIFTYFINSERVICE: any;
  ngOnInit(): void {
    this.getbroken();
    this.GetBrokerConfig();
    this.signalRService.startConnection();
    this.GetHeaderSymbols()
    setTimeout(() =>{ 
      this.GetHeaderSymbols();
    },1000);
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

  get f() {
    return this.brokerform.controls;
  }

  BrokerConfigList: any;
  GetBrokerConfig(): any {
    let filterid: any = $("#txtActive").val();
    this.AccountServices.GetBrokerConfigList(filterid).subscribe(res => {
      if (res != null && res != "") {
        this.BrokerConfigList = res.result;
        console.log(this.BrokerConfigList);
        // this.toastr.SuccessToastr("Success");
      } else {
        this.toastr.ErrorToastr("Please try again.");
      }
    },
      (err: any) => {
        if (err.status == 401) {
          //this.router.navigate(['/']);
          setTimeout(() => {
            $('[data-loader="circle-side"]').fadeOut(); 
            $('#preloader').delay(350).fadeOut('slow');
          }, 200);
          this.toastr.ErrorToastr("Please try again.");
        }
        else {
        }
      })
  }
  resetForm(): any {
    this.brokerform.controls['BrokerID'].setValue('');
    this.brokerform.controls['ApiToken'].updateValueAndValidity();
    this.brokerform.controls['Password'].updateValueAndValidity();
    this.brokerform.controls['TOTP'].updateValueAndValidity();
    this.brokerform.controls['secratKey'].updateValueAndValidity();
    this.brokerform.controls['ClientCode'].updateValueAndValidity();
    this.brokerform.controls['ApiKey'].updateValueAndValidity();
    this.brokerform.controls['RequestToken'].updateValueAndValidity();
    this.brokerform.controls['AppSource'].updateValueAndValidity();
    this.brokerform.clearValidators();
  }
  setValidations(): any {
    this.brokerform.get("ApiKey")?.addValidators(Validators.required);
    if (this.BrokerID == 1) {
      this.brokerform.get("ClientCode")?.removeValidators(Validators.required);
      this.brokerform.get("Password")?.removeValidators(Validators.required);
      this.brokerform.get("TOTP")?.removeValidators(Validators.required);
      this.brokerform.get("ApiToken")?.addValidators(Validators.required);
      this.brokerform.get("secratKey")?.addValidators(Validators.required);
    } else if (this.BrokerID == 2) {
      this.brokerform.get("ClientCode")?.addValidators(Validators.required);
      this.brokerform.get("Password")?.addValidators(Validators.required);
      this.brokerform.get("secratKey")?.addValidators(Validators.required);
      this.brokerform.get("TOTP")?.addValidators(Validators.required);
      this.brokerform.get("ApiToken")?.removeValidators(Validators.required);
    }
    else if (this.BrokerID == 3) {
      this.brokerform.get("Password")?.removeValidators(Validators.required);
      this.brokerform.get("ApiToken")?.removeValidators(Validators.required);
      this.brokerform.get("secratKey")?.removeValidators(Validators.required);
      this.brokerform.get("ClientCode")?.addValidators(Validators.required);
      this.brokerform.get("TOTP")?.removeValidators(Validators.required);
    }
    else if (this.BrokerID == 6) {
      this.brokerform.get("Password")?.addValidators(Validators.required);
      this.brokerform.get("ApiToken")?.addValidators(Validators.required);
      this.brokerform.get("secratKey")?.addValidators(Validators.required);
      this.brokerform.get("ClientCode")?.addValidators(Validators.required);
      this.brokerform.get("TOTP")?.addValidators(Validators.required);
      this.brokerform.get("RequestToken")?.addValidators(Validators.required);
      this.brokerform.get("ApiKey")?.addValidators(Validators.required);
    }
    this.brokerform.controls['ApiToken'].updateValueAndValidity();
    this.brokerform.controls['Password'].updateValueAndValidity();
    this.brokerform.controls['secratKey'].updateValueAndValidity();
    this.brokerform.controls['ClientCode'].updateValueAndValidity();
    this.brokerform.controls['ApiKey'].updateValueAndValidity();
    this.brokerform.controls['TOTP'].updateValueAndValidity();
  }
  changeBrokerConfig(): any {
    this.brokerform.clearValidators();
    var input = JSON.parse(JSON.stringify(this.brokerform.getRawValue()));
    this.BrokerID = input.BrokerID;
    let finddata = this.BrokerList.find(m => m.brokerID == input.BrokerID);
    $('#Devloper').attr('href', finddata.developerUrl);
    this.setValidations();
    this.ApiKey()
  }

  ClientCode(): any { 
      $('#text-value').attr('href',$('#cars').children(":selected").attr("id")+""+$('#ClientCode').val())
  }

  ApiKey(): any { 
    $('#text-value').attr('href',$('#cars').children(":selected").attr("id")+""+$('#text-value1').val())
  }

  copyMessage(text: string) {
    navigator.clipboard.writeText(text).then().catch(e => console.log(e));
    this.toastr.SuccessToastr("Copied the text");
  }

  isSubmitted: any = false;
  SaveBroken() {
    this.isSubmitted = true;
    $('#preloader').css('display','block')
    $('[data-loader="circle-side"]').css('display','block')
    if (this.brokerform.dirty) {
     
      var input = JSON.parse(JSON.stringify(this.brokerform.getRawValue()));
      let finddata = this.BrokerList.find(m => m.brokerID == input.BrokerID);
      input.RefreshToken = ''
      input.status = true
      input.CompanyID = finddata.companyID
      input.BrokerconfigID = this.StorebrokerconfigID
      this.AccountServices.AddBroker(input).subscribe(res => {
        
        if (res != null && res != "") {
          if (res.status == 201) {
            setTimeout(() => {
              $('[data-loader="circle-side"]').fadeOut(); 
              $('#preloader').delay(350).fadeOut('slow');
            }, 200);
            this.toastr.ErrorToastr(res.message);
          }
          else{
          this.toastr.SuccessToastr("added successfully");
          setTimeout(()=> {
            this.router.navigate(['Brokers'])
            .then(() => {
              
              window.location.reload();
            });
            
          }, 3000);
        }
        } else {
          this.toastr.ErrorToastr("Please try again.");
        }
      },
        (err: any) => {
          setTimeout(() => {
            $('[data-loader="circle-side"]').fadeOut(); 
            $('#preloader').delay(350).fadeOut('slow');
          }, 500);
          setTimeout(function () {
            window.location.reload();
          }, 500);
          if (err.status == 401) {
            this.router.navigate(['/']);
          }
          else {
          }
        })
    }
    
    
  }


  PostCustBrokerStatuslist(id,brokerconfigID) {
    this.alerts.ComfirmAlert("Do you want to Broker Status Deactivate?", "Yes", "No").then(res => {
      if (res.isConfirmed) {
        $('#preloader').css('display','block')
    $('[data-loader="circle-side"]').css('display','block')
    var input= JSON.parse(JSON.stringify(this.brokerStatus.getRawValue()));
      input.BrokerID  = id
      input.brokerconfigID = brokerconfigID
      input.Status = false
      this.AccountServices.PostCustBrokerStatus(input).subscribe(res => {
        
        if (res != null && res != "") {
          this.toastr.SuccessToastr(res.message);
          setTimeout(()=> {
            this.router.navigate(['Brokers'])
            .then(() => {
              
              window.location.reload();
            });
            
          }, 3000);
        } else {
          this.toastr.ErrorToastr("Please try again.");
        }
      },
        (err: any) => {
          setTimeout(() => {
            $('[data-loader="circle-side"]').fadeOut(); 
            $('#preloader').delay(350).fadeOut('slow');
          }, 200);
          if (err.status == 401) {
            //this.router.navigate(['/']);
            this.toastr.ErrorToastr("Please try again.");
          }
          else {
          }
        })
      }
    })
  }

  cencalmodel() {
    this.StorebrokerconfigID = 0;
    this.BrokerID = 1;
    this.brokerform.reset();
  }

  StorebrokerconfigID: any = 0;
  editBrokerfunction(Id: any) {
    let input = {
      ConfigID: Id
    }
    this.AccountServices.GetCustBrokerConfigByID(input).subscribe(res => {
      if (res != null && res != "") {
        this.StorebrokerconfigID = Id;
        this.BrokerID = res.result.brokerID;
        this.brokerform.get("BrokerID")?.setValue(res.result.brokerID);
        this.brokerform.get("ClientCode")?.setValue(res.result.clientCode);
        this.brokerform.get("Password")?.setValue(res.result.password);
        this.brokerform.get("ApiKey")?.setValue(res.result.apiKey);
        this.brokerform.get("ApiToken")?.setValue(res.result.apiToken);
        this.brokerform.get("secratKey")?.setValue(res.result.secratKey);
        this.brokerform.get("RequestToken")?.setValue(res.result.requestToken);
        this.brokerform.get("AppSource")?.setValue(res.result.appSource);
        this.brokerform.markAsDirty();
        this.changeBrokerConfig();
      } else {
        this.toastr.ErrorToastr("Please try again.");
      }
    },
      (err: any) => {
        setTimeout(() => {
          $('[data-loader="circle-side"]').fadeOut(); 
          $('#preloader').delay(350).fadeOut('slow');
        }, 200);
        if (err.status == 401) {
          //this.router.navigate(['/']);
          this.toastr.ErrorToastr("Please try again.");
        }
        else {
        }
      })
  }


  BrokerList: any;
  getbroken(): any {
    let filterid: any = $("#txtActive").val();
    this.AccountServices.GetBrokerMasters(filterid).subscribe(res => {
      if (res != null && res != "") {
        this.BrokerList = res.result;
        console.log(this.BrokerList);
        //document.getElementsByClassName("nice-select")[0].selectedIndex = "0";
        // this.toastr.SuccessToastr("Success");
      } else {
        this.toastr.ErrorToastr("Please try again.");
      }
    },
      (err: any) => {
        setTimeout(() => {
          $('[data-loader="circle-side"]').fadeOut(); 
          $('#preloader').delay(350).fadeOut('slow');
        }, 200);
        if (err.status == 401) {
          //this.router.navigate(['/']);
          this.toastr.ErrorToastr("Please try again.");
        }
        else {
        }
      })
  }

  SaveTOTP(): any {
    var input = JSON.parse(JSON.stringify(this.brokerform.getRawValue()));
      let finddata = this.BrokerList.find(m => m.brokerID == input.BrokerID);
      input.RefreshToken = ''
      input.status = true
      //input.RequestToken=input.ApiToken
      //input.ApiToken=input.RequestToken
      input.CompanyID = finddata.companyID
      input.BrokerconfigID = this.StorebrokerconfigID
    this.AccountServices.getSaveTOTP(input).subscribe(res => {
      if (res != null && res != "") {
        this.toastr.SuccessToastr("TOTP Send Success");
        //document.getElementsByClassName("nice-select")[0].selectedIndex = "0";
        // this.toastr.SuccessToastr("Success");
      } else {
        this.toastr.ErrorToastr("Please try again.");
      }
    },
      (err: any) => {
        setTimeout(() => {
          $('[data-loader="circle-side"]').fadeOut(); 
          $('#preloader').delay(350).fadeOut('slow');
        }, 200);
        if (err.status == 401) {
          //this.router.navigate(['/']);
          this.toastr.ErrorToastr("Please try again.");
        }
        else {
        }
      })
  }

}
