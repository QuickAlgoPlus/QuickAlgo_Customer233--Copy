import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountServicesService } from 'src/app/Services/account-services.service';
import { SessionServicesService } from 'src/app/Services/session-services.service';
import { ToastrServiceServiceService } from 'src/app/Services/toastr-service-service.service';

@Component({
  selector: 'app-funds',
  templateUrl: './funds.component.html',
  styleUrls: ['./funds.component.scss']
})
export class FundsComponent implements OnInit {

  Depositform: FormGroup = new FormGroup({
    Amount: new FormControl()
  })
  constructor(private formBuilder: FormBuilder,private router: Router,private AccountServices: AccountServicesService,private sessionService: SessionServicesService,private toastr : ToastrServiceServiceService ) {
    this.Depositform = formBuilder.group({
      Amount: ['', Validators.required],
    }); 
   }
   Name:any;
  ngOnInit(): void {
    this.Name = this.sessionService.getUsername();
    setTimeout(()=>{
      console.clear();
    },1500)
  }
  isSubmitted:any;
  depositadd(): any {
        this.isSubmitted = true;
        var input = JSON.parse(JSON.stringify(this.Depositform.getRawValue()));
        input.CustomerId = this.sessionService.getcustomerID();
        this.AccountServices.Deposit(input).subscribe(res => {
        if(res != null && res != ""){
          //this.sessionService.saveSession(res);
          this.router.navigate(['Dashboard']);
          this.toastr.SuccessToastr("your fund has been deposit");
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
