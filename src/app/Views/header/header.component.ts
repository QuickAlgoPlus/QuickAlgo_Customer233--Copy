import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountServicesService } from 'src/app/Services/account-services.service';
import { SessionServicesService } from 'src/app/Services/session-services.service';
import { ToastrServiceServiceService } from 'src/app/Services/toastr-service-service.service';
import { AppConfig } from 'src/app/appconfig';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  serachForm: FormGroup = new FormGroup({
    text: new FormControl()
  })
  companyform: FormGroup = new FormGroup({
    code: new FormControl()
  })
  title = 'my-project';
  constructor( private sessionService: SessionServicesService,private appConfig: AppConfig,private toastr : ToastrServiceServiceService,private formBuilder: FormBuilder,private router: Router,private AccountServices: AccountServicesService) { 
    this.serachForm = formBuilder.group({
      text: ['', Validators.required],
    });
  }
  
  Name:any;
  customerID:any;
  tempCustometId:any;
  UserName:any;
  Tokan:any;
  allowlogs:any
  ngOnInit(): void {
    this.Name = this.sessionService.getUsername();
    this.UserName = this.sessionService.getUserName1();
    this.customerID = this.sessionService.getcustomerID();
    this.Tokan = this.sessionService.getisactive();
    this.allowlogs = this.sessionService.getallowlogs();
    this.GetNotificationByUserID()
    this.PostCustBrokerStatuslist()
    this.getSubscriptionExpiry()
    setInterval(()=>{
      this.GetNotificationByUserID()
      
    },10000)
    setTimeout(()=>{
      console.clear();
    },2000)
  }

  StoreCategoryID:any;
  SearchWatchlistdata:any;
  StoreSearce :any;
  SearchWatchlist(){
    var input = JSON.parse(JSON.stringify(this.serachForm.getRawValue()));
    let searchtxt = input.text;
    this.StoreSearce = input.text;
    this.AccountServices.SymbolIdentifierByUserID(searchtxt).subscribe(res => {
      if(res != null && res != ""){
        this.SearchWatchlistdata = res.result;
      }else{
        //this.toastr.ErrorToastr("Please try again.");
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
  DeleteWatchlistdata:any;
  DeleteWatchlistData(id:any){
    let Data ={
      SymbolIdentifierId : id
    }
    this.AccountServices.DeleteWatchlist(Data).subscribe(res => {
      if(res != null && res != ""){
        // this.DeleteWatchlistdata = res.result;
        // this.router.navigate(['Market'])
        //       .then(() => {
                this.toastr.SuccessToastr("Success");
                this.GetWatchLists();
                // window.location.reload();
              //});
        
        this.tabchange(this.StoreCategoryID);
        this.serachForm.get("text")?.setValue(this.StoreSearce)
        this.SearchWatchlist()  
        //this.AccountServices.GetDashboardSymbolListByCategory(1);
        //this.router.navigate(['Dashboard']);
        //this.toastr.SuccessToastr("Success");
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
  tabchange(StoreCategoryID: any) {
    throw new Error('Method not implemented.');
  }

  AddWatchlistdata:any;
  AddWatchlistData(id:any,symbolID:any){
    let Data ={
      SymbolIdentifierId : id,
      SymbolID : symbolID,
    }
    this.AccountServices.addWatchlist(Data).subscribe(res => {
      if(res != null && res != ""){
        this.AddWatchlistdata = res.result;
        // this.router.navigate(['Market'])
        //       .then(() => {
                this.toastr.SuccessToastr("Success");
                // window.location.reload();
                this.GetWatchLists();
              //});
        //console.log(this.AddWatchlistdata)
        this.tabchange(this.StoreCategoryID);
        this.serachForm.get("text")?.setValue(this.StoreSearce)
        this.SearchWatchlist()
        // this.toastr.SuccessToastr("Success");
      }else{
        //this.toastr.ErrorToastr("Please try again.");
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

  closemodel(){
    window.location.reload();
  }

  custlogout:any;
  Getcustlogoutdata(){
    this.AccountServices.Getcustlogout().subscribe(res => {
      if(res != null && res != ""){
        this.custlogout = res.result;
        this.sessionService.saveSessioncustomerID(0);
        this.sessionService.clearsession();
        this.sessionService.saveisactive(res.result);
        this.router.navigate(['Dashboard']);
        window.location.reload();
        //this.tabchange(this.StoreCategoryID);
        
        // this.toastr.SuccessToastr("Success");
      }else{
        this.sessionService.saveSessioncustomerID(0);
        this.sessionService.clearsession();
        this.sessionService.saveisactive(res.result);
        this.router.navigate(['Dashboard']);
        window.location.reload();
        //this.toastr.ErrorToastr("Please try again.");
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
  WatchList:any;
  StoresymbolID :any;
  GetWatchLists(){
    let Data ={
      categoryID : this.StoreCategoryID
    }
    this.AccountServices.GetWatchList(Data).subscribe(res => {
      if(res != null && res != ""){
        this.WatchList = res.result;
        //console.log(this.WatchList)
        // this.StoresymbolID = res.result.symbolID;
        // this.toastr.SuccessToastr("Success");
      }else{
        //this.toastr.ErrorToastr("Please try again.");
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
  NotificationByUserID:any
  GetNotificationByUserID(){
    this.AccountServices.GetUnreadNotificationByUserID().subscribe(res => {
      if(res != null && res != ""){
        this.NotificationByUserID = res.result;
        //console.log(this.NotificationByUserID)
        this.GetNotificationallByUserID()
        $('#alert-count1').text(this.NotificationByUserID.length)
        if (this.NotificationByUserID.length == 0) {
          $('#alert-count').css('visibility', 'hidden');
      }
      else if($('#alert-count').text()==""|| $('#alert-count').text()==null){
        $('#alert-count').text(this.NotificationByUserID.length);
      }
      else if($('#alert-count').text()=='0'){
        $('#alert-count').text(this.NotificationByUserID.length);
      }
      else if($('#alert-count').text()>$('#alert-count1').text()){
        $('#alert-count').text(this.NotificationByUserID.length);
        setTimeout(() => {
          $("#songbutton").trigger('click'); 
        }, 1000);
      }
      else {
        //$('#alert-count1').val(this.NotificationByUserID.length)
        if ($('#alert-count').text() != $('#alert-count1').text()) {
          
          $('#alert-count').css('visibility', 'visible');
          $('#alert-count').text(this.NotificationByUserID.length);
          setTimeout(() => {
            $("#songbutton").trigger('click'); 
          }, 1000);
          
      }
      else {
        $('#alert-count').css('visibility', 'visible');
        $('#alert-count').text(this.NotificationByUserID.length);
      }
      }
      $('#alert-countmobile1').text(this.NotificationByUserID.length)
        if (this.NotificationByUserID.length == 0) {
          $('#alert-countmobile').css('visibility', 'hidden');
      }
      else if($('#alert-countmobile').text()==""|| $('#alert-countmobile').text()==null){
        $('#alert-countmobile').text(this.NotificationByUserID.length);
      }
      else if($('#alert-countmobile').text()=='0'){
        $('#alert-count').text(this.NotificationByUserID.length);
      }
      else if($('#alert-countmobile').text()>$('#alert-countmobile1').text()){
        $('#alert-countmobile').text(this.NotificationByUserID.length);
        setTimeout(() => {
          $("#songbutton1").trigger('click'); 
        }, 500);
      }
      else {
        //$('#alert-count1').val(this.NotificationByUserID.length)
        if ($('#alert-countmobile').text() != $('#alert-countmobile1').text()) {
          
          $('#alert-countmobile').css('visibility', 'visible');
          $('#alert-countmobile').text(this.NotificationByUserID.length);
          setTimeout(() => {
            $("#songbutton1").trigger('click'); 
          }, 500);
          
      }
      else {
        $('#alert-count').css('visibility', 'visible');
        $('#alert-count').text(this.NotificationByUserID.length);
      }
      }
        // this.StoresymbolID = res.result.symbolID;
        // this.toastr.SuccessToastr("Success");
      }else{
        //this.toastr.ErrorToastr("Please try again.");
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

  playAudio(){
    // let Data ={
    //   NotificationID : 1,
    //   ReadStatus:1
    // }
    // this.AccountServices.PostNotificationStatus(Data).subscribe(res => {
    //   if(res != null && res != ""){
    //   }else{
    //     //this.toastr.ErrorToastr("Please try again.");
    //   }
    // },
    //   (err: any) => {
    //     if (err.status == 401) {
    //       this.router.navigate(['/']);
    //     }
    //     else {
    //     }
    //   })
    const audio = new Audio('http://client.quickalgoplus.co.in/assets/img/Message.mp3')
    if (audio.paused) {
      //audio.muted = false;
      audio.play();   
  }
}

  NotificationallByUserID:any
  GetNotificationallByUserID(){
    this.AccountServices.GetNotificationByUserID().subscribe(res => {
      if(res != null && res != ""){
        this.NotificationallByUserID = res.result;
        //console.log(this.NotificationByUserID)
        // this.StoresymbolID = res.result.symbolID;
        // this.toastr.SuccessToastr("Success");
      }else{
        //this.toastr.ErrorToastr("Please try again.");
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
  NotificationStatus(id:any){
    let Data ={
      NotificationID : id,
      ReadStatus:1
    }
    this.AccountServices.PostNotificationStatus(Data).subscribe(res => {
      if(res != null && res != ""){
        //this.WatchList = res.result;
        //console.log(this.NotificationallByUserID)
        let values=this.NotificationallByUserID.find(x => x.notificationID == id);
        //console.log(values)
        $('#NotificationSubject').text(values.notificationSubject);
        $('#ActivityDescription').text(values.activityDescription);
        this.GetNotificationByUserID()
        // this.StoresymbolID = res.result.symbolID;
        // this.toastr.SuccessToastr("Success");
      }else{
        //this.toastr.ErrorToastr("Please try again.");
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

  logourl:any
  PostCustBrokerStatuslist() {
    var input= JSON.parse(JSON.stringify(this.companyform.getRawValue()));
      input.code = this.appConfig.copanyidpass
      this.AccountServices.getcinf(input).subscribe(res => {
        if (res != null && res != "") {
          this.logourl=res.result.companyLogo;
          
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
  getSubscriptionExpirymessage:any
  getSubscriptionExpiry() {
      this.AccountServices.getSubscriptionExpirylist().subscribe(res => {
        if (res != null && res != "") {
          this.getSubscriptionExpirymessage=res.message
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
