// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
// // import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
// import { Router } from '@angular/router';
// import { AccountServicesService } from 'src/app/Services/account-services.service';
// import { SessionServicesService } from 'src/app/Services/session-services.service';

// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.css']
// })
// export class LoginComponent implements OnInit {
//   loginForm: FormGroup = new FormGroup({
//     email: new FormControl(),
//     userType: new FormControl(),
//     Password: new FormControl(),
//   })
//   constructor(private router: Router, private formBuilder: FormBuilder,private sessionService: SessionServicesService,private AccountServices: AccountServicesService) { 
//     // this.loginForm = formBuilder.group({
//     //   email: ['', [Validators.required, Validators.pattern(/^[a-z][A-Za-z0-9\.\_]+@[A-Za-z]*.{2}[a-z\.]{2,4}[a-zA-Z]{2,4}$/)]],
//     //   userType: [1],
//     //   Password:['',Validators.required]
//     // });
//   }

//   ngOnInit(): void {
//   }

//   isSubmitted:any
//   createUser(): any {
//     this.isSubmitted = true;
//     var input = JSON.parse(JSON.stringify(this.loginForm.getRawValue()));
//   this.AccountServices.login(input).subscribe(res => {
//     // $('#loader').hide();
//     if (res.status) {
//       if (res.data.userType == 1) {
//         this.sessionService.saveSession(res.data);
//           this.router.navigate(['Dashboard']);
//       } else {
//           this.router.navigate(['/']);
//       }
//       // this.toastr.SuccessToastr("Successfully Login.");
//      // $(".table").DataTable().ajax.reload() ;
//     }
//     else {
//       // this.toastr.ErrorToastr(res.message);
//     }
//   },
//     (err: any) => {
//       // $('#loader').hide();
//       if (err.status == 401) {
//         this.router.navigate(['/']);
//       }
//       else {
//         // this.toastr.ErrorToastr("Something Wrong.");
//       }
//     })

   
//   }
// }


import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountServicesService } from 'src/app/Services/account-services.service';
import { SessionServicesService } from 'src/app/Services/session-services.service';
import { ToastrServiceServiceService } from 'src/app/Services/toastr-service-service.service';
import { AppConfig } from 'src/app/appconfig';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  LoginForm: FormGroup = new FormGroup({
    EmailId: new FormControl(),
    Password: new FormControl(),
    otp: new FormControl(),
    CompanyID:new FormControl()
  })
  companyform: FormGroup = new FormGroup({
    code: new FormControl()
  })
  constructor(private formBuilder: FormBuilder,private appConfig: AppConfig,private router: Router,private AccountServices: AccountServicesService,private sessionService: SessionServicesService,private toastr : ToastrServiceServiceService ) {
    this.LoginForm = formBuilder.group({
      EmailId: ['', Validators.required],
      Password:['',Validators.required],
      otp:['',Validators.required],
    }); 
   }
   Tokan:any;
  ngOnInit(): void {
    this.getip();
    this.PostCustBrokerStatuslist()
    setTimeout(()=>{
      console.clear();
    },1500)
  }

  get f() {
    return this.LoginForm.controls;
  }

  isSubmitted:any;
  IsResend:any = false;
IpAdress:any;
getip(){
  this.AccountServices.getIPAddress().subscribe(res => {
    if(res != null && res != ""){
      this.IpAdress = res.ip;
    }else{
      this.IpAdress = "";
    }
    (window.navigator as any).userAgentData
  });
}

  LoginUser(): any {
        this.isSubmitted = true;
        var input = JSON.parse(JSON.stringify(this.LoginForm.getRawValue()));
        input.ipAddress = this.IpAdress;
        input.UserName = input.EmailId;
        input.CompanyID=this.appConfig.copanyidpass
        input.DeviceNo=$('#browsername').val()
        input.EmailId = "";
        if(input.otp != null && input.otp != "" && input.otp != undefined){
          $('#preloader').css('display','block')
          $('[data-loader="circle-side"]').css('display','block')
          input.CustomerID = this.sessionService.getcustomerID();
          input.ipAddress = this.IpAdress;
          input.Device=$('#browsername').val()
          this.AccountServices.VerifyOtp1(input).subscribe(res => {
            setTimeout(() => {
              $('[data-loader="circle-side"]').fadeOut(); 
              $('#preloader').delay(350).fadeOut('slow');
            }, 300);
            console.log(res);
            this.sessionService.saveisactive(res);
            
            if(res.isactive!=true){
              this.router.navigate(['login'])
              .then(() => {
                window.location.reload();
                this.toastr.ErrorToastr("Please try again. ");
              });
            }
            if(res.isactive==true){
            if(res != null && res != ""){
              this.sessionService.saveSession(res);
              this.sessionService.saveSessionforUserName(input.UserName);
              this.router.navigate(['Dashboard'])
              .then(() => {
                
                window.location.reload();
                this.toastr.SuccessToastr("Success");
              });
            }else{
              this.toastr.ErrorToastr("Please try again.");
            }
            }
            
          },
            (err: any) => {
              if (err.status == 401) {
                this.router.navigate(['/']);
                this.toastr.ErrorToastr("Please try again.");
              }
              else {
              }
            })
      
        }else{
      //this.AccountServices.login(input).subscribe(res => {
        //if(res != null && res != ""){
          //console.log(res)
          this.AccountServices.CustGetLogin(input).subscribe(res => {
            if(res != null && res != ""){
              console.log(res.message)
           
          if(res.message=="success"){
            $("#verify-otp").css("display","block");
          $('#request-otp').text("Verify OTP")
          this.IsResend = true;
          this.toastr.SuccessToastr("OTP will be sent to you, Please check the Email");
          this.sessionService.saveSessioncustomerID(res.result.customerID);
            
          }
          else{
            this.toastr.ErrorToastr(res.message);
            $("#verify-otp").css("display","none");
          }
          // console(res)
          // this.router.navigate(['Dashboard'])
          // .then(() => {
          //   this.toastr.SuccessToastr("Success");
          //   window.location.reload();
          // });
            // this.AccountServices.GetPortfolio().subscribe(res => {
            //   if(res != null && res != ""){
            //     this.sessionService.saveSessionforpotfoliyo(res.result);
            //   }else{
            //     this.toastr.ErrorToastr("Please try again.");
            //   }
            // },
            //   (err: any) => {
            //     if (err.status == 401) {
            //       this.router.navigate(['/']);
            //     }
            //     else {
            //     }
            //   })
        }else{
          this.toastr.ErrorToastr("Please try again.");
          $("#verify-otp").css("display","none");
        }
      },
        (err: any) => {
          if (err.status == 401) {
            this.router.navigate(['/']);
            this.toastr.ErrorToastr("Credentials Invalid");
            $('#request-otp').text("Login")
            $("#verify-otp").css("display","none");
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
