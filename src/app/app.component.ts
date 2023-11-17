import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountServicesService } from './Services/account-services.service';
import { SessionServicesService } from './Services/session-services.service';
import { ToastrServiceServiceService } from './Services/toastr-service-service.service';
import { AppConfig } from './appconfig';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  companyform: FormGroup = new FormGroup({
    code: new FormControl()
  })
  constructor( private sessionService: SessionServicesService,private appConfig: AppConfig,private toastr : ToastrServiceServiceService,private formBuilder: FormBuilder,private router: Router,private AccountServices: AccountServicesService) { 
    
  }
  Name:any;
  customerID:any;
  tempCustometId:any;
  UserName:any;
  Tokan:any;
  siteurl:any=window.location.origin
  ngOnInit(): void {
    this.Name = this.sessionService.getUsername();
    this.UserName = this.sessionService.getUserName1();
    this.customerID = this.sessionService.getcustomerID();
    this.Tokan = this.sessionService.getisactive();
    this.PostCustBrokerStatuslist()
    
    if(this.customerID == ""){
      var i= window.location.href
      var k=i.slice(0,i.length - 7);
      var j=i.slice(21,i.length - 0);
      
      if(window.location.href.slice(window.location.href.indexOf('cid')+4) != null && window.location.href.slice(window.location.href.indexOf('cid')+4) != undefined && window.location.href.slice(window.location.href.indexOf('cid')+4) != ""){
        this.tempCustometId = window.location.href.slice(window.location.href.indexOf('cid')+4);
        if(this.tempCustometId>0){
          this.sessionService.saveSessioncustomerID(0);
        }
        else if(window.location.href==this.siteurl+'/signup'){
          this.router.navigate(['/signup'])
        }
        else if(window.location.href==this.siteurl+'/Forgot_Password'){
          this.router.navigate(['/Forgot_Password'])
        }
        else if(k==this.siteurl+'/VerifyOTP'){
          this.router.navigate([j])
        }
        else{
            this.router.navigate(['/login'])
          }
      }else{
            this.router.navigate(['/login'])
      }
    }else if(this.customerID == '0'){
      var i= window.location.href
      var k=i.slice(0,i.length - 7);
      var j=i.slice(21,i.length - 0);
      if(k==this.siteurl+'VerifyOTP'){
        this.sessionService.saveSessioncustomerID('');
        
        //window.location.href=j;
        if(window.location.href.slice(window.location.href.indexOf('cid')+4) != null && window.location.href.slice(window.location.href.indexOf('cid')+4) != undefined && window.location.href.slice(window.location.href.indexOf('cid')+4) != ""){
          this.tempCustometId = window.location.href.slice(window.location.href.indexOf('cid')+4);
          if(this.tempCustometId>0){
           this.sessionService.saveSessioncustomerID('');
            this.customerID==this.tempCustometId
            if(k==this.siteurl+'/VerifyOTP'){
              window.location.href=j
              //this.router.navigate(['/login'])
            }
            else{
              this.router.navigate(['/login'])
            }
           
            
          }
        }
      
        //this.router.navigate([j])
      }
    }else if(this.customerID == null){
      this.router.navigate(['/login'])
      this.sessionService.saveSessioncustomerID('');
    }else{
      var i= window.location.href
      if(i==this.siteurl+'/'){
        this.router.navigate(['/Dashboard'])
      }
      else{
      if(window.location.href.slice(window.location.href.indexOf('cid')+4) != null && window.location.href.slice(window.location.href.indexOf('cid')+4) != undefined && window.location.href.slice(window.location.href.indexOf('cid')+4) != ""){
        this.tempCustometId = window.location.href.slice(window.location.href.indexOf('cid')+4);
        if(this.tempCustometId>0){
          if(this.customerID != "" && this.customerID != 0){
            this.sessionService.saveSessioncustomerID('');
          window.location.reload();
          }
          
        }
      }
    }
    }
  }
  Companydetails:any
  PostCustBrokerStatuslist() {
    var input= JSON.parse(JSON.stringify(this.companyform.getRawValue()));
      input.code = this.appConfig.copanyidpass 
      this.AccountServices.getcinf(input).subscribe(res => {
        if (res != null && res != "") {
          this.Companydetails=res.result
          $('#hrefurl').attr('href',res.result.companyLogo)
          $('#metacontent').attr('content',res.result.companyName)
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
