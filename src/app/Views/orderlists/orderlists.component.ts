import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountServicesService } from 'src/app/Services/account-services.service';
import { AlertServiceService } from 'src/app/Services/alert-service-service.service';
import { EmittService } from 'src/app/Services/services/emitt.service';
import { SignalrService } from 'src/app/Services/services/signalr.service';
import { SessionServicesService } from 'src/app/Services/session-services.service';
import { ToastrServiceServiceService } from 'src/app/Services/toastr-service-service.service';

@Component({
  selector: 'app-orderlists',
  templateUrl: './orderlists.component.html',
  styleUrls: ['./orderlists.component.scss']
})
export class OrderlistsComponent implements OnInit {
  detdata: FormGroup = new FormGroup({
    EstStockPrice1: new FormControl(),
    EstStockPrice2: new FormControl(),
    priceChangePercentage: new FormControl(),
    customSwitchFilled1: new FormControl(),
    customSwitchFilled2: new FormControl()
  })
  constructor(private formBuilder: FormBuilder, private alerts: AlertServiceService, public signalRService: SignalrService, private emittService: EmittService, private router: Router, private sessionService: SessionServicesService, private AccountServices: AccountServicesService, private toastr: ToastrServiceServiceService) {
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
    this.detdata = formBuilder.group({
      EstStockPrice1: [''],
      EstStockPrice2: [''],
      customSwitchFilled1: [''],
      customSwitchFilled2: ['']
    });
  }
  Name: any;
  TotalFund: any;
  NIFTY50: any;
  NIFTYBANK: any;
  NIFTYFINSERVICE: any;
  ngOnInit(): void {
    this.Name = this.sessionService.getUsername();
    this.TotalFund = this.sessionService.getTotalFund();
    this.GetHeaderSymbols();

    this.GetClosedOrderList();
    this.getRejectedOrderList();
    this.getRejectedOrderListdata();
    this.signalRService.startConnection();
    this.GetActiveOrderList();
    this.GetSymbolcatdata()
    this.GetPendingOrderList()
    setTimeout(() =>{ 
      this.GetActiveOrderList(); 
      this.GetPortfolios();
      
      //this.GetHeaderSymbols();
    },500);
    setTimeout(() =>{ 
      this.GetPendingOrderList()
      this.GetHeaderSymbols();
      this.usernamesocket();
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

  Responcedata: any;
  responcedataget(id: any) {
    let finddata = this.RejectedOrderList.find(m => m.brokerOrderDetailID == id);
    this.Responcedata = finddata.responseData;
  }

  customSwitchFilled(): any {
    if($(".customSwitchFilled5").is(":checked")) {
      $(".SwitchFilled1").css('display','block');
      $(".customSwitchFilleddata").val('true')
  } else {
      $(".SwitchFilled1").css('display','none');
      $(".customSwitchFilleddata").val('false')
  }
};
customSwitchFilled1(): any {
  if($(".customSwitchFilled4").is(":checked")) {
    $(".SwitchFilled").css('display','block');
    $(".customSwitchFilleddata1").val('true')
} else {
    $(".SwitchFilled").css('display','none');
    $(".customSwitchFilleddata1").val('false')
}
};

ActiveOrderList : any;
totalActiveprice:any = 0;
totalActiveprice1:any = 0;
totalisTakeProfit:any = 0;
totalisTakeProfit1:any = 0;
AutoOrderID:any
GetActiveOrderList(): any {
this.AutoOrderID = 0
this.AccountServices.OrderListActive(this.AutoOrderID,"",this.AutoOrderID,this.AutoOrderID).subscribe(res => {
  if (res != null && res != "") {
    this.ActiveOrderList = res.result;
    //this.GetSymbolcatlist();
    //console.log(this.ActiveOrderList)
    if (this.ActiveOrderList != null) {
      setTimeout(()=>{
    this.ActiveOrderList.forEach((element, test) => {
      this.signalRService.ordersignalr(element.identifier);
      this.emittService.getordersignal().subscribe(res => {
        let maindata = JSON.parse(res);
        if (maindata != null) {
          if (this.ActiveOrderList != null) {
          let value = this.ActiveOrderList.find(x => x.identifier.toLowerCase() == maindata.s2.toLowerCase());
          
          if(value != null){
          value.lastBuyPrice = maindata.s8;
          value.high = maindata.s5;
          value.low = maindata.s6;
          value.openPrice = maindata.s9;
          value.closePrice = maindata.s10;
          value.sellPrice = maindata.s11;
          value.totalQtyTraded = maindata.s12;
          value.lastTradePrice = maindata.s8;
          value.priceChangePercentage = maindata.s14;
          value.QuotationLot = maindata.s15;
          //  element.buyPrice = maindata.s4;
          if(value.orderType==1){
          value.profitLost = naiveRound(value.lastBuyPrice * value.quantity - value.entryPrice * value.quantity, 2)
          function naiveRound(num, decimalPlaces = 0) {
            var p = Math.pow(10, decimalPlaces);
            return Math.round(num * p) / p;
          }
        }
        if(value.orderType==2){
          value.profitLost = naiveRound(value.entryPrice * value.quantity - value.lastBuyPrice * value.quantity , 2)
          function naiveRound(num, decimalPlaces = 0) {
            var p = Math.pow(10, decimalPlaces);
            return Math.round(num * p) / p;
          }
        }
       
      }
      this.GetPortfolios();
    }
    
          //console.log(value)
        }
        
      });
    });
  },500)
  }
    //console.log(this.ActiveOrderList)
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

usernamesocket(): any {
  this.signalRService.username(this.Name);
  this.emittService.getusername().subscribe(res => {
    if (res != null && res != "") {
      if(res=='go'){
      window.location.href=""
      }
    }
  })
}

FilterActiveOrder(): any {
  let filterid = $("#FilterId").val();
  let filterid1 = $("#FilterId1").val();
  let filterid2 = $("#FilterId2").val();
  let activeText: any = $("#txtActive").val() ?? "";
  this.AutoOrderID = filterid
  this.AccountServices.OrderListActive(this.AutoOrderID, activeText,filterid2,filterid1).subscribe(res => {
    if (res != null && res != "") {
      this.ActiveOrderList = res.result;
     //console.log(this.ActiveOrderList)
      if (this.ActiveOrderList != null) {
        setTimeout(()=>{
      this.ActiveOrderList.forEach((element, test) => {
        this.signalRService.ordersignalr(element.identifier);
        this.emittService.getordersignal().subscribe(res => {
          let maindata = JSON.parse(res);
          if (maindata != null) {
            if (this.ActiveOrderList != null) {
            let value = this.ActiveOrderList.find(x => x.identifier.toLowerCase() == maindata.s2.toLowerCase());
            if(value != null){
            value.lastBuyPrice = maindata.s4;
            value.high = maindata.s5;
            value.low = maindata.s6;
            value.openPrice = maindata.s9;
            value.closePrice = maindata.s10;
            value.sellPrice = maindata.s11;
            value.totalQtyTraded = maindata.s12;
            value.lastTradePrice = maindata.s8;
            value.priceChangePercentage = maindata.s14;
            value.QuotationLot = maindata.s15;
            //  element.buyPrice = maindata.s4;
            if(value.orderType==1){
              value.profitLost = naiveRound(value.lastBuyPrice * value.quantity - value.entryPrice * value.quantity, 2)
              function naiveRound(num, decimalPlaces = 0) {
                var p = Math.pow(10, decimalPlaces);
                return Math.round(num * p) / p;
              }
            }
            if(value.orderType==2){
              value.profitLost = naiveRound(value.entryPrice * value.quantity - value.lastBuyPrice * value.quantity , 2)
              function naiveRound(num, decimalPlaces = 0) {
                var p = Math.pow(10, decimalPlaces);
                return Math.round(num * p) / p;
              }
            }
            
          }
        }
          }
        });
      });
    },500)
    }
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
currentValue:any=0;
totalInvestment:any=0;
todaysPL1:any=0;
  GetPortfolio : any;
  todaysPL:any=0;
  GetPortfolios() {
      this.totalActiveprice1=0
      if (this.ActiveOrderList != null) {
      this.ActiveOrderList.forEach(element => {
        
        let value = this.ActiveOrderList.find(x => x.identifier.toLowerCase( ) == element.identifier.toLowerCase( ));
       if(value != ""&&value!= undefined && value != null)
       //console.log(this.ActiveOrderList)
      //  this.totalActiveprice = this.totalActiveprice + value.entryPrice * element.quantity;
      //   this.totalisTakeProfit = this.totalisTakeProfit + value.lastBuyPrice * element.quantity;
      this.totalActiveprice1 = this.totalActiveprice1 + value.entryPrice * element.quantity;
        if($('.type'+element.orderID).val()==1){
          this.totalActiveprice = this.totalActiveprice + value.lastBuyPrice * element.quantity;
          this.totalisTakeProfit = this.totalisTakeProfit + value.entryPrice * element.quantity;
          this.todaysPL=this.totalActiveprice-this.totalisTakeProfit;
          //this.totalActiveprice1 = this.totalActiveprice1 + value.entryPrice * element.quantity;
        }
        if($('.type'+element.orderID).val()==2){
          this.totalActiveprice = this.totalActiveprice + value.entryPrice * element.quantity;
          this.totalisTakeProfit = this.totalisTakeProfit + value.lastBuyPrice * element.quantity;
          this.todaysPL=this.totalActiveprice-this.totalisTakeProfit;
          //this.totalActiveprice1 = this.totalActiveprice1 + value.entryPrice * element.quantity;
        }
      
       });
      // if(this.GetPortfolio!=null){
        
             
        this.totalisTakeProfit1 =  this.totalActiveprice1+ this.todaysPL;
        //this.totalActiveprice =  this.totalisTakeProfit1- this.todaysPL;
        this.currentValue = naiveRound(this.totalisTakeProfit1,2);
        this.totalInvestment = naiveRound(this.totalActiveprice1, 2);
        this.todaysPL1= naiveRound(this.todaysPL, 2)
        function naiveRound(num, decimalPlaces = 0) {
          var p = Math.pow(10, decimalPlaces);
          return Math.round(num * p) / p;
        }
      }
    
   // }
      //console.log(this.GetPortfolio);
      this.totalActiveprice = 0;
      this.totalisTakeProfit = 0;
      this.todaysPL=0;
      // this.toastr.SuccessToastr("Success");
    
  }

  RejectedOrderList: any;
  getRejectedOrderList(): any {
    let filterid = $("#rejectedFilterId").val();
    this.AutoOrderID = filterid
    let rejectText: any = $("#txtReject").val() ?? "";
    this.AccountServices.RejectedOrderListdata(this.AutoOrderID, rejectText).subscribe(res => {
      if (res != null && res != "") {
        this.RejectedOrderList = res.result;
        //console.log(this.RejectedOrderList)
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

  RejectedOrderListdata: any;
  getRejectedOrderListdata(): any {
    let filterid = $("#rejectedFilterId").val();
    this.AutoOrderID = filterid
    let rejectText: any = $("#txtReject").val() ?? "";
    this.AccountServices.RejectedOrderList(this.AutoOrderID, rejectText,this.AutoOrderID,this.AutoOrderID).subscribe(res => {
      if (res != null && res != "") {
        this.RejectedOrderListdata = res.result;
        //console.log(this.RejectedOrderList)
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

  GetAllClose() {

    this.alerts.ComfirmAlert("Do you want to Square Off?", "Yes", "No").then(res => {
      if (res.isConfirmed) {
        $('#preloader').css('display','block')
    $('[data-loader="circle-side"]').css('display','block')
        this.ActiveOrderList.forEach(element => {
          let Data = {
            orderID: element.orderID
          }

          this.AccountServices.RoundoffOrders(Data).subscribe(res => {
            if (res != null && res != "") {
              setTimeout(() => {
                $('[data-loader="circle-side"]').fadeOut(); 
                $('#preloader').delay(350).fadeOut('slow');
              }, 200);
              this.GetActiveOrderList();
              this.router.navigate(['OrderList'])
              .then(() => {
                window.location.reload();
              });
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
                this.router.navigate(['/']);
              }
              else {
              }
            })
        });
      }
    })
  }


  checkboxid: any;
  GetRoundoffOrders(): any {
    $('#preloader').css('display','block')
    $('[data-loader="circle-side"]').css('display','block')
    this.checkid.forEach(element => {
      let Data = {
        orderID: element
      }
      this.AccountServices.RoundoffOrders(Data).subscribe(res => {
        if (res != null && res != "") {
          setTimeout(() => {
            $('[data-loader="circle-side"]').fadeOut(); 
            $('#preloader').delay(350).fadeOut('slow');
          }, 200);
          //this.ActiveOrderList = res.result;
          //console.log(res.result)
          this.GetActiveOrderList();
          this.router.navigate(['OrderList'])
              .then(() => {
                window.location.reload();
              });
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
            this.router.navigate(['/']);
          }
          else {
          }
        })
    });
  }

  GetSymbolcatlist:any;
  GetSymbolcatdata(): any {
      this.AccountServices.GetSymbolcat().subscribe(res => {
        if (res != null && res != "") {
          this.GetSymbolcatlist = res.result;
          //console.log(res.result)
          this.GetActiveOrderList();
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

  GetRoundoffOrders1(id): any {
    $('#preloader').css('display','block')
    $('[data-loader="circle-side"]').css('display','block')
      let Data = {
        orderID: id
      }
      this.AccountServices.RoundoffOrders(Data).subscribe(res => {
        if (res != null && res != "") {
          setTimeout(() => {
            $('[data-loader="circle-side"]').fadeOut(); 
            $('#preloader').delay(350).fadeOut('slow');
          }, 200);
         //this.ActiveOrderList = res.result;
          //console.log(res.result)
          this.GetActiveOrderList();
          this.router.navigate(['OrderList'])
          .then(() => {
            window.location.reload();
          });
          // this.toastr.SuccessToastr("Success");
        } else {
          setTimeout(() => {
            $('[data-loader="circle-side"]').fadeOut(); 
            $('#preloader').delay(350).fadeOut('slow');
          }, 200);
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

  checkid: any = [];

  checkboxdata(id: any) {
    this.checkboxid = id;
    this.checkid.push(id);
  }
 

  ClosedOrderList: any;
  GetClosedOrderList(): any {
    let filterid = $("#colosedFilterId").val();
    let filterid1 = $("#colosedFilterId1").val();
    let filterid2 = $("#colosedFilterId2").val();
    this.AutoOrderID = filterid
    let closeText: any = $("#txtClosed").val() ?? "";
    this.AccountServices.OrderListClosed(this.AutoOrderID,closeText,filterid1,filterid2).subscribe(res => {
      if (res != null && res != "") {
        this.ClosedOrderList = res.result;
       //console.log(this.ClosedOrderList.length)
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

  //FilterPendingOrderList: any;
  FilterPendingOrder(): any {
    let filterid = $("#PendingFilterId").val();
    let filterid1 = $("#PendingFilterId1").val();
    let filterid2 = $("#PendingFilterId2").val();
    this.AutoOrderID = filterid
    let closeText: any = $("#txtClosed").val() ?? "";
    this.AccountServices.GetOrderListPending(this.AutoOrderID,closeText,filterid1,filterid2).subscribe(res => {
      if (res != null && res != "") {
        this.PendingOrderList = res.result;
       //console.log(this.ClosedOrderList.length)
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

  PendingOrderList: any;
  GetPendingOrderList(): any {
    let filterid = $("#PendingFilterId").val();
    let filterid1 = $("#PendingFilterId1").val();
    let filterid2 = $("#PendingFilterId2").val();
    this.AutoOrderID = filterid
    let closeText: any = $("#txtClosed").val() ?? "";
    this.AccountServices.GetOrderListPending(this.AutoOrderID,closeText,filterid1,filterid2).subscribe(res => {
      if (res != null && res != "") {
        this.PendingOrderList = res.result;
        if (this.PendingOrderList != null) {
          setTimeout(()=>{
          this.PendingOrderList.forEach((element, test) => {
            this.signalRService.username(element.identifier);
            this.emittService.getusername().subscribe(res => {
              let maindata = JSON.parse(res);
              if (maindata != null) {
                let value = this.PendingOrderList.find(x => x.identifier.toLowerCase() == maindata.s2.toLowerCase());
                if(value != null){
                value.lastBuyPrice = maindata.s4;
              }
            }
            })
          })
        },500)
        }
       //console.log(this.ClosedOrderList.length)
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
  
  getdatawatchlist: any;
  getsetdataforwatchdata(id: any) {
    //this.Quantitypricetotal()
    if($(".customSwitchFilled5").is(":checked")) {
      $(".SwitchFilled1").css('display','block');
      $(".customSwitchFilleddata1").val('true')
  } else {
      $(".SwitchFilled1").css('display','none');
      $(".customSwitchFilleddata1").val('false')
  }
  if($(".customSwitchFilled4").is(":checked")) {
    $(".SwitchFilled").css('display','block');
    $(".customSwitchFilleddata").val('true')
} else {
    $(".SwitchFilled").css('display','none');
    $(".customSwitchFilleddata").val('false')
}
    let finddata = this.ActiveOrderList.find(m => m.identifierId == id);
    this.getdatawatchlist = finddata;
    //console.log(this.getdatawatchlist)
    if(this.getdatawatchlist.isStopLoss!=true){
    $(".SwitchFilled").css('display','none');
    $(".customSwitchFilleddata").val('false')
    }
    if(this.getdatawatchlist.isTakeProfit!=true){
    $(".SwitchFilled1").css('display','none');
    $(".customSwitchFilleddata1").val('false')
    }
    if(this.getdatawatchlist.isStopLoss==true || this.getdatawatchlist.isTakeProfit==true){
      
      $(".SwitchFilled1").css('display','block');
      $(".SwitchFilled").css('display','block');
      setTimeout(() => {
        $(".customSwitchFilleddata").val('true')
        $(".customSwitchFilleddata1").val('true')
        $("#EstStockPrice1").val(this.getdatawatchlist.stopLossEstPrice)
        $("#EstStockPrice2").val(this.getdatawatchlist.takeProfitEstPrice)
      },100)
    }
    
    //this.customSwitchFilledall()
  //   if($("#customSwitchFilled2").is(":checked")) {
  //     $("#customSwitchFilled2").val('true')
  //       $(".SwitchFilled1").show();
  //   } else {
  //       $(".SwitchFilled1").hide();
  //       $("#customSwitchFilled2").val('false')
  //   }
  //   if($("#customSwitchFilled1").is(":checked")) {
  //     $("#customSwitchFilled2").val('true')
  //       $(".SwitchFilled").show();
  //   } else {
  //       $(".SwitchFilled").hide();
  //       $("#customSwitchFilled2").val('false')
  //   }
  //   $("#customSwitchFilled2").click(function() {
  //     if($(this).is(":checked")) {
  //       $("#customSwitchFilled2").val('true')
  //         $(".SwitchFilled1").show();
  //     } else {
  //         $(".SwitchFilled1").hide();
  //         $("#customSwitchFilled2").val('false')
  //     }
      
  // });
  // $("#customSwitchFilled1").click(function() {
  //     if($(this).is(":checked")) {
  //       $("#customSwitchFilled2").val('true')
  //         $(".SwitchFilled").show();
  //     } else {
  //         $(".SwitchFilled").hide();
  //         $("#customSwitchFilled2").val('false')
  //     }
      
  // });
  }

  PostCreateOrder: any;
  addPostCreateOrder(id: any) {
    this.alerts.ComfirmAlert("Closed Order?", "Yes", "No").then(res => {
      if (res.isConfirmed) {
        $('#preloader').css('display','block')
        $('[data-loader="circle-side"]').css('display','block')
          let Data = {
            orderID: id
          }
          this.AccountServices.RoundoffOrders(Data).subscribe(res => {
            if (res != null && res != "") {
              setTimeout(() => {
                $('[data-loader="circle-side"]').fadeOut(); 
                $('#preloader').delay(350).fadeOut('slow');
              }, 200);
             //this.ActiveOrderList = res.result;
              //console.log(res.result)
              this.GetActiveOrderList();
              this.router.navigate(['OrderList'])
              .then(() => {
                window.location.reload();
              });
              // this.toastr.SuccessToastr("Success");
            } else {
              setTimeout(() => {
                $('[data-loader="circle-side"]').fadeOut(); 
                $('#preloader').delay(350).fadeOut('slow');
              }, 200);
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
    })
  }
  PostUpdateOrder(id: any) {
    $('#preloader').css('display','block')
    $('[data-loader="circle-side"]').css('display','block')
    var input = JSON.parse(JSON.stringify(this.detdata.getRawValue()));
    let customSwitchFilleddata1 = input.customSwitchFilleddata1;
    let customSwitchFilleddata = input.customSwitchFilleddata;
    let EstStockPrices1 = $("#EstStockPrice1").val()
    let EstStockPrices2 = $("#EstStockPrice2").val()
    let customSwitchFilled2 = $(".customSwitchFilleddata1").val();
    let customSwitchFilled1 = $(".customSwitchFilleddata").val();

    if (customSwitchFilled1 == null)
      customSwitchFilled1 = 'false';
    if (customSwitchFilled2 == null)
      customSwitchFilled2 = 'false';

    if (customSwitchFilled1 == 'false'){
      EstStockPrices1=0
    }
    if (customSwitchFilled2 == 'false'){
      EstStockPrices2=0
    }

    let Data = {
      SymbolID: 0,
        Type: 1,
        OrderType: this.getdatawatchlist.orderType,
        Quantity: this.getdatawatchlist.quantity,
        EntryPrice: this.getdatawatchlist.entryPrice,
        VolumePrice: "",
        Commission: "",
        TotalPurchaseAmt: this.getdatawatchlist.totalPurchaseAmt,
        isLimitOrder: "",
        isMarketOrder: "",
        isStopLoss: customSwitchFilled1,
        StopLossPer: "",
        StopLossEstPrice: EstStockPrices1,
        isTakeProfit: customSwitchFilled2,
        TakeProfitPer: "",
        TakeProfitEstPrice: EstStockPrices2,
        OrderStatus: 1,
        //SellPrice: finddata.sellPrice,
        //BuyPrice: finddata.buyPrice,
        ClosedPrice: "",
        BrokerConfigID: this.getdatawatchlist.brokerID,
        ProductType: this.getdatawatchlist.productType,
        ProfitLost: "",
        IdentifierId: this.getdatawatchlist.identifierId,
        IsSettled: "",
        iSAutoTrade: this.getdatawatchlist.iSAutoTrade,
        BrokerStatus: "",
        OrderID: id
    }
    this.AccountServices.PostUpdateOrderdata(Data).subscribe(res => {
      setTimeout(() => {
        $('[data-loader="circle-side"]').fadeOut(); 
        $('#preloader').delay(350).fadeOut('slow');
      }, 200);
      if (res != null && res != "") {
        this.toastr.SuccessToastr("Save Order");
        this.GetActiveOrderList();
      
        this.GetClosedOrderList();
        
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
  quantitydata:any
  Quantitypricetotal(){
    //var input = JSON.parse(JSON.stringify(this.detdata.getRawValue()));
    this.quantitydata= this.getdatawatchlist.Quantity* this.getdatawatchlist.buyPrice
  }
}
