import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountServicesService } from 'src/app/Services/account-services.service';
import { SessionServicesService } from 'src/app/Services/session-services.service';
import { ToastrServiceServiceService } from 'src/app/Services/toastr-service-service.service';

@Component({
  selector: 'app-mobileotp',
  templateUrl: './mobileotp.component.html',
  styleUrls: ['./mobileotp.component.scss']
})
export class MobileotpComponent implements OnInit {
  LoginForm: FormGroup = new FormGroup({
    MobileNo: new FormControl(),
    otp: new FormControl(),
  })
  constructor(private formBuilder: FormBuilder,private router: Router,private AccountServices: AccountServicesService,private sessionService: SessionServicesService,private toastr : ToastrServiceServiceService ) {
    this.LoginForm = formBuilder.group({
      MobileNo: ['',Validators.required],
      otp:[0],
    });
   }
  ngOnInit(): void {
    setTimeout(()=>{
      console.clear();
    },1500)
  }

  get f() {
    return this.LoginForm.controls;
  }

  isSubmitted:any;
  LoginUser(): any {
        this.isSubmitted = true;
        var input = JSON.parse(JSON.stringify(this.LoginForm.getRawValue()));
        if(input.otp ==0){
        input.DeviceNo = "";
      this.AccountServices.LoginForMobile(input).subscribe(res => {
        if(res != null && res != ""){
          // this.router.navigate(['Dashboard']);
          this.sessionService.saveSessioncustomerID(res);
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
      }else{
        input.CustomerID = this.sessionService.getcustomerID();
        this.AccountServices.VerifyOtp(input).subscribe(res => {
          if(res != null && res != ""){
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
      
}
