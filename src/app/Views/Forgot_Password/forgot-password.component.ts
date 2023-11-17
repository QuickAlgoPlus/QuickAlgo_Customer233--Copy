import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountServicesService } from 'src/app/Services/account-services.service';
import { SessionServicesService } from 'src/app/Services/session-services.service';
import { ToastrServiceServiceService } from 'src/app/Services/toastr-service-service.service';
import { AppConfig } from 'src/app/appconfig';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  ForgotForm: FormGroup = new FormGroup({
    EmailId: new FormControl(),
    CompanyID:new FormControl(),
  })
  companyform: FormGroup = new FormGroup({
    code: new FormControl()
  })
  constructor(private formBuilder: FormBuilder,private appConfig: AppConfig,private router: Router,private AccountServices: AccountServicesService,private sessionService: SessionServicesService,private toastr : ToastrServiceServiceService) { 
    this.ForgotForm = formBuilder.group({
      EmailId: ['', [Validators.required, Validators.pattern(/^[a-z][A-Za-z0-9\.\_]+@[A-Za-z]*.{2}[a-z\.]{2,4}[a-zA-Z]{2,4}$/)]]
    });
  }

  ngOnInit(): void {
    this.PostCustBrokerStatuslist()
    setTimeout(()=>{
      console.clear();
    },1500)
  }

  get f() {
    return this.ForgotForm.controls;
  }

  isSubmitted:any;
  Forgotpassword(): any {
    $('#preloader').css('display','block')
          $('[data-loader="circle-side"]').css('display','block')
        this.isSubmitted = true;
        var input = JSON.parse(JSON.stringify(this.ForgotForm.getRawValue()));
        input.DeviceNo = "";
        input.CompanyID=this.appConfig.copanyidpass
      this.AccountServices.ForgotPassword(input).subscribe(res => {
        setTimeout(() => {
          $('[data-loader="circle-side"]').fadeOut(); 
          $('#preloader').delay(350).fadeOut('slow');
        }, 300);
        if(res != null && res != ""){
          this.sessionService.saveSession(res);
          this.router.navigate(['login']);
          this.toastr.SuccessToastr("Success");
        }else{
          setTimeout(() => {
            $('[data-loader="circle-side"]').fadeOut(); 
            $('#preloader').delay(350).fadeOut('slow');
          }, 300);
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
