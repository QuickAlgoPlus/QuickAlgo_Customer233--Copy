import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountServicesService } from 'src/app/Services/account-services.service';
import { SessionServicesService } from 'src/app/Services/session-services.service';
import { ToastrServiceServiceService } from 'src/app/Services/toastr-service-service.service';
import { AppConfig } from 'src/app/appconfig';

@Component({
  selector: 'app-adminlogin',
  templateUrl: './adminlogin.component.html',
  styleUrls: ['./adminlogin.component.scss']
})
export class AdminloginComponent implements OnInit {
  LoginForm: FormGroup = new FormGroup({
    otp: new FormControl(),
  })
  companyform: FormGroup = new FormGroup({
    code: new FormControl()
  })
  constructor(private formBuilder: FormBuilder,private appConfig: AppConfig,private router: Router,private AccountServices: AccountServicesService,private sessionService: SessionServicesService,private toastr : ToastrServiceServiceService) { 
    this.LoginForm = formBuilder.group({
      otp:['',Validators.required],
    }); 
  }
  get f() {
    return this.LoginForm.controls;
  }
  ngOnInit(): void {
    this.getip();
    this.PostCustBrokerStatuslist()
    setTimeout(()=>{
      console.clear();
    },500)
  }

  IpAdress:any;
getip(){
  this.AccountServices.getIPAddress().subscribe(res => {
    if(res != null && res != ""){
      this.IpAdress = res.ip;
    }else{
      this.IpAdress = "";
    }
  });
}

  isSubmitted:any;
  IsResend:any = false;
  regex:any;
  url:any;
  LoginUser(): any {
    $('#preloader').css('display','block')
          $('[data-loader="circle-side"]').css('display','block')
        this.isSubmitted = true;
        var input = JSON.parse(JSON.stringify(this.LoginForm.getRawValue()));
        input.EmailId = "";
        input.ipAddress = this.IpAdress;
        input.Device=$('#browsername').val();
        if(input.otp != null && input.otp != "" && input.otp != undefined){
          setTimeout(() => {
            $('[data-loader="circle-side"]').fadeOut(); 
            $('#preloader').delay(350).fadeOut('slow');
          }, 300);
          if(window.location.href.slice(window.location.href.indexOf('cid')+4) != null && window.location.href.slice(window.location.href.indexOf('cid')+4) != undefined && window.location.href.slice(window.location.href.indexOf('cid')+4) != ""){
            input.CustomerID  = window.location.href.slice(window.location.href.indexOf('cid')+4);
          }else{
            input.CustomerID  = 0;
          }
          // input.CustomerID = this.sessionService.getcustomerID();
          input.Device=$('#browsername').val();
          input.ipAddress = this.IpAdress;
          this.AccountServices.VerifyOtp(input).subscribe(res => {
            this.sessionService.saveisactive(res);
            this.sessionService.saveallowlogs(res);
            this.sessionService.saveSessionforUserName(res.userName);
            if(res != null && res != "" && res != "InValid"){
              setTimeout(() => {
                $('[data-loader="circle-side"]').fadeOut(); 
                $('#preloader').delay(350).fadeOut('slow');
              }, 300);
              this.sessionService.saveSession(res);
              this.router.navigate(['Dashboard'])
              .then(() => {
                this.toastr.SuccessToastr("Success");
                window.location.reload();
              });
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
      ResendOtpfun(){
        let CustomerID = this.sessionService.getcustomerID();
        this.AccountServices.ResendOtp(CustomerID).subscribe(res => {
          if(res != null && res != ""){
           this.toastr.SuccessToastr("Success");
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
