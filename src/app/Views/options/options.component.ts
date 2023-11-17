import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountServicesService } from 'src/app/Services/account-services.service';
import { EmittService } from 'src/app/Services/services/emitt.service';
import { SignalrService } from 'src/app/Services/services/signalr.service';
import { SessionServicesService } from 'src/app/Services/session-services.service';
import { ToastrServiceServiceService } from 'src/app/Services/toastr-service-service.service';

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.scss']
})
export class OptionsComponent implements OnInit {
  detdata: FormGroup = new FormGroup({
    Quantity: new FormControl(),
    customerBrokertype: new FormControl,
    EstStockPrice1: new FormControl(),
    EstStockPrice2: new FormControl(),
    priceChangePercentage: new FormControl(),
    customSwitchFilleddata1:new FormControl(),
    customSwitchFilled2:new FormControl(),
    customSwitchFilled:new FormControl(),
    customSwitchFilleddata:new FormControl()
  })
  detdata1: FormGroup = new FormGroup({
    Quantity: new FormControl(),
    customerBrokertype: new FormControl,
    EstStockPrice1: new FormControl(),
    EstStockPrice2: new FormControl(),
    priceChangePercentage: new FormControl(),
    customSwitchFilleddata1:new FormControl(),
    customSwitchFilled2:new FormControl(),
    customSwitchFilled:new FormControl(),
    customSwitchFilleddata:new FormControl()
  })
  detdata2: FormGroup = new FormGroup({
    Quantity: new FormControl(),
    customerBrokertype: new FormControl,
    EstStockPrice1: new FormControl(),
    EstStockPrice2: new FormControl(),
    priceChangePercentage: new FormControl(),
    customSwitchFilleddata1:new FormControl(),
    customSwitchFilled2:new FormControl(),
    customSwitchFilled:new FormControl(),
    customSwitchFilleddata:new FormControl()
  })
  serachForm: FormGroup = new FormGroup({
    text: new FormControl()
  })
  constructor(private formBuilder: FormBuilder,public signalRService: SignalrService,private emittService :EmittService,private router: Router,private sessionService: SessionServicesService,private AccountServices: AccountServicesService,private toastr : ToastrServiceServiceService) {
    this.emittService.getn50().subscribe(res => {
      this.NIFTY50 = this.sessionService.getNIFTY50();
    this.NIFTYFINSERVICE = this.sessionService.getNIFTYFINSERVICE();
    this.NIFTYBANK = this.sessionService.getNIFTYBANK();
    if(this.NIFTYFINSERVICE != "")
    this.NIFTYFINSERVICE = JSON.parse(this.NIFTYFINSERVICE);
    if(this.NIFTY50 != "")
    this.NIFTY50 = JSON.parse(this.NIFTY50);
    if(this.NIFTYBANK != "")
    this.NIFTYBANK = JSON.parse(this.NIFTYBANK);
    })
    this.detdata = formBuilder.group({
      Quantity: [1],
      ProductType1: [1],
      customerBrokertype:['', Validators.required],
      EstStockPrice1: [''],
      EstStockPrice2: [''],
      customSwitchFilleddata1: [''],
      customSwitchFilled2: [''],
      customSwitchFilled: [''],
      customSwitchFilleddata: ['']
    });
    this.detdata1 = formBuilder.group({
      Quantity: [1],
      ProductType1: [1],
      customerBrokertype:['', Validators.required],
      EstStockPrice1: [''],
      EstStockPrice2: [''],
      customSwitchFilleddata1: [''],
      customSwitchFilled2: [''],
      customSwitchFilled: [''],
      customSwitchFilleddata: ['']
    });
    this.detdata2 = formBuilder.group({
      Quantity: [1],
      ProductType1: [1],
      customerBrokertype:['', Validators.required],
      EstStockPrice1: [''],
      EstStockPrice2: [''],
      customSwitchFilleddata1: [''],
      customSwitchFilled2: [''],
      customSwitchFilled: [''],
      customSwitchFilleddata: ['']
    });
  }
  NIFTY50:any;
NIFTYBANK:any;
NIFTYFINSERVICE:any;
  ngOnInit(): void {
    this.signalRService.startConnection();
    
    this.GetHeaderSymbols();
    //this.toptionlistallid(window.location.href.slice(window.location.href.indexOf('id')+3))
    this.toptionexpiryList(window.location.href.slice(window.location.href.indexOf('id')+3),)
    
    this.tabchange(5)
    this.changequantity()
    setTimeout(() =>{
      this.toptionlistallid(window.location.href.slice(window.location.href.indexOf('id')+3),)
      $('#Category').val(window.location.href.slice(window.location.href.indexOf('id')+3))
      $('#Category1').val(window.location.href.slice(window.location.href.indexOf('id')+3))
    },1000);
    setTimeout(() =>{ 
      this.GetHeaderSymbols();
    },1000);
    this.GetBrokerConfig()
    setTimeout(()=>{
      console.clear();
    },1500)
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

  toptionlistallid(id:any){
    if($('#Category').val()!=null){
    this.optionlistPEList(id)
    this.toptionlistCEUList(id)
  }
    //this.GetCustomerOptions(id)
  }
  Categoryid:any;
  toptionlistallid1(){
    this.Categoryid=$('#Category').val()
    this.toptionexpiryList(this.Categoryid)
    $('#Category1').val(this.Categoryid)
  }
  toptionlistallid2(){
    this.Categoryid=$('#Category1').val()
    this.toptionexpiryList(this.Categoryid)
    $('#Category').val(this.Categoryid)
  }
  get f() {
    return this.detdata.controls;
  }
  get fbuy() {
    return this.detdata1.controls;
  }
  get fsell() {
    return this.detdata2.controls;
  }

  BrokerConfigList : any;
  GetBrokerConfig(): any {
  this.AccountServices.GetBrokerConfigList().subscribe(res => {
    if(res != null && res != ""){
      this.BrokerConfigList = res.result;
      //console.log(this.BrokerConfigList)
      // this.toastr.SuccessToastr("Success");
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
//   NIFTYFINSERVICEchange(){
//   if (this.NIFTYFINSERVICE != ""){
//     this.NIFTYFINSERVICE = JSON.parse(this.NIFTYFINSERVICE);
    
//     if(this.NIFTYFINSERVICE.s14>=0){
//       setInterval(function(){
//         $('#NIFTYFINSERVICE_green').addClass('green');
//       },600);
//       setInterval(function(){
//         $('#NIFTYFINSERVICE_green').removeClass('green');
//       },1000)
// }
// else{
//   setInterval(function(){
//     $('#NIFTYFINSERVICE_red').addClass('red');
//   },600);
//   setInterval(function(){
//     $('#NIFTYFINSERVICE_red').removeClass('red');
//   },1000)
// }
// }  
// }
// NIFTY50change(){
//   if (this.NIFTY50 != ""){
//     this.NIFTY50 = JSON.parse(this.NIFTY50);
//     if(this.NIFTY50.s14<0){
//       setInterval(function(){
//         $('#NIFTY50_green').addClass('green');
//       },600);
//       setInterval(function(){
//         $('#NIFTY50_green').removeClass('green');
//       },1000)
// }
// else{
//   setInterval(function(){
//     $('#NIFTY50_red').addClass('red');
//   },600);
//   setInterval(function(){
//     $('#NIFTY50_red').removeClass('red');
//   },1000)
// }
// }
// }
// NIFTYBANKchange(){
//   if (this.NIFTYBANK != ""){
//     this.NIFTYBANK = JSON.parse(this.NIFTYBANK);
//     if(this.NIFTYBANK.s14<0){
//       setInterval(function(){
//         $('#NIFTYBANK_green').addClass('green');
//       },600);
//       setInterval(function(){
//         $('#NIFTYBANK_green').removeClass('green');
//       },1000)
// }
// else{
//   setInterval(function(){
//     $('#NIFTYBANK_red').addClass('red');
//   },600);
//   setInterval(function(){
//     $('#NIFTYBANK_red').removeClass('red');
//   },1000)
// }

// }
// }

// NIFTYFINSERVICEchange1(){
//   if (this.NIFTYFINSERVICE != ""){
//     this.NIFTYFINSERVICE = JSON.parse(this.NIFTYFINSERVICE);
    
//     if(1>=0){
//       setInterval(function(){
//         $('#NIFTYFINSERVICE_green1').addClass('green');
//       },600);
//       setInterval(function(){
//         $('#NIFTYFINSERVICE_green1').removeClass('green');
//       },1000)
// }
// else{
//   setInterval(function(){
//     $('#NIFTYFINSERVICE_red1').addClass('red');
//   },600);
//   setInterval(function(){
//     $('#NIFTYFINSERVICE_red1').removeClass('red');
//   },1000)
// }
// }  
// }
// NIFTY50change1(){
//   if (this.NIFTY50 != ""){
//     this.NIFTY50 = JSON.parse(this.NIFTY50);
//     if(1>=0){
//       setInterval(function(){
//         $('#NIFTY50_green1').addClass('green');
//       },600);
//       setInterval(function(){
//         $('#NIFTY50_green1').removeClass('green');
//       },1000)
// }
// else{
//   setInterval(function(){
//     $('#NIFTY50_red1').addClass('red');
//   },600);
//   setInterval(function(){
//     $('#NIFTY50_red1').removeClass('red');
//   },1000)
// }
// }
// }
// NIFTYBANKchange1(){
//   if (this.NIFTYBANK != ""){
//     this.NIFTYBANK = JSON.parse(this.NIFTYBANK);
//     if(1>=0){
//       setInterval(function(){
//         $('#NIFTYBANK_green1').addClass('green');
//       },600);
//       setInterval(function(){
//         $('#NIFTYBANK_green1').removeClass('green');
//       },1000)
// }
// else{
//   setInterval(function(){
//     $('#NIFTYBANK_red1').addClass('red');
//   },600);
//   setInterval(function(){
//     $('#NIFTYBANK_red1').removeClass('red');
//   },1000)
// }

// }
// }

  // updateTmpData(id:any,identifier:any){
  //   if(id<0){
  //     setInterval(function(){
  //       $("#"+identifier+'1').addClass('red');
  //     },1000);
  //     setInterval(function(){
  //       $("#"+identifier+'1').removeClass('red');
  //     },1500)
  //   }
  //   else{
  //     setInterval(function(){
  //       $("#"+identifier).addClass('green');
  //       //console.log(maindata.s2.toUpperCase()+"_red")
  //     },1000);
  //     setInterval(function(){
  //       $("#"+identifier).removeClass('green');
  //     },1500)
  //   }
  // }

  // updateTmpData1(id:any,identifier:any){
  //   if(id<0){
  //     setInterval(function(){
  //       $("#"+identifier+'1').addClass('red');
  //     },1000);
  //     setInterval(function(){
  //       $("#"+identifier+'1').removeClass('red');
  //     },1500)
  //   }
  //   else{
  //     setInterval(function(){
  //       $("#"+identifier).addClass('green');
  //       //console.log(maindata.s2.toUpperCase()+"_red")
  //     },1000);
  //     setInterval(function(){
  //       $("#"+identifier).removeClass('green');
  //     },1500)
  //   }
  // }

  toptionlistCEU
  toptionlistCEUList(id:any){
    let input ={
      strProduct : id,
      strExpiry:$('#expiry').val(),
      strike: $("#txtActive").val()
      //Status : false
    }
    this.AccountServices.toptionlistCEU(input).subscribe(res => {
      if(res != null && res != ""){
        //console.log(res.result)
        this.toptionlistCEU=res.result
        if( this.toptionlistCEU!=null){
          setTimeout(()=>{
        this.toptionlistCEU.forEach((element, test)=> {
          this.signalRService.ordersignalr(element.identifier);
          this.emittService.getordersignal().subscribe(res => {
            let maindata = JSON.parse(res);
            if(maindata != null){
              let value =  this.toptionlistCEU.find(x => x.identifier.toLowerCase( ) == maindata.s2.toLowerCase( ));
              if(value!= null){
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
          //     if(value.priceChangePercentage<0){
          //       setInterval(function(){
          //         $('.text_value').addClass('green');
          //       },600);
          //       setInterval(function(){
          //         $('.text_value').removeClass('green');
          //       },1000)
          // }
          // else{
          //   setInterval(function(){
          //     $('.text_value1').addClass('red');
          //   },600);
          //   setInterval(function(){
          //     $('.text_value1').removeClass('red');
          //   },1000)
          // }
          
              
              }
           
              //  element.buyPrice = maindata.s4;
              // value.profitLost = naiveRound(value.lastBuyPrice*value.quantity-value.entryPrice*value.quantity,2)
              // function naiveRound(num, decimalPlaces = 0) {
              //   var p = Math.pow(10, decimalPlaces);
              //   return Math.round(num * p) / p;
              // }
            }
          },
          (err: any) => {
            this.toptionlistCEU=res.result
          });
        });
      },500)
      }
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

  optionlistPE
  optionlistPEList(id:any){
    let input ={
      strProduct:id ,
      strExpiry:$('#expiry').val(),
      strike: $("#txtActive").val()
      //Status : false
    }
    this.AccountServices.optionlistPE(input).subscribe(res => {
      if(res != null && res != ""){
        //console.log(res.result)
        this.optionlistPE=res.result
        if(this.optionlistPE!=null){
          setTimeout(()=>{
        this.optionlistPE.forEach((element, test)=> {
          this.signalRService.ordersignalr(element.identifier);
          this.emittService.getordersignal().subscribe(res => {
            let maindata = JSON.parse(res);
            if(maindata != null){
              let value =  this.optionlistPE.find(x => x.identifier.toLowerCase( ) == maindata.s2.toLowerCase( ));
              if(value!= null){
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
      }
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
  getdatawatchlist:any;
  getsetdatatoptionlistCEU(id:any){
    let finddata = this.toptionlistCEU.find(m=> m.symbolIdentifierId == id);
    this.getdatawatchlist=finddata;
    
  }
  getsetdataoptionlistPEList(id:any){
    let finddata = this.optionlistPE.find(m=> m.symbolIdentifierId == id);
    this.getdatawatchlist=finddata;
  }
  quantitystore:any = 0;
  changequantity(){
    var input = JSON.parse(JSON.stringify(this.detdata.getRawValue()));
    if(this.getdatawatchlist){
    if(this.getdatawatchlist.QuotationLot==null){
      this.getdatawatchlist.QuotationLot=1
    }
    this.quantitystore = input.BuyPrice*this.getdatawatchlist.QuotationLot
  }
   
  }
  PostCreateOrder:any;
  isSubmitted: any = false;

  addPostCreateOrderbuy(id: any) {
    this.isSubmitted = true;
    if (this.detdata1.valid) {
      var input = JSON.parse(JSON.stringify(this.detdata1.getRawValue()));
      if(input.Quantity>=999999){
        this.toastr.ErrorToastr("Please maxmam Quantity 999999");
      }
      else{
      $('#preloader').css('display','block')
    $('[data-loader="circle-side"]').css('display','block')
    
    let Quantitys = input.Quantity;
    let customSwitchFilleddata1 = input.customSwitchFilleddata1;
    let customSwitchFilleddata = input.customSwitchFilleddata;
    let EstStockPrices1 = input.EstStockPrice1;
    let EstStockPrices2 = input.EstStockPrice2;
    let customSwitchFilled2 = input.customSwitchFilled2;
    let customSwitchFilled1 = input.customSwitchFilled;
    let productType = 1

    if (customSwitchFilled1 == null)
      customSwitchFilled1 = false;
    if (customSwitchFilled2 == null)
      customSwitchFilled2 = false;

    let Data = {
      SymbolID: 0,
      Type: 1,
      OrderType: 1,
      Quantity: Quantitys,
      EntryPrice: this.getdatawatchlist.buyPrice,
      VolumePrice: "",
      Commission: "",
      TotalPurchaseAmt: this.quantitystore,
      isLimitOrder: "",
      isMarketOrder: "",
      isStopLoss: customSwitchFilled1,
      StopLossPer: "",
      StopLossEstPrice: EstStockPrices1,
      isTakeProfit: customSwitchFilled2,
      TakeProfitPer: "",
      TakeProfitEstPrice: EstStockPrices2,
      OrderStatus: 1,
      BrokerConfigID: input.customerBrokertype,
      SellPrice: this.getdatawatchlist.sellPrice,
      BuyPrice: this.getdatawatchlist.buyPrice,
      ClosedPrice: "",
      ProductType: input.ProductType1,
      ProfitLost: "",
      IdentifierId: this.getdatawatchlist.symbolIdentifierId,
      IsSettled: "",
      iSAutoTrade: this.getdatawatchlist.addedinAlgoTrade,
      BrokerStatus: "",
      OrderID: id
    }
    console.log(Data)
    this.AccountServices.PostCreateOrderadd(Data).subscribe(res => {
      if (res != null && res != "") {
        setTimeout(() => {
          $('[data-loader="circle-side"]').fadeOut(); 
          $('#preloader').delay(350).fadeOut('slow');
        }, 200);
       // this.Customeralgooff(this.getdatawatchlist.symbolIdentifierId);
       if(res.message=='success'){
        this.toastr.SuccessToastr("Add Buy Order");
       }
       else{
        this.toastr.ErrorToastr(res.message);
       }
        
        this.SearchWatchlist()
        setTimeout(() => {
        this.router.navigate(['OrderList'])
        .then(() => {
          //this.toastr.SuccessToastr("Add Buy Order");
          window.location.reload();
        });
      },1000);

      } else {
        this.toastr.ErrorToastr("Please try again.");
      }
    },
      (err: any) => {
        this.toastr.SuccessToastr("Add Buy Order");
        this.SearchWatchlist()
        setTimeout(() => {
        this.router.navigate(['OrderList'])
        .then(() => {
          //this.toastr.SuccessToastr("Add Buy Order");
          window.location.reload();
        });
      },500);
        if (err.status == 401) {
          this.router.navigate(['/']);
        }
        else {
        }
      })
    }
  }
  }

  addPostCreateOrdershell(id: any) {
    this.isSubmitted = true;
    if (this.detdata2.valid) {
      var input = JSON.parse(JSON.stringify(this.detdata2.getRawValue()));
      if(input.Quantity>=999999){
        this.toastr.ErrorToastr("Please maxmam Quantity 999999");
      }
      else{
      $('#preloader').css('display','block')
    $('[data-loader="circle-side"]').css('display','block')
    
    let Quantitys = input.Quantity;
    let customSwitchFilleddata1 = input.customSwitchFilleddata1;
    let customSwitchFilleddata = input.customSwitchFilleddata;
    let EstStockPrices1 = input.EstStockPrice1;
    let EstStockPrices2 = input.EstStockPrice2;
    let customSwitchFilled2 = input.customSwitchFilled2;
    let customSwitchFilled1 = input.customSwitchFilled;

    if (customSwitchFilled1 == null)
      customSwitchFilled1 = false;
    if (customSwitchFilled2 == null)
      customSwitchFilled2 = false;

    let Data = {
      SymbolID: 0,
      Type: 1,
      OrderType: 2,
      Quantity: Quantitys,
      EntryPrice: this.getdatawatchlist.sellPrice,
      VolumePrice: "",
      Commission: "",
      TotalPurchaseAmt: this.quantitystore,
      isLimitOrder: "",
      isMarketOrder: "",
      isStopLoss: customSwitchFilled1,
      StopLossPer: "",
      StopLossEstPrice: EstStockPrices1,
      isTakeProfit: customSwitchFilled2,
      TakeProfitPer: "",
      TakeProfitEstPrice: EstStockPrices2,
      OrderStatus: 1,
      BrokerConfigID: input.customerBrokertype,
      SellPrice: this.getdatawatchlist.sellPrice,
      BuyPrice: this.getdatawatchlist.buyPrice,
      ClosedPrice: "",
      ProductType: input.ProductType1,
      ProfitLost: "",
      IdentifierId: this.getdatawatchlist.symbolIdentifierId,
      IsSettled: "",
      iSAutoTrade: this.getdatawatchlist.addedinAlgoTrade,
      BrokerStatus: "",
      OrderID: id
    }
    this.AccountServices.PostCreateOrderadd(Data).subscribe(res => {
      if (res != null && res != "") {
        setTimeout(() => {
          $('[data-loader="circle-side"]').fadeOut(); 
          $('#preloader').delay(350).fadeOut('slow');
        }, 200);
        //this.Customeralgooff(this.getdatawatchlist.symbolIdentifierId);
        this.toastr.ErrorToastr(res.message);
        this.SearchWatchlist()
        setTimeout(() => {
        this.router.navigate(['OrderList'])
        .then(() => {
          
          window.location.reload();
        });
      },1000);
        // this.tabchange(1)
        // this.tabchange(2)
        // this.tabchange(3)
        // this.tabchange(5)


      } else {
        this.toastr.ErrorToastr("Please try again.");
      }
    },
      (err: any) => {
        this.toastr.ErrorToastr("Add Sell Order");
        this.SearchWatchlist()
        setTimeout(() => {
        this.router.navigate(['OrderList'])
        .then(() => {
          
          window.location.reload();
        });
      },500);
        if (err.status == 401) {
          this.router.navigate(['/']);
        }
        else {
        }
      })
    }
  }
  }
SearchWatchlistdata:any;
StoreSearce :any;
SearchWatchlist(){
  var input = JSON.parse(JSON.stringify(this.serachForm.getRawValue()));
  let searchtxt = input.text;
  this.StoreSearce = input.text;
  this.AccountServices.SymbolIdentifierByUserID(searchtxt).subscribe(res => {
    if(res != null && res != ""){
      this.SearchWatchlistdata = res.result;
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
toptionexpiry:any;
toptionexpiryList(id:any){
    let input ={
      strProduct : id,
      //Status : false
    }
    this.AccountServices.getoptionexpiryList(input).subscribe(res => {
      if(res != null && res != ""){
        //console.log(res.result)
        this.toptionexpiry=res.result
        setTimeout(() => {
          if($('#Category').val()!=null){
            this.optionlistPEList(id)
            this.toptionlistCEUList(id)
          }
        }, 500);
        
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

  SymbolListByCategory:any;
  SymbolListByCategoryarraylist:any;
  StoreCategoryID:any;
  tabchange(id:any){
    let Data ={
      CategoryID : id
    }
    this.AccountServices.GetDashboardSymbolListByCategory(Data).subscribe(res => {
      if(res != null && res != ""){
        this.SymbolListByCategory = res.result;
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
  quantitydatabuy:any
  Quantitypricetotalbuy(){
    var input = JSON.parse(JSON.stringify(this.detdata1.getRawValue()));
    if(input.Quantity>=999999){
      this.toastr.ErrorToastr("Please maxmam Quantity 999999");
    }
    this.quantitydatabuy= input.Quantity* this.getdatawatchlist.buyPrice
  }
  quantitydatasell:any
  Quantitypricetotalsell(){
    var input = JSON.parse(JSON.stringify(this.detdata2.getRawValue()));
    if(input.Quantity>=999999){
      this.toastr.ErrorToastr("Please maxmam Quantity 999999");
    }
    this.quantitydatasell= input.Quantity* this.getdatawatchlist.buyPrice
  }
}
