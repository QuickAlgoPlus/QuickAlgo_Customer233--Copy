import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountServicesService } from 'src/app/Services/account-services.service';
import { SessionServicesService } from 'src/app/Services/session-services.service';
import { ToastrServiceServiceService } from 'src/app/Services/toastr-service-service.service';
import { AppConfig } from 'src/app/appconfig';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  companyform: FormGroup = new FormGroup({
    code: new FormControl()
  })
  SignUpForm: FormGroup = new FormGroup({
    EmailId: new FormControl(),
    FullName: new FormControl(),
    EncryptedPassword: new FormControl(),
    Mobile: new FormControl(),
    CompanyID:new FormControl()
    //Address: new FormControl(),
  })
  constructor(private formBuilder: FormBuilder,private appConfig: AppConfig,private router: Router,private AccountServices: AccountServicesService,private sessionService: SessionServicesService,private toastr : ToastrServiceServiceService ) { 
    this.SignUpForm = formBuilder.group({
      EmailId: ['', [Validators.required, Validators.pattern(/^[A-Za-z0-9\.\_]+@[A-Za-z]*.{2}[a-z\.]{2,4}[a-zA-Z]{2,4}$/)]],
      FullName: ['',Validators.required],
      EncryptedPassword:['',Validators.required],
      Mobile:['',Validators.required],
      //Address:['',Validators.required],
    });
  }

  ngOnInit(): void {
    this.PostCustBrokerStatuslist()
    setTimeout(()=>{
      console.clear();
    },1500)
  }

  get f() {
    return this.SignUpForm.controls;
  }


  isSubmitted:any;
  createUser(): any {
    $('#preloader').css('display','block')
          $('[data-loader="circle-side"]').css('display','block')
        this.isSubmitted = true;
        
        if(this.SignUpForm.valid){
          var input = JSON.parse(JSON.stringify(this.SignUpForm.getRawValue()));
          input.EmailId=input.EmailId.toLowerCase()
        input.CompanyID=this.appConfig.copanyidpass
      this.AccountServices.SignUp(input).subscribe(res => {
        if(res == "Success"){
          setTimeout(() => {
            $('[data-loader="circle-side"]').fadeOut(); 
            $('#preloader').delay(350).fadeOut('slow');
          }, 300);
          
            this.toastr.SuccessToastr("Success");
          
          setTimeout(() => {
          this.router.navigate(['login'])
          .then(() => {
            window.location.reload();
          });
        }, 1000);
        }else{
          setTimeout(() => {
            $('[data-loader="circle-side"]').fadeOut(); 
            $('#preloader').delay(350).fadeOut('slow');
          }, 300);
          this.toastr.ErrorToastr(res);
        }

        // if(res === "Email or mobile is already exists"){
        //   this.toastr.ErrorToastr("Email or mobile is already exists.");
        //  this.toastr.ErrorToastr(res);
        // }
        // $('#loader').hide();
        // if (res.status) {
        //   if (res.data.userType == 1) {
        //     this.sessionService.saveSession(res.data);
        //       this.router.navigate(['Dashboard']);
        //   } else {
        //       this.router.navigate(['/']);
        //   }
        // }
        // else {
        //   // this.toastr.ErrorToastr(res.message);
        // }
      },
        (err: any) => {
          // $('#loader').hide();
          if (err.status == 401) {
            this.router.navigate(['/']);
          }
          else {
            // this.toastr.ErrorToastr("Something Wrong.");
          }
        })
      }
      else{
        setTimeout(() => {
          $('[data-loader="circle-side"]').fadeOut(); 
          $('#preloader').delay(350).fadeOut('slow');
        }, 300);
        
          this.toastr.ErrorToastr("Please try again.");
        
      }
       
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
