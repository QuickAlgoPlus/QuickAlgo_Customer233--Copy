import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { timeout } from 'rxjs';
import { AccountServicesService } from 'src/app/Services/account-services.service';
import { EmittService } from 'src/app/Services/services/emitt.service';
import { SignalrService } from 'src/app/Services/services/signalr.service';
import { SessionServicesService } from 'src/app/Services/session-services.service';
import { ToastrServiceServiceService } from 'src/app/Services/toastr-service-service.service';

@Component({
  selector: 'app-portofolio',
  templateUrl: './portofolio.component.html',
  styleUrls: ['./portofolio.component.scss']
})
export class PortofolioComponent implements OnInit {
  detdata: FormGroup = new FormGroup({
    EstStockPrice1: new FormControl(),
    EstStockPrice2: new FormControl(),
    priceChangePercentage: new FormControl(),
    customSwitchFilleddata1:new FormControl(),
    customSwitchFilleddata:new FormControl()
  })

  changeorder: FormGroup = new FormGroup({
    oredrid: new FormControl(),
  })
  constructor(public signalRService: SignalrService,private emittService :EmittService,private formBuilder: FormBuilder,private router: Router,private sessionService: SessionServicesService,private AccountServices: AccountServicesService,private toastr : ToastrServiceServiceService) {
    this.emittService.getn50().subscribe(res => {
      this.NIFTY50 = this.sessionService.getNIFTY50();
      this.NIFTYFINSERVICE = this.sessionService.getNIFTYFINSERVICE();
      this.NIFTYBANK = this.sessionService.getNIFTYBANK();
      if (this.NIFTYFINSERVICE != ""){
        this.NIFTYFINSERVICE = JSON.parse(this.NIFTYFINSERVICE);

        if(this.NIFTYFINSERVICE.s14>=0){
        $('.text_value').on('DOMSubtreeModified',function(){
          $('.text_value').addClass('green');
        setTimeout(function(){
          $('.text_value').removeClass('green');
        },400)
      });
    }
    else{
      $('.text_value1').on('DOMSubtreeModified',function(){
        $('.text_value1').addClass('red');
      setTimeout(function(){
        $('.text_value1').removeClass('red');
      },400)
    });
      }
    }

      if (this.NIFTY50 != ""){
        this.NIFTY50 = JSON.parse(this.NIFTY50);
        if(this.NIFTY50.s14<0){
        $('.text_value').on('DOMSubtreeModified',function(){
          $('.text_value').addClass('green');
        setTimeout(function(){
          $('.text_value').removeClass('green');
        },400)
      });
    }
    else{
      $('.text_value1').on('DOMSubtreeModified',function(){
        $('.text_value1').addClass('red');
      setTimeout(function(){
        $('.text_value1').removeClass('red');
      },400)
    });
      }
    }
      if (this.NIFTYBANK != ""){
        this.NIFTYBANK = JSON.parse(this.NIFTYBANK);
        if(this.NIFTYBANK.s14<0){
        $('.text_value').on('DOMSubtreeModified',function(){
          $('.text_value').addClass('green');
        setTimeout(function(){
          $('.text_value').removeClass('green');
        },400)
      });
    }
    else{
      $('.text_value1').on('DOMSubtreeModified',function(){
        $('.text_value1').addClass('red');
      setTimeout(function(){
        $('.text_value1').removeClass('red');
      },400)
    });
      }
    }
    })
    this.detdata = formBuilder.group({
      EstStockPrice1: [''],
      EstStockPrice2: [''],
      customSwitchFilleddata1: [''],
      customSwitchFilleddata: ['']
    });
    this.changeorder = formBuilder.group({
      oredrid: [''],
    })
   }
  Name:any;
  TotalFund:any;
  NIFTY50:any;
NIFTYBANK:any;
NIFTYFINSERVICE:any;
totalprofit:any;
menulists:any;
totalcloseprofit:any;
totalrejectprofit:any;
rejectFilterId:any;
closeFilterId:any;
FilterId:any;
  ngOnInit(): void {
    this.signalRService.startConnection();
    this.Name = this.sessionService.getUsername();
    this.TotalFund = this.sessionService.getTotalFund();
    this.totalprofit = this.sessionService.getprofit();
    this.GetSymbolcatdata();
    if(this.totalprofit=="null"){
      $("#pandl").val(0)
    }
    else{
      $("#pandl").val(this.totalprofit)
    }
    this.totalrejectprofit = this.sessionService.getrejectprofit();
    if(this.totalrejectprofit=="null"){
      $("#rejectpandl").val(0)
    }
    else{
      $("#rejectpandl").val(this.totalrejectprofit)
    }

    this.totalcloseprofit = this.sessionService.getcloseprofit();
    if(this.totalcloseprofit=="null"){
      $("#totalcloseprofit").val(0)
    }
    else{
      $("#closepandl").val(this.totalcloseprofit)
    }
    
this.NIFTY50 = this.sessionService.getNIFTY50();
    this.NIFTYFINSERVICE = this.sessionService.getNIFTYFINSERVICE();
    this.NIFTYBANK = this.sessionService.getNIFTYBANK();
    if(this.NIFTYFINSERVICE != "")
    this.NIFTYFINSERVICE = JSON.parse(this.NIFTYFINSERVICE);
    if(this.NIFTY50 != "")
    this.NIFTY50 = JSON.parse(this.NIFTY50);
    if(this.NIFTYBANK != "")
    this.NIFTYBANK = JSON.parse(this.NIFTYBANK);
    setTimeout(() => {
      this.FilterId = this.sessionService.getactiveStock();
    if(this.FilterId=="null"){
      $("#FilterId1").val(0)
    }
    else{
      $("#FilterId1").val(this.FilterId)
    }
    this.rejectFilterId = this.sessionService.getrejectStock();
    if(this.rejectFilterId=="null"){
      $("#rejectFilterId1").val(0)
    }
    else{
      $("#rejectFilterId1").val(this.rejectFilterId)
    }

    this.closeFilterId = this.sessionService.getcloseStock();
    if(this.closeFilterId=="null"){
      $("#closeFilterId1").val(0)
    }
    else{
      $("#closeFilterId1").val(this.closeFilterId)
    }
    this.getRecords_HistoricalList();
this.getRecords_HistoricalList2();
this.getRecords_HistoricalList1();
    }, 500);
setTimeout(() =>{
  this.GetHeaderSymbols()
  this.topmenu()
  
},1500);
setTimeout(()=>{
  
  console.clear();
},2000)
  }

topmenu(){
  this.menulists = this.sessionService.getmenulist();
  for(let i=1;i<=$('.nav-link').length;i++){
    if(1==this.menulists){
      $('#Pending').removeClass('active')
      $('#first').addClass('active')
      $('#endLine').removeClass('active')
      $('#firstLineTitleTab').addClass('active show')
      $('#endLineTitleTab').removeClass('active show')
      $('#PendingTab').removeClass('active show')
    }
    else if(2==this.menulists){
      $('#Pending').addClass('active')
      $('#first').removeClass('active')
      $('#endLine').removeClass('active')
      $('#firstLineTitleTab').removeClass('active show')
      $('#endLineTitleTab').removeClass('active show')
      $('#PendingTab').addClass('active show')
    }
    else if(3==this.menulists){
      $('#Pending').removeClass('active')
      $('#first').removeClass('active')
      $('#endLine').addClass('active')
      $('#firstLineTitleTab').removeClass('active show')
      $('#endLineTitleTab').addClass('active show')
      $('#PendingTab').removeClass('active show')
    }
    else{
      $('#Pending').removeClass('active')
      $('#first').addClass('active')
      $('#endLine').removeClass('active')
      $('#firstLineTitleTab').addClass('active show')
      $('#endLineTitleTab').removeClass('active show')
      $('#PendingTab').removeClass('active show')
    }
  }
}
  GetHeaderSymbol: any;
 GetHeaderSymbols(): any {
    this.AccountServices.GetHeaderSymbol().subscribe(res => {
      if (res != null && res != "") {
        this.GetHeaderSymbol = res.result;
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

  ActiveOrderList : any;
  profitActiveOrderList:any
  totalpl:any=0;
  totalpl1:any=0;
getRecords_HistoricalList(): any {
  var oeder=1
  var categary=$("#FilterId1").val()
  this.totalpl=0
  this.totalpl1=0
  this.AccountServices.getRecords_HistoricalList(oeder,categary).subscribe(res => {
    if (res != null && res != "") {
      this.profitActiveOrderList== res.result;
      this.ActiveOrderList = res.result;
      this.profitorder()
      setTimeout(()=>{
      this.profitActiveOrderList.forEach((element, test) => {
        this.signalRService.ordersignalr(element.identifier);
        this.emittService.getordersignal().subscribe(res => {
          let maindata = JSON.parse(res);
          if (maindata != null) {
            let value = this.profitActiveOrderList.find(x => x.identifier.toLowerCase() == maindata.s2.toLowerCase());
            if(value != null){
              let number = test
              let valdata = maindata.s4;
              //value.profitLost = maindata.s14;
              $('#td_LastBuyPrice_'+number+'_'+value.identifier).text(valdata)
              //$('#td_closedprice_' + number + '_' + element.identifier).text(value.s10)
               if(value.orderType==1){
                var k =  valdata - element.entryPrice
                var i = naiveRound(k, 2) * element.quantity
                let prodata=naiveRound(i, 2)
                //value.profitLost=prodata
                $('#td_profitlost_'+number+'_'+value.identifier).text(prodata)
                if($('#td_profitlost_'+number+'_'+value.identifier).text()>'0'){
                  $('#td_profitlost_'+number+'_'+value.identifier).addClass('green')
                  $('#td_profitlost_'+number+'_'+value.identifier).removeClass('red')
                  $('#td_LastBuyPrice_'+number+'_'+value.identifier).addClass('green')
                  $('#td_LastBuyPrice_'+number+'_'+value.identifier).removeClass('red')
                }
                else{
                  $('#td_profitlost_'+number+'_'+value.identifier).addClass('red')
                  $('#td_profitlost_'+number+'_'+value.identifier).removeClass('green')
                  $('#td_LastBuyPrice_'+number+'_'+value.identifier).addClass('red')
                  $('#td_LastBuyPrice_'+number+'_'+value.identifier).removeClass('green')
                }
               }
              else{
                var k = element.entryPrice - valdata;
                var i = naiveRound(k, 2) * element.quantity
                let prodata=naiveRound(i, 2)
                //value.profitLost=prodata
                $('#td_profitlost_'+number+'_'+value.identifier).text(prodata)
              }
            }
          }
        });
        this.totalpl +=element.profitLost
        if(element.brokerName!='Demo Broker'  && element.brokerName!='Alice Blue'){
          this.totalpl1 +=element.profitLost
        }
        this.totalpl= naiveRound(this.totalpl, 1)
      this.totalpl1= naiveRound(this.totalpl1, 1)
      function naiveRound(num, decimalPlaces = 0) {
        var p = Math.pow(10, decimalPlaces);
        return Math.round(num * p) / p;
      }
      });
    },500)
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
    this.sessionService.saveactiveStock($("#FilterId1").val());
}


closetotalpl:any=0;
closetotalpl1:any=0;
profitActiveOrderList1:any
ActiveOrderList1:any
getRecords_HistoricalList1(): any {
  var oeder=2
  var categary=$("#closeFilterId1").val()
  this.closetotalpl=0
  this.closetotalpl1=0
  this.AccountServices.getRecords_HistoricalList(oeder,categary).subscribe(res => {
    if (res != null && res != "") {
      this.profitActiveOrderList1== res.result;
      this.ActiveOrderList1 = res.result;
      //if(this.profitActiveOrderList1==undefined){
        let elem: any;

        setTimeout(() => {
          elem = $('table');
          elem.DataTable();
         }, 1000);
      //}
      this.profitorder1()
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
    this.sessionService.savecloseStock($("#closeFilterId1").val());
}
ActiveOrderList2:any;
rejecttotalpl1:any=0;
rejecttotalpl:any=0;
profitActiveOrderList2:any
getRecords_HistoricalList2(): any {
  var oeder=3
  var categary=$("#rejectFilterId1").val()
  this.rejecttotalpl=0
  this.rejecttotalpl1=0
  this.AccountServices.getRecords_HistoricalList(oeder,categary).subscribe(res => {
    if (res != null && res != "") {
      this.profitActiveOrderList2== res.result;
      this.ActiveOrderList2 = res.result;
      this.profitorder2()
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
    this.sessionService.saverejectStock($("#rejectFilterId1").val());
}

profitorder(){
  if($("#pandl").val()==1){
  this.profitActiveOrderList=[]
    this.ActiveOrderList.forEach((element, test) => {
      if(element.profitLost>0){
          this.profitActiveOrderList.push(element);
        }

    })
  }
  if($("#pandl").val()==2){
    this.profitActiveOrderList=[]
    this.ActiveOrderList.forEach((element, test) => {
      if(element.profitLost<=0){
        this.profitActiveOrderList.push(element);
      }

    })
    }
    if($("#pandl").val()==0){
      this.profitActiveOrderList=[]
      this.ActiveOrderList.forEach((element, test) => {
        this.profitActiveOrderList.push(element);
      })
    }
    this.sessionService.saveprofit($("#pandl").val());
  }

profitorder1(){
  if($("#closepandl").val()==1){
  this.profitActiveOrderList1=[]
  this.closetotalpl=0
  this.closetotalpl1=0
    this.ActiveOrderList1.forEach((element, test) => {
      if(element.profitLost>0){
          this.profitActiveOrderList1.push(element);
          //this.ActiveOrderList=this.profitActiveOrderList;
          this.closetotalpl +=element.profitLost
        if(element.brokerName!='Demo Broker'  && element.brokerName!='Alice Blue'){
          this.closetotalpl1 +=element.profitLost
        }
        }

    })
  }
  if($("#closepandl").val()==2){
    this.profitActiveOrderList1=[]
    this.closetotalpl=0
    this.closetotalpl1=0
    this.ActiveOrderList1.forEach((element, test) => {
      if(element.profitLost<=0){
        this.profitActiveOrderList1.push(element);
        //this.ActiveOrderList=this.profitActiveOrderList;
        this.closetotalpl +=element.profitLost
        if(element.brokerName!='Demo Broker'  && element.brokerName!='Alice Blue'){
          this.closetotalpl1 +=element.profitLost
        }
      }

    })
    }
    if($("#closepandl").val()==0){
      this.profitActiveOrderList1=[]
      this.closetotalpl=0
      this.closetotalpl1=0
      this.ActiveOrderList1.forEach((element, test) => {
        this.profitActiveOrderList1.push(element);
        //this.ActiveOrderList=this.profitActiveOrderList;
        this.closetotalpl +=element.profitLost
        if(element.brokerName!='Demo Broker'  && element.brokerName!='Alice Blue'){
          this.closetotalpl1 +=element.profitLost
        }
      })
      }
      this.sessionService.savecloseprofit($("#closepandl").val());
      this.closetotalpl= naiveRound(this.closetotalpl, 1)
      this.closetotalpl1= naiveRound(this.closetotalpl1, 1)
      function naiveRound(num, decimalPlaces = 0) {
        var p = Math.pow(10, decimalPlaces);
        return Math.round(num * p) / p;
      }
       // setTimeout(() => {
      //   (<any>$('table')).DataTable();
      // }, 1000);
}
profitorder2(){
  if($("#rejectpandl").val()==1){
  this.profitActiveOrderList2=[]
  this.rejecttotalpl=0
  this.rejecttotalpl1=0
    this.ActiveOrderList2.forEach((element, test) => {
      if(element.profitLost>0){
          this.profitActiveOrderList2.push(element);
          //this.ActiveOrderList=this.profitActiveOrderList;
          this.rejecttotalpl +=element.profitLost
        if(element.brokerName!='Demo Broker'  && element.brokerName!='Alice Blue'){
          this.rejecttotalpl1 +=element.profitLost
        }
        }

    })
  }
  if($("#rejectpandl").val()==2){
    this.profitActiveOrderList2=[]
    this.rejecttotalpl=0
    this.rejecttotalpl1=0
    this.ActiveOrderList2.forEach((element, test) => {
      if(element.profitLost<=0){
        this.profitActiveOrderList2.push(element);
        //this.ActiveOrderList=this.profitActiveOrderList;
        this.rejecttotalpl +=element.profitLost
        if(element.brokerName!='Demo Broker'  && element.brokerName!='Alice Blue'){
          this.rejecttotalpl1 +=element.profitLost
        }
      }

    })
    }
    if($("#rejectpandl").val()==0){
      this.profitActiveOrderList2=[]
      this.rejecttotalpl=0
      this.rejecttotalpl1=0
      this.ActiveOrderList2.forEach((element, test) => {
        this.profitActiveOrderList2.push(element);
        //this.ActiveOrderList=this.profitActiveOrderList;
        this.rejecttotalpl +=element.profitLost
        if(element.brokerName!='Demo Broker'  && element.brokerName!='Alice Blue'){
          this.rejecttotalpl1 +=element.profitLost
        }
      })

      }
      this.sessionService.saverejectprofit($("#rejectpandl").val());
      this.rejecttotalpl= naiveRound(this.rejecttotalpl, 1)
      this.rejecttotalpl1= naiveRound(this.rejecttotalpl1, 1)
      function naiveRound(num, decimalPlaces = 0) {
        var p = Math.pow(10, decimalPlaces);
        return Math.round(num * p) / p;
      }
      // setTimeout(() => {
      //   (<any>$('table')).DataTable();
      // }, 1000);
}

menulist(id:any){
  this.sessionService.savemenulist(id);
}

GetSymbolcatlist:any;
  GetSymbolcatdata(): any {
      this.AccountServices.GetGetSymbolcatAll().subscribe(res => {
        if (res != null && res != "") {
          this.GetSymbolcatlist = res.result;
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
}
