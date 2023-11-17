import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountServicesService } from 'src/app/Services/account-services.service';
import { SignalrService } from 'src/app/Services/services/signalr.service';
import { SessionServicesService } from 'src/app/Services/session-services.service';
import { ToastrServiceServiceService } from 'src/app/Services/toastr-service-service.service';
import { HttpClient } from '@angular/common/http';
import { css, data } from 'jquery';
import { EmittService } from 'src/app/Services/services/emitt.service';
import { async } from '@angular/core/testing';
import { AppConfig } from 'src/app/appconfig';
import { E } from 'chart.js/dist/chunks/helpers.core';
import { AlertServiceService } from 'src/app/Services/alert-service-service.service';

@Component({
  selector: 'app-market',
  templateUrl: './market.component.html',
  styleUrls: ['./market.component.scss']
})
export class MarketComponent implements OnInit {
  serachForm: FormGroup = new FormGroup({
    text: new FormControl()
  })
  
  detdata: FormGroup = new FormGroup({
    Quantity: new FormControl(),
    customerBrokertype: new FormControl(),
    EstStockPrice1: new FormControl(),
    EstStockPrice2: new FormControl(),
    priceChangePercentage: new FormControl(),
    customSwitchFilleddata1: new FormControl(),
    customSwitchFilled2: new FormControl(),
    customSwitchFilled: new FormControl(),
    ProductType1: new FormControl(),
    customSwitchFilleddata: new FormControl()
  })
  resetalgoform() {
    this.CustomerAlgoTradeform.get('StratergyID')?.setValue("");
    this.CustomerAlgoTradeform.get('BrokerConfigID')?.setValue('');
    this.CustomerAlgoTradeform.get('ProductType')?.setValue('');
    this.CustomerAlgoTradeform.get('OrderQuantity')?.setValue('1');
    this.CustomerAlgoTradeform.get('AlgoType')?.setValue('1');
    this.CustomerAlgoTradeform.get('Stoploss')?.setValue('');
    this.CustomerAlgoTradeform.get('Takeprofit')?.setValue('');
    this.CustomerAlgoTradeform.get('SpecificLimitofDay')?.setValue(0);
    this.CustomerAlgoTradeform.get('OverallCapital')?.setValue(0);
    this.CustomerAlgoTradeform.get('TrailingStopLoss')?.setValue(0);
    this.CustomerAlgoTradeform.get('TrailingProfit')?.setValue(0);
    this.CustomerAlgoTradeform.get('OverallCapitalProfit')?.setValue(0);
  }
  CustomerAlgoTradeform: FormGroup = new FormGroup({
    IdentifierID: new FormControl(),
    Identifier: new FormControl(),
    CustomerAlgoTradeID: new FormControl(),
    CustomerID: new FormControl(),
    TradeType: new FormControl(),
    ProductType: new FormControl(),
    BrokerConfigID: new FormControl(),
    StratergyID: new FormControl(),
    OrderQuantity: new FormControl(),
    AlgoType: new FormControl(),
    Stoploss: new FormControl(),
    Takeprofit: new FormControl(),
    TrailingStopLoss: new FormControl(),
    TrailingProfit: new FormControl(),
    OverallCapitalProfit: new FormControl(),
    OverallCapital: new FormControl(),
    SpecificLimitofDay: new FormControl(),
    Status: new FormControl(),
    Createddate: new FormControl(),
    Modifieddate: new FormControl(),
  })

  CustomerOptionsform: FormGroup = new FormGroup({
    identifierID: new FormControl(),
    identifierName: new FormControl(),
    customerBrokerID: new FormControl(),
    PECE1:new FormControl(),
    PECE0:new FormControl(),
    ProductType: new FormControl(),
    expiryDate: new FormControl(),
    productName: new FormControl(),
    lotSize: new FormControl(),
    lotQTy: new FormControl(),
    BrokerConfigID: new FormControl(),
    statergyID: new FormControl(),
    StratergyID0: new FormControl(),
    StratergyID1: new FormControl(),
    startTime: new FormControl(),
    endTime: new FormControl(),
    squareoffTime: new FormControl(),
    customerId: new FormControl(),
    isActive: new FormControl(),
    createddate: new FormControl(),
    companyId: new FormControl(),
    CallType0: new FormControl(),
    OrderQuantity0: new FormControl(),
    StratergyID: new FormControl(),
    AlgoType0: new FormControl(),
    Stoploss0: new FormControl(),
    Takeprofit0: new FormControl(),
    SpecificLimitofDay0: new FormControl(),
    OverallCapital0: new FormControl(),
    TrailingStopLoss0: new FormControl(),
    TrailingProfit0: new FormControl(),
    OverallCapitalProfit0: new FormControl(),
    CallType1: new FormControl(),
    OrderQuantity1: new FormControl(),
    AlgoType1: new FormControl(),
    Stoploss1: new FormControl(),
    Takeprofit1: new FormControl(),
    SpecificLimitofDay1: new FormControl(),
    OverallCapital1: new FormControl(),
    TrailingStopLoss1: new FormControl(),
    TrailingProfit1: new FormControl(),
    OverallCapitalProfit1: new FormControl(),
    OptionsType0: new FormControl(),
    OptionsType1: new FormControl(),
  })

  CustomerOptionsformmin: FormGroup = new FormGroup({
    identifierID: new FormControl(),
    ProductType: new FormControl(),
    expiryDate: new FormControl(),
    BrokerConfigID: new FormControl(),
    statergyID: new FormControl(),
    OrderQuantity: new FormControl(),
    AlgoType: new FormControl(),
    Stoploss: new FormControl(),
    Takeprofit: new FormControl(),
    SpecificLimitofDay: new FormControl(),
    OverallCapital: new FormControl(),
    TrailingStopLoss: new FormControl(),
    TrailingProfit: new FormControl(),
    OverallCapitalProfit: new FormControl()
  })

  CustomerOptionsform1: FormGroup = new FormGroup({
    ProductType: new FormControl(),
    expiryDate1: new FormControl(),
    BrokerID: new FormControl(),
    BrokerConfigID: new FormControl(),
    CallType: new FormControl(),
    CallType1: new FormControl(),
    OrderQuantity: new FormControl(),
    OrderQuantity1: new FormControl(),
    customSwitchFilled: new FormControl(),
    customSwitchFilled2: new FormControl(),
    Stoploss: new FormControl(),
    Stoploss1: new FormControl(),
    StrikeId: new FormControl(),
    StrikeId1: new FormControl(),
    customSwitchFilled3: new FormControl(),
    Takeprofit1: new FormControl(),
    customSwitchFilled6: new FormControl(),
    Takeprofit: new FormControl(),
  })

  customerOptionsAlgoCE: FormGroup = new FormGroup({
    CallType: new FormControl(),
    CustomerAlgoTradeID: new FormControl(),
    CustomerID: new FormControl(),
    IdentifierID: new FormControl(),
    Identifier: new FormControl(),
    TradeType: new FormControl(),
    ProductType: new FormControl(),
    StratergyID: new FormControl(),
    OrderQuantity: new FormControl(),
    AlgoType: new FormControl(),
    Stoploss: new FormControl(),
    Takeprofit: new FormControl(),
    Status: new FormControl(),
    Createddate: new FormControl(),
    Modifieddate: new FormControl(),
    SpecificLimitofDay: new FormControl(),
    OverallCapital: new FormControl(),
    TrailingStopLoss: new FormControl(),
    TrailingProfit: new FormControl(),
    OverallCapitalProfit: new FormControl(),
    brokerConfigID: new FormControl(),
  })

  customerOptionsAlgoPE: FormGroup = new FormGroup({
    CallType: new FormControl(),
    CustomerAlgoTradeID: new FormControl(),
    CustomerID: new FormControl(),
    IdentifierID: new FormControl(),
    Identifier: new FormControl(),
    TradeType: new FormControl(),
    ProductType: new FormControl(),
    StratergyID: new FormControl(),
    OrderQuantity: new FormControl(),
    AlgoType: new FormControl(),
    Stoploss: new FormControl(),
    Takeprofit: new FormControl(),
    Status: new FormControl(),
    Createddate: new FormControl(),
    Modifieddate: new FormControl(),
    SpecificLimitofDay: new FormControl(),
    OverallCapital: new FormControl(),
    TrailingStopLoss: new FormControl(),
    TrailingProfit: new FormControl(),
    OverallCapitalProfit: new FormControl(),
    brokerConfigID: new FormControl(),
  })


  constructor(public signalRService: SignalrService,private alerts: AlertServiceService,private appConfig: AppConfig, private emittService: EmittService, private http: HttpClient, formBuilder: FormBuilder, private sessionService: SessionServicesService, private router: Router, private AccountServices: AccountServicesService, private toastr: ToastrServiceServiceService) {
    this.emittService.getn50().subscribe(res => {
    })
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
    //     emittService.getsignalrDetail().subscribe(res => {
    //      let maindata = JSON.parse(res);
    // {
    //         let Data ={
    //           categoryID : this.StoreCategoryID
    //         }
    //             if(this.WatchList != null && this.WatchList != "" && this.WatchList != undefined){
    //               let value = this.WatchList.find(x => x.identifier.toLowerCase( ) == maindata.s2.toLowerCase( ));
    //               if(value != null && value != "" && value != undefined){
    //                 // this.WatchList.remove(value);
    //                 value.buyPrice = maindata.s4;
    //                 this.WatchList.push(value);
    //               }
    //             }
    //       }

    //     });
    this.serachForm = formBuilder.group({
      text: ['', Validators.required],
    });
    this.detdata = formBuilder.group({
      Quantity: [1],
      ProductType1: [1],
      customerBrokertype: ['', Validators.required],
      EstStockPrice1: [''],
      EstStockPrice2: [''],
      customSwitchFilleddata1: [''],
      customSwitchFilled2: [''],
      customSwitchFilled: [''],
      customSwitchFilleddata: ['']
    });
    this.CustomerOptionsformmin = formBuilder.group({
      customerBrokerID: ['', Validators.required],
      ProductType:['', Validators.required],
      expiryDate: ['', Validators.required],
      statergyID: ['', Validators.required],
    });

    this.CustomerOptionsform = formBuilder.group({
      // identifierID: new FormControl(),
      // identifierName: new FormControl(),
      customerBrokerID: ['', Validators.required],
      // ProductType:['', Validators.required],
      expiryDate: ['', Validators.required],
      productName: new FormControl(),
      IdentifierID: [0],
      Identifier: [''],
      CustomerAlgoTradeID: [0],
      CustomerID: [0],
      TradeType0: [0],
      BrokerConfigID: ['', Validators.required],
      StratergyID: ['', Validators.required],
      OrderQuantity0: [1],
      OptionsType0: [1],
      OptionsType1: [1],
      ProductType: ['', Validators.required],
      lotSize: new FormControl(),
      lotQTy: new FormControl(),
      //BrokerConfigID:new FormControl(),
      statergyID: ['', Validators.required],
      StratergyID0: new FormControl(),
      StratergyID1: new FormControl(),
      startTime: new FormControl(),
      endTime: new FormControl(),
      squareoffTime: new FormControl(),
      customerId: new FormControl(),
      isActive: new FormControl(),
      createddate: new FormControl(),
      companyId: new FormControl(),
      CallType0: new FormControl(),
      //OrderQuantity:new FormControl(),
      //StratergyID:new FormControl(),
      AlgoType0: new FormControl(),
      Stoploss0: ['', Validators.required],
      Takeprofit0: ['', Validators.required],
      SpecificLimitofDay0:  ['', Validators.required],
      OverallCapital0: new FormControl(),
      TrailingStopLoss0: new FormControl(),
      OverallCapitalProfit0: new FormControl(),
      CallType1: new FormControl(),
      OrderQuantity1: new FormControl(),
      AlgoType1: new FormControl(),
      Stoploss1: new FormControl(),
      Takeprofit1: new FormControl(),
      SpecificLimitofDay1: new FormControl(),
      OverallCapital1: new FormControl(),
      TrailingStopLoss1: new FormControl(),
      OverallCapitalProfit1: new FormControl(),
      TrailingProfit0:new FormControl(),
      TrailingProfit1:new FormControl(),
      PECE1:new FormControl(),
    PECE0:new FormControl(),
      //OptionsType:new FormControl(),
      //OptionsType1:new FormControl(),
    })


    this.CustomerAlgoTradeform = formBuilder.group({
      teamId: [0],
      IdentifierID: [0],
      Identifier: [''],
      CustomerAlgoTradeID: [0],
      CustomerID: [0],
      TradeType: [0],
      ProductType: ['', Validators.required],
      BrokerConfigID: ['', Validators.required],
      StratergyID: ['', Validators.required],
      OrderQuantity: [1],
      AlgoType: ['', Validators.required],
      Stoploss: ['', Validators.required],
      Takeprofit: ['', Validators.required],
      SpecificLimitofDay: ['', Validators.required],
      OverallCapital: ['', Validators.required],
      OverallCapitalProfit: ['', Validators.required],
      TrailingStopLoss: ['', Validators.required],
      TrailingProfit: ['', Validators.required],
      Status: [true]
    });
    this.CustomerOptionsform1 = formBuilder.group({

      ProductType: ['', Validators.required],
      BrokerID: ['', Validators.required],
     Takeprofit1: [],
     Takeprofit: [],
      Stoploss: [],
     Stoploss1: [],
      customSwitchFilled6: [],
     customSwitchFilled3: [],
      customSwitchFilled2: [],
      customSwitchFilled: [],
      // StratergyID:['', Validators.required],
      OrderQuantity1: [1],
      CallType: [1],
      CallType1: [2],
      OrderQuantity: [1],
      // AlgoType:['', Validators.required],
      expiryDate1: ['', Validators.required],
      StrikeId: ['', Validators.required],
      StrikeId1: ['', Validators.required],
      //TrailingProfit:['', Validators.required],
      // TrailingStopLoss:['', Validators.required],
      // Status:[true]
    });
  }
  Name: any;
  TotalFund: any;
  NIFTY50: any;
  NIFTYBANK: any;
  NIFTYFINSERVICE: any;
  rowarry:any=[]
  ngOnInit(): void {

    this.signalRService.startConnection();
    this.Name = this.sessionService.getUsername();
    this.TotalFund = this.sessionService.getTotalFund();
    
    this.signalRService.startConnection();
    this.Name = this.sessionService.getUsername();
    this.TotalFund = this.sessionService.getTotalFund();
    this.GetMarketCatogery();
    //this.tabchange(1);
    //this.tabchangedata(1);
    this.GetWatchLists();
    this.getStratergy();
    this.GetBrokerConfig();
    this.resetalgoform();
    this.CustomerAlgoTradeform.reset(this.CustomerAlgoTradeform.value);
    this.algotypechange();
    this.GetHeaderSymbols()
    setTimeout(() =>{ 
      this.GetHeaderSymbols();
    },1000);
    //this.GetCustomerOptions()
    this.changequantity();
    
    // setInterval(() =>{ 
    //   this.GetActiveOrderList()
    //   this.GetPortfolios();
    // },1000);
    //this.signalRService.startConnection()  
    setTimeout(() => {
      $('.statergyID12').css('display', 'none')
      $('.statergyID34').css('display', 'none')
      
      this.tabchange(this.CatogeryList[0].symbolCategoryID); 
      $('.tag:first').addClass('active')
    }, 1000)
    setTimeout(() => {
      console.clear();
      $('.CallType').on('change',function(){
      if($('.CallType').val()==1){
        $('.CallType').addClass('green1'); 
        $('.CallType').removeClass('red1');
      }
      if($('.CallType').val()==2){
        $('.CallType').addClass('red1');
        $('.CallType').removeClass('green1');
      }
  });
  $('.CallType1').on('change',function(){
    if($('.CallType1').val()==1){
      $('.CallType1').addClass('green1'); 
      $('.CallType1').removeClass('red1');
    }
    if($('.CallType1').val()==2){
      $('.CallType1').addClass('red1');
      $('.CallType1').removeClass('green1');
    }
  });
    }, 1500)
    //this.value_price()
  }
  //console.log(this.rowarry.length)
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
dummyint:any= this.rowarry.length
  addsection(){
    // this.rowarry=this.rowarry+1
    this.rowarry.push(this.rowarry.length)
    this.GetCustomerOptionslistalldata.push(this.rowarry.length)
    setTimeout(() => {
    //this.GetCustomerOptionslistalldata[this.rowarry.length].status=false
    this.changesymbolIdentifierId()
    this.CallTypechange0()
    },400)
    //this.dummyint = this.dummyint + 1;
  }

  changesymbolIdentifierId() {
        // $('#symbolIdentifierIdpe'+0).css('display', 'block')
        // $('#symbolIdentifierIdce'+0).css('display', 'none')
        // $('#symbolIdentifierIdpe'+1).css('display', 'block')
        // $('#symbolIdentifierIdce'+1).css('display', 'none')
        // $('#symbolIdentifierIdpe'+2).css('display', 'block')
        // $('#symbolIdentifierIdce'+2).css('display', 'none')
        // $('#symbolIdentifierIdpe'+3).css('display', 'block')
        // $('#symbolIdentifierIdce'+3).css('display', 'none')
        // $('#symbolIdentifierIdpe'+4).css('display', 'block')
        // $('#symbolIdentifierIdce'+4).css('display', 'none')
        // $('#symbolIdentifierIdpe'+5).css('display', 'block')
        // $('#symbolIdentifierIdce'+5).css('display', 'none')
    this.rowarry.forEach((element) => {
      if ($("#PECE"+element).val()==1) {
        $('#symbolIdentifierIdpe'+element).css('display', 'block')
        $('#symbolIdentifierIdce'+element).css('display', 'none')
        $('#Strike0Price'+element).css('display', 'block')
      $('#Strike1Price'+element).css('display', 'none')
      }
      else{
        $('#symbolIdentifierIdpe'+element).css('display', 'none')
        $('#symbolIdentifierIdce'+element).css('display', 'block')
        $('#Strike0Price'+element).css('display', 'none')
      $('#Strike1Price'+element).css('display', 'block')
      }
  });
  }
k:any
  changesymbolIdentifierId1(id) {
   
    if ($("#PECE"+id).val()==1) {
      $('#symbolIdentifierIdpe'+id).css('display', 'block')
      $('#symbolIdentifierIdce'+id).css('display', 'none')
      $('#Strike0Price'+id).css('display', 'block')
      $('#Strike1Price'+id).css('display', 'none')
    }
    else{
      $('#symbolIdentifierIdpe'+id).css('display', 'none')
      $('#symbolIdentifierIdce'+id).css('display', 'block')
      $('#Strike0Price'+id).css('display', 'none')
      $('#Strike1Price'+id).css('display', 'block')
    }
  }

  changestatergyID() {
    var input = JSON.parse(JSON.stringify(this.CustomerOptionsform.getRawValue()));
    var statergyID = input.statergyID
    if (statergyID == 4 || statergyID == 5) {
      
      if(this.rowarry.length==0||this.rowarry.length==1){
        this.rowarry=[0,1]
        this.GetCustomerOptionslistalldata=[0,1]
        setTimeout(() => {
          this.changesymbolIdentifierId()
          this.algotypechangeoption()
        },400)
      } 

      $('.statergyID12').css('display', 'none')
      $('.statergyID34').css('display', 'block')
    }
    else {
      this.rowarry=[0]
      this.GetCustomerOptionslistalldata=[0]
      $('.statergyID12').css('display', 'block')
      $('.statergyID34').css('display', 'none')
      setTimeout(() => {
        this.algotypechangeoption1()
      },400)
    }
  }



  StratergyList: any;
  getStratergy(): any {
    this.AccountServices.getStratergyList().subscribe(res => {
      if (res != null && res != "") {
        this.StratergyList = res.result;
        //console.log(this.StratergyList)
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

  BrokerConfigList: any;
  GetBrokerConfig(): any {
    this.AccountServices.GetBrokerConfigList().subscribe(res => {
      if (res != null && res != "") {
        this.BrokerConfigList = res.result;
        //console.log(this.BrokerConfigList)
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



  CatogeryList: any;
  GetMarketCatogery(): any {
    this.AccountServices.GetDashboardCatogeryList().subscribe(res => {
      if (res != null && res != "") {
        this.CatogeryList = res.result;
        //this.selectedIndex = 1;
        //console.log(this.CatogeryList)
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

  toptionlistallid(id: any) {
    //console.log(id);
    this.optionlistPEList(id)
    this.toptionlistCEUList(id)
    // this.router.navigate(['Options'])
    // .then(() => {
    //   window.location.reload();
    // });
    //this.GetCustomerOptions(id)
  }

  toptionlistallid1(id: any = 'NIFTY') {
    //console.log(id);
    var expiry = $('#expiry').val()
    this.optionlistPEList1(id, expiry)
    this.toptionlistCEUList1(id, expiry)
    //this.GetCustomerOptions(id)
  }

  toptionlistallid2(id: any = 'NIFTY') {
    //console.log(id);
    var expiry = $('#expiry').val()
    this.optionlistPEList1(id, expiry)
    this.toptionlistCEUList1(id, expiry)
    //this.GetCustomerOptions(id)
  }

  toptionlistallid3(id: any = 'NIFTY') {
    //console.log(id);
    var expiry = $('#expiry1').val()
    this.optionlistPEList1(id, expiry)
    this.toptionlistCEUList1(id, expiry)
    //this.GetCustomerOptions(id)
  }

  SymbolListByCategory: any;
  SymbolListByCategoryarraylist: any;
  StoreCategoryID: any;
  tabchange(id: any) {
    
    if (id == 5) {
      setTimeout(() => {
        $('.tagchangebtn').css('display', 'none')
        $('.tagchangebtn1').css('display', 'block')

        $('.tableSwitchFilled1').css('display', 'none')
        $('.tableSwitchFilled2').css('display', 'block')
        
    

          // $('.green').on('DOMSubtreeModified',function(){
          //   $('.green').addClass('valuedata');
          // setTimeout(function(){
          //   $('.valuedata').removeClass('green');
          // },400)
          // })
          // $('.red').on('DOMSubtreeModified',function(){
          //   $('.red').addClass('valuedata');
          // setTimeout(function(){
          //   $('.valuedata').removeClass('red');
          // },400)
          // })
          // $('.valuedata').on('DOMSubtreeModified',function(){
          //   $('.valuedata').addClass('green');
          // setTimeout(function(){
          //   $('.valuedata').removeClass('green');
          // },400)
          // })
          // $('.valuedata').on('DOMSubtreeModified',function(){
          //   $('.valuedata').addClass('red');
          // setTimeout(function(){
          //   $('.valuedata').removeClass('red');
          // },400)
          // })
          
      }, 500)
    }
    else {
      setTimeout(() => {
        $('.tagchangebtn').css('display', 'block')
        $('.tagchangebtn1').css('display', 'none')
        $('.tableSwitchFilled2').css('display', 'none')
        $('.tableSwitchFilled1').css('display', 'block')
        
       
          // $('.green').on('DOMSubtreeModified',function(){
          //   $('.green').addClass('valuedata');
          // setTimeout(function(){
          //   $('.valuedata').removeClass('green');
          // },400)
          // })
        
          // $('.red').on('DOMSubtreeModified',function(){
          //   $('.red').addClass('valuedata');
          // setTimeout(function(){
          //   $('.valuedata').removeClass('red');
          // },400)
          // })
        
          // $('.valuedata').on('DOMSubtreeModified',function(){
          //   $('.valuedata').addClass('green');
          // setTimeout(function(){
          //   $('.valuedata').removeClass('green');
          // },400)
          // })
          // $('.valuedata').on('DOMSubtreeModified',function(){
          //   $('.valuedata').addClass('red');
          // setTimeout(function(){
          //   $('.valuedata').removeClass('red');
          // },400)
          // })

      }, 500)
    }
    this.StoreCategoryID = id;
    let Data = {
      CategoryID: id,
      indentifier : $("#txtActive").val()
    }
    this.AccountServices.GetDashboardSymbolListByCategory(Data).subscribe(res => {
      if (res != null && res != "") {
        this.SymbolListByCategory = res.result;

        //console.log(this.SymbolListByCategory)
        // this.SymbolListByCategory.forEach(element => {
        //   this.SymbolListByCategoryarraylist.push(element);
        // });
        if (this.SymbolListByCategory != "" && this.SymbolListByCategory != undefined && this.SymbolListByCategory != null) {
          setTimeout(()=>{
          this.SymbolListByCategory.forEach((element, test) => {
            this.signalRService.addTransferChart(element.identifier);
            this.emittService.getsignalrDetail().subscribe(res => {
              let maindata = JSON.parse(res);
              if (maindata != null) {
                if (this.SymbolListByCategory != "" && this.SymbolListByCategory != undefined && this.SymbolListByCategory != null) {
                  let value = this.SymbolListByCategory.find(x => x.identifier.toLowerCase() == maindata.s2.toLowerCase());
                  if (value != "" && value != undefined && value != null) {
                    value.buyPrice = maindata.s4;
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
                }
                //  element.buyPrice = maindata.s4;
                
              }
            });
            this.getAutoTradeAllowed(element.symbolIdentifierId)

            //this.GetPortfolios();
          });
        },500)
        }

        //this.GetPortfolios();
        //console.log(this.SymbolListByCategory)
        // setInterval(() => {
        //   this.tabchange(this.StoreCategoryID);
        //   }, 5000);
        // setInterval(function(){ 
        //   this.tabchange(1);
        // }, 2000);
        // this.StoresymbolID = res.result.symbolID;
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

  get foption() {
    return this.CustomerOptionsform.controls;
  }

  get fvalidayion() {
    return this.CustomerOptionsform1.controls;
  }

  get f1() {
    return this.customerOptionsAlgoPE.controls;
  }
  get f11() {
    return this.detdata.controls;
  }

  // customerOptionsAlgoPE :any;
  // customerOptionsAlgoCE :any;
  PostCustomerOptionsAlgo() {
    
    
    this.isSubmitted = true;
    // var customerOptionsAlgoPE :any;
    // var customerOptionsAlgoCE :any;
    //if(this.CustomerOptionsform.valid){


    this.CustomerID = this.sessionService.getcustomerID();
    var input = JSON.parse(JSON.stringify(this.CustomerOptionsform.getRawValue()));
    if(input.OrderQuantity>=999999){
      this.toastr.ErrorToastr("Please maxmam Quantity 999999");
    }
    else{
      $('#preloader').css('display','block')
      $('[data-loader="circle-side"]').css('display','block')
    if (input.statergyID == '4' || input.statergyID == '5') {
      let finddata;
      
      if(input.squareoffTime==null||input.startTime==null||input.customerBrokerID==null||input.ProductType==null||input.statergyID==null||input.expiryDate==null){
        this.toastr.ErrorToastr("Please All Field Required");
        setTimeout(() => {
          $('[data-loader="circle-side"]').fadeOut(); 
          $('#preloader').delay(350).fadeOut('slow');
        }, 700);
      }
      else{
      //var input11 = JSON.parse(JSON.stringify(this.CustomerOptionsformmin.getRawValue()));
      input.IdentifierID = this.getdatawatchlist.symbolIdentifierId
      input.IdentifierName = this.getdatawatchlist.identifier
      input.CustomerId = this.CustomerID;
      input.ProductName = this.getdatawatchlist.product;
      input.COAID = this.cOAID;
      input.CustomerBrokerID = input.customerBrokerID;
      input.ProductType = input.ProductType;
      input.StatergyID = input.statergyID;
      input.ExpiryDate = input.expiryDate;
      input.LotSize= null;
      input.LotQTy=null;
      input.StartTime=input.startTime;
      input.EndTime= null;
      input.SquareoffTime= input.squareoffTime;
      input.CustomerId= this.CustomerID;
      input.IsActive= true;
      input.Createddate= new Date();
      input.CompanyId= this.appConfig.copanyidpass;
      input.customerOptionsAlgochild = [];
      var OptionsAlgochild
      this.rowarry.forEach((element) => {
        
        if($("#CallType"+element).val()==''||$("#PECE"+element).val()==''||$("#StratergyID"+element).val()==''||$("#SpecificLimitofDay"+element).val()==''||$("#Takeprofit"+element).val()==''||$("#Stoploss"+element).val()==''||$("#OrderQuantity"+element).val()==''){
         // this.toastr.ErrorToastr("Please All Field Required");
         OptionsAlgochild=false
        }
        else{
          OptionsAlgochild=true
        }
      })
      this.rowarry.forEach((element) => {

        if(OptionsAlgochild==false){
          this.toastr.ErrorToastr("Please All Field Required");
        }
        else{
        if ($("#PECE"+element).val()==1) {
          finddata = this.optionlistPE1.find(m => m.symbolIdentifierId == $("#symbolIdentifierIdpe"+element).val());
        }
        else{
          finddata = this.toptionlistCEU1.find(m => m.symbolIdentifierId == $("#symbolIdentifierIdce"+element).val());
        }
      let model = {
        CallType : $("#CallType"+element).val(),
      CustomerAlgoTradeID : 0,
      cOACID : $("#cOACID"+element).val(),
      cOAID : this.cOAID,
      CustomerID : this.CustomerID,
      IdentifierID : finddata.symbolIdentifierId,
      Identifier : finddata.identifier,
      TradeType : $("#PECE"+element).val(),
      ProductType : input.ProductType,
      StratergyID : $("#StratergyID"+element).val(),
      OrderQuantity : $("#OrderQuantity"+element).val(),
      AlgoType : $("#AlgoType"+element).val(),
      Stoploss : $("#Stoploss"+element).val(),
      Takeprofit : $("#Takeprofit"+element).val(),
      Status : true,
      Createddate : new Date(),
      Modifieddate : new Date(),
      SpecificLimitofDay : $("#SpecificLimitofDay"+element).val(),
      OverallCapital : $("#OverallCapital"+element).val(),
      TrailingStopLoss : $("#TrailingStopLoss"+element).val(),
      TrailingProfit : $("#TrailingProfit"+element).val(),
      OverallCapitalProfit : $("#OverallCapitalProfit"+element).val(),
      brokerConfigID : input.customerBrokerID,
      OptionsType : $("#OptionsType"+element).val()
    }
    
    
    input.customerOptionsAlgochild.push(model)
  }
      //input.customerOptionsAlgochild =[input1];
      });
      if(input.customerOptionsAlgochild!=null && input.customerOptionsAlgochild!=''){
      this.AccountServices.PostCustomerOptionsAlgoService(input).subscribe(res => {
        if (res != null && res != "") {
          setTimeout(() => {
            $('[data-loader="circle-side"]').fadeOut(); 
            $('#preloader').delay(350).fadeOut('slow');
          }, 700);
          
          if(res.message=='success'){
            this.toastr.SuccessToastr("Success Algo");
           }
           else{
            this.toastr.ErrorToastr(res.message);
           }
          
          this.tabchange(this.StoreCategoryID);
          this.resetalgoform();
          this.CustomerAlgoTradeform.reset(this.CustomerAlgoTradeform.value);
          this.isSubmitted = false;
          setTimeout(() => {
            window.location.reload();
          },1000);
        } else {
          this.toastr.ErrorToastr("Please try again.");
        }
      },
        (err: any) => {
          if (err.status == 401) {
            setTimeout(() => {
              $('[data-loader="circle-side"]').fadeOut(); 
              $('#preloader').delay(350).fadeOut('slow');
            }, 200);
            this.toastr.SuccessToastr("Success Algo");
            this.router.navigate(['/']);
          }
          else {
          }
        })
      }
      else{
        setTimeout(() => {
          $('[data-loader="circle-side"]').fadeOut(); 
          $('#preloader').delay(350).fadeOut('slow');
        }, 700);
      }
    }
  }
  else{
    //let finddata = this.optionlistPE1.find(m => m.symbolIdentifierId == input.StratergyID1);
    //let finddata1 = this.toptionlistCEU1.find(m => m.symbolIdentifierId == input.StratergyID2);
    //var input11 = JSON.parse(JSON.stringify(this.CustomerOptionsformmin.getRawValue()));
    if(input.customerBrokerID==null||input.ProductType==null||input.statergyID==null||input.expiryDate==null){
      this.toastr.ErrorToastr("Please All Field Required");
      setTimeout(() => {
        $('[data-loader="circle-side"]').fadeOut(); 
        $('#preloader').delay(350).fadeOut('slow');
      }, 700);
    }
    else{
    input.IdentifierID = this.getdatawatchlist.symbolIdentifierId
    input.IdentifierName = this.getdatawatchlist.identifier
    input.CustomerId = this.CustomerID;
    input.ProductName = this.getdatawatchlist.product;
    input.COAID = this.cOAID;
    input.CustomerBrokerID = input.customerBrokerID;
    input.ProductType = input.ProductType;
    input.StatergyID = input.statergyID;
    input.ExpiryDate = input.expiryDate;
    input.LotSize= null;
    input.LotQTy=null;
    input.StartTime=input.startTime;
    input.EndTime= null;
    input.SquareoffTime= input.squareoffTime;
    input.CustomerId= this.CustomerID;;
    input.IsActive= true;
    input.Createddate= new Date();;
    input.CompanyId= this.appConfig.copanyidpass;
    if($("#CallType0"+0).val()==''||$("#StratergyID0"+0).val()==''||$("#SpecificLimitofDay0"+0).val()==''||$("#Takeprofit0"+0).val()==''||$("#Stoploss0"+0).val()==''||$("#OrderQuantity0"+0).val()==''){
      this.toastr.ErrorToastr("Please All Field Required");
      
    }
    else{
    var input1 = JSON.parse(JSON.stringify(this.customerOptionsAlgoCE.getRawValue()));
    // input1.COACID = 0;
    // input1.COAID = 0;
    input1.CallType = $("#CallType0"+0).val(),
    input1.CustomerAlgoTradeID = 0,
    input1.cOACID = $("#cOACID0"+0).val()
    input1.cOAID = this.cOAID,
    input1.CustomerID = this.CustomerID,
    input1.IdentifierID = this.getdatawatchlist.symbolIdentifierId,
    input1.Identifier = this.getdatawatchlist.identifier,
    input1.TradeType = $("#PECE0"+0).val(),
    input1.ProductType = input.ProductType,
    input1.StratergyID = $("#StratergyID0"+0).val(),
    input1.OrderQuantity = $("#OrderQuantity0"+0).val(),
    input1.AlgoType = $("#AlgoType0"+0).val(),
    input1.Stoploss = $("#Stoploss0"+0).val(),
    input1.Takeprofit = $("#Takeprofit0"+0).val(),
    input1.Status = true,
    input1.Createddate = new Date(),
    input1.Modifieddate = new Date(),
    input1.SpecificLimitofDay = $("#SpecificLimitofDay0"+0).val(),
    input1.OverallCapital = $("#OverallCapital0"+0).val(),
    input1.TrailingStopLoss = $("#TrailingStopLoss0"+0).val(),
    input1.TrailingProfit = $("#TrailingProfit0"+0).val(),
    input1.OverallCapitalProfit = $("#OverallCapitalProfit0"+0).val(),
    input1.brokerConfigID = input.customerBrokerID,
    input1.OptionsType = $("#OptionsType0"+0).val()

    input.customerOptionsAlgochild =[input1];
    }
    if(input.customerOptionsAlgochild!=null && input.customerOptionsAlgochild!=''){
    this.AccountServices.PostCustomerOptionsAlgoService(input).subscribe(res => {
      if (res != null && res != "") {
        setTimeout(() => {
          $('[data-loader="circle-side"]').fadeOut(); 
          $('#preloader').delay(350).fadeOut('slow');
        }, 700);
        
        if(res.message=='success'){
          this.toastr.SuccessToastr("Success Algo");
         }
         else{
          this.toastr.ErrorToastr(res.message);
         }
        
        this.tabchange(this.StoreCategoryID);
        this.resetalgoform();
        this.CustomerAlgoTradeform.reset(this.CustomerAlgoTradeform.value);
        this.isSubmitted = false;
        setTimeout(() => {
          window.location.reload();
        },1000);
      } else {
        this.toastr.ErrorToastr("Please try again.");
      }
    },
      (err: any) => {
        if (err.status == 401) {
          setTimeout(() => {
            $('[data-loader="circle-side"]').fadeOut(); 
            $('#preloader').delay(350).fadeOut('slow');
          }, 200);
          this.toastr.SuccessToastr("Success Algo");
          this.router.navigate(['/']);
        }
        else {
        }
      })
    }
    else{
      setTimeout(() => {
        $('[data-loader="circle-side"]').fadeOut(); 
        $('#preloader').delay(350).fadeOut('slow');
      }, 700);
    }
  }
}
}

  }

  RemoveElementFromStringArray(element: any) {
    this.rowarry.forEach((value,index)=>{
        if(value==element) this.rowarry.splice(index,1);
    });
  }

  CustomerOptionsAlgoLegDelete(id: any,arrayvalue:any) {
    this.alerts.ComfirmAlert("Do you want to Delete Row ?", "Yes", "No").then(res => {
      if (res.isConfirmed) {
    this.RemoveElementFromStringArray(arrayvalue)
    let input = {
      COAID: id
    }
    this.AccountServices.PostCustomerOptionsAlgoLegDelete(input).subscribe(res => {
      if (res != null && res != "") {
        // console.log(res.status)
        this.toastr.ErrorToastr(res.message);
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

  CustomerOptionsAlgoLegStatus(id: any,id1:any) {
    
    let input = {
      COACID: id,
      COAID: id1,
      Status: true,
    }
    this.AccountServices.PostCustomerOptionsAlgoLegStatus(input).subscribe(res => {
      if (res != null && res != "") {
        // console.log(res.status)
        this.toastr.SuccessToastr(res.message);
        //$("#pricesmodel1").css('display','none');
        
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

  CustomerOptionsAlgoLegStatus1(id: any,id1:any) {
    
    let input = {
      COACID: id,
      COAID: id1,
      Status: false,
    }
    this.AccountServices.PostCustomerOptionsAlgoLegStatus(input).subscribe(res => {
      if (res != null && res != "") {
        // console.log(res.status)
        this.toastr.SuccessToastr(res.message);
        //$("#pricesmodel1").css('display','none');
        
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


  CallTypechange() {
    if($("#CallType0"+0).val()==1){
      $(".statergyID12 .form-select").addClass('green');
      $(".statergyID12 .form-control").addClass('green');
      $(".statergyID12 .form-select").removeClass('red');
      $(".statergyID12 .form-control").removeClass('red');
    }
    else{
      $(".statergyID12 .form-select").addClass('red');
      $(".statergyID12 .form-control").addClass('red');
      $(".statergyID12 .form-select").removeClass('green');
      $(".statergyID12 .form-control").removeClass('green');
    }
  }

  CallTypechange0() {
    this.rowarry.forEach((element) => {
    if($("#CallType"+element).val()==1){
      $(".statergyID34 .form-control"+element).addClass('green');
      $(".statergyID34 .form-control"+element).removeClass('red');
    }
    else{
      $(".statergyID34 .form-control"+element).addClass('red');
      $(".statergyID34 .form-control"+element).removeClass('green');
    }
  })
  }

  getAutoTradeAllowedlist: any;
  getAutoTradeAllowed(id: any) {
    let input = {
      identifierID: id,
      //Status : false
    }
    this.AccountServices.AutoTradeAllowed(input).subscribe(res => {
      if (res != null && res != "") {
        // console.log(res.status)
        this.getAutoTradeAllowedlist = res.status
        //if(id==)
        if (this.getAutoTradeAllowedlist == 201) {
          $('#tableSwitchFilled' + id).attr('disabled', 'disabled')
        }
        //console.log(this.GetCustomerOptionslist)
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

  symbolIdentifierIdpeprice(value:any,id:any){
    $("#Strike0Price"+id).val(value.target.value)
  }

  symbolIdentifierIdpeprice1(value:any,id:any){
    $("#Strike1Price"+id).val(value.target.value)
  }

  GetCustomerOptionslist: any;
  GetCustomerOptionslistalldata: any;
  cOAID: any = 0;
  cOACIDCE: any = 0;
  cOACIDPE: any = 0;
  GetCustomerOptions(id: any) {
    let input = {
      CustomerOptions: id,
      
      //Status : false
    }
    this.AccountServices.GetCustomerOptionsAlgo(input).subscribe(res => {
      if (res != null && res != "") {
        this.rowarry=[]
        console.log(res.result.customerOptionsAlgoChild)
        this.GetCustomerOptionslistalldata=res.result.customerOptionsAlgoChild
        this.cOAID = id;
        //this.cOACIDCE = res.result.customerOptionsAlgoChild[0].cOACID;
        //this.cOACIDPE = res.result.customerOptionsAlgoChild[1].cOACID;
        let finddata = this.SymbolListByCategory.find(m => m.customerAlgoTradeID == id);
        this.getdatawatchlist = finddata;
        // res.data.forEach(element => {

        // this.CustomerAlgoTradeform.get("identifierID")?.setValue(res.result.tradeType);
        // this.CustomerAlgoTradeform.get("identifierName")?.setValue(res.result.tradeType);

        this.toptionlistallid1()
        this.CustomerOptionsform.get("customerBrokerID")?.setValue(res.result.customerOptionsAlgo.customerBrokerID);
        this.CustomerOptionsform.get("ProductType")?.setValue(res.result.customerOptionsAlgo.productType);
        this.CustomerOptionsform.get("expiryDate")?.setValue(res.result.customerOptionsAlgo.expiryDate);
        // this.CustomerOptionsform.get("productName")?.setValue(res.result.customerOptionsAlgo.);
        this.getsetdataforwatchdata1(res.result.customerOptionsAlgo.productName)
        
        this.CustomerOptionsform.get("endTime")?.setValue(res.result.customerOptionsAlgo.endTime);
        this.CustomerOptionsform.get("squareoffTime")?.setValue(res.result.customerOptionsAlgo.squareoffTime);
        this.CustomerOptionsform.get("startTime")?.setValue(res.result.customerOptionsAlgo.startTime);
        this.CustomerOptionsform.get("statergyID")?.setValue(res.result.customerOptionsAlgo.statergyID);
        this.CustomerOptionsform.get("BrokerConfigID")?.setValue(res.result.customerOptionsAlgo.customerBrokerID);
        this.CustomerOptionsform.get("lotQTy")?.setValue(res.result.customerOptionsAlgo.lotQTy);
        this.CustomerOptionsform.get("lotSize")?.setValue(res.result.customerOptionsAlgo.lotSize);
        var i=0
        res.result.customerOptionsAlgoChild.forEach((element) => {
          
        this.rowarry.push(i)
        i++
        });
        
        if(res.result.customerOptionsAlgoChild.length!=1){
        this.rowarry.forEach((element) => {
          $("#customerOptionsAlgoChildlenth"+element).val(res.result.customerOptionsAlgoChild.length)
        
          setTimeout(() => {
            $("#cOACID"+element).val(res.result.customerOptionsAlgoChild[element].cOACID);
            $("#Takeprofit"+element).val(res.result.customerOptionsAlgoChild[element].takeprofit);
            $("#Stoploss"+element).val(res.result.customerOptionsAlgoChild[element].stoploss);
            $("#AlgoType"+element).val(res.result.customerOptionsAlgoChild[element].algoType);
            $("#OrderQuantity"+element).val(res.result.customerOptionsAlgoChild[element].orderQuantity);
            $("#CallType"+element).val(res.result.customerOptionsAlgoChild[element].callType);
            $("#OptionsType"+element).val(res.result.customerOptionsAlgoChild[element].optionsType);
            $("#TrailingStopLoss"+element).val(res.result.customerOptionsAlgoChild[element].trailingStopLoss);
            $("#OverallCapitalProfit"+element).val(res.result.customerOptionsAlgoChild[element].overallCapitalProfit);
            $("#TrailingProfit"+element).val(res.result.customerOptionsAlgoChild[element].trailingProfit);
            $("#OverallCapital"+element).val(res.result.customerOptionsAlgoChild[element].overallCapital);
            $("#SpecificLimitofDay"+element).val(res.result.customerOptionsAlgoChild[element].specificLimitofDay);
            $("#PECE"+element).val(res.result.customerOptionsAlgoChild[element].tradeType);
            setTimeout(() => {
              this.changesymbolIdentifierId()
              this.CallTypechange0()
              setTimeout(() => {
                if ($("#PECE"+element).val()==1) {
                  $("#symbolIdentifierIdpe"+element).val(res.result.customerOptionsAlgoChild[element].identifierID);
                  $("#Strike0Price"+element).val(res.result.customerOptionsAlgoChild[element].identifierID);
                }
                else{
                  $("#symbolIdentifierIdce"+element).val(res.result.customerOptionsAlgoChild[element].identifierID);
                  $("#Strike1Price"+element).val(res.result.customerOptionsAlgoChild[element].identifierID);
                }
              },300);
            },300);
            
            if (res.result.customerOptionsAlgoChild[element].algoType == 1) {
              $("#Stop0loss"+element).text("(Points)");
              $("#Take0Profit"+element).text("(Points)");
            } else if (res.result.customerOptionsAlgoChild[element].algoType == 2) {
              $("#Stop0loss"+element).text("(%)");
              $("#Take0Profit"+element).text("(%)");
            }
          }, 300);
        
      })
    }
    if(res.result.customerOptionsAlgoChild.length==1){
      this.rowarry.forEach((element) => {
        setTimeout(()=>{
        if($("#CallType0"+element).val()==1){
          $(".statergyID12 .form-select").addClass('green');
          $(".statergyID12 .form-control").addClass('green');
          $(".statergyID12 .form-select").removeClass('red');
          $(".statergyID12 .form-control").removeClass('red');
        }
        else{
          $(".statergyID12 .form-select").addClass('red');
          $(".statergyID12 .form-control").addClass('red');
          $(".statergyID12 .form-select").removeClass('green');
          $(".statergyID12 .form-control").removeClass('green');
        }
      },400)
        setTimeout(() => {
          $("#cOACID0"+0).val(res.result.customerOptionsAlgoChild[element].cOACID);
          $("#Takeprofit0"+element).val(res.result.customerOptionsAlgoChild[element].takeprofit);
          $("#Stoploss0"+element).val(res.result.customerOptionsAlgoChild[element].stoploss);
          $("#AlgoType0"+element).val(res.result.customerOptionsAlgoChild[element].algoType);
          $("#OrderQuantity0"+element).val(res.result.customerOptionsAlgoChild[element].orderQuantity);
          $("#CallType0"+element).val(res.result.customerOptionsAlgoChild[element].callType);
          $("#OptionsType0"+element).val(res.result.customerOptionsAlgoChild[element].optionsType);
          $("#TrailingStopLoss0"+element).val(res.result.customerOptionsAlgoChild[element].trailingStopLoss);
          $("#OverallCapitalProfit0"+element).val(res.result.customerOptionsAlgoChild[element].overallCapitalProfit);
          $("#TrailingProfit0"+element).val(res.result.customerOptionsAlgoChild[element].trailingProfit);
          $("#OverallCapital0"+element).val(res.result.customerOptionsAlgoChild[element].overallCapital);
          $("#SpecificLimitofDay0"+element).val(res.result.customerOptionsAlgoChild[element].specificLimitofDay);
          if (res.result.customerOptionsAlgoChild[element].algoType == 1) {
            $("#Stop0loss0"+element).text("(Points)");
            $("#Take0Profit0"+element).text("(Points)");
          } else if (res.result.customerOptionsAlgoChild[element].algoType == 2) {
            $("#Stop0loss0"+element).text("(%)");
            $("#Take0Profit0"+element).text("(%)");
          }
          // $("#PECE0"+element).val(res.result.customerOptionsAlgoChild[element].tradeType);
          // setTimeout(() => {
          //   this.changesymbolIdentifierId()
          //   setTimeout(() => {
          //     if ($("#PECE"+element).val()==1) {
          //       $("#symbolIdentifierIdpe0"+element).val(res.result.customerOptionsAlgoChild[element].identifierID);
          //     }
          //     else{
          //       $("#symbolIdentifierIdce0"+element).val(res.result.customerOptionsAlgoChild[element].identifierID);
          //     }
          //   },700);
          // },500);
          
        }, 300);
      })
    }
        //
        
        this.changestatergyID()
        this.CallTypechange0()
        this.CallTypechange()
        setTimeout(() => {
          this.toptionlistallid2()
          //this.changesymbolIdentifierId()
        }, 300);
        
        //  });
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

  toptionlistCEU1
  toptionlistCEUList1(id: any, expiry: any) {
    let input = {
      strProduct: id,
      strExpiry: expiry,
      strike: "",
      //Status : false
    }
    this.AccountServices.toptionlistCEU(input).subscribe(res => {
      if (res != null && res != "") {
        //console.log(res.result)
        this.toptionlistCEU1 = res.result
        if (this.toptionlistCEU1)
        setTimeout(()=>{
          this.toptionlistCEU1.forEach((element, test) => {
            this.signalRService.ordersignalr(element.identifier);
            this.emittService.getordersignal().subscribe(res => {
              let maindata = JSON.parse(res);
              if (maindata != null) {
                let value = this.toptionlistCEU1.find(x => x.identifier.toLowerCase() == maindata.s2.toLowerCase());
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
    },
      (err: any) => {
        if (err.status == 401) {
          this.router.navigate(['/']);
        }
        else {
        }
      })
  }

  optionlistPE1
  optionlistPEList1(id: any, expiry: any) {
    let input = {
      strProduct: id,
      strExpiry: expiry,
      strike: "",
      //Status : false
    }
    this.AccountServices.optionlistPE(input).subscribe(res => {
      if (res != null && res != "") {
        //console.log(res.result)
        this.optionlistPE1 = res.result
        if (this.optionlistPE1) {
          setTimeout(()=>{
          this.optionlistPE1.forEach((element, test) => {
            this.signalRService.ordersignalr(element.identifier);
            this.emittService.getordersignal().subscribe(res => {
              let maindata = JSON.parse(res);
              if (maindata != null) {
                let value = this.optionlistPE1.find(x => x.identifier.toLowerCase() == maindata.s2.toLowerCase());
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

  toptionlistCEU
  toptionlistCEUList(id: any) {
    let input = {
      strProduct: id,
      strExpiry: ""
      //Status : false
    }
    this.AccountServices.toptionlistCEU(input).subscribe(res => {
      if (res != null && res != "") {
        //console.log(res.result)
        this.toptionlistCEU = res.result
        setTimeout(()=>{
        this.toptionlistCEU.forEach((element, test) => {
          this.signalRService.ordersignalr(element.identifier);
          this.emittService.getordersignal().subscribe(res => {
            let maindata = JSON.parse(res);
            if (maindata != null) {
              let value = this.toptionlistCEU.find(x => x.identifier.toLowerCase() == maindata.s2.toLowerCase());
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
  optionlistPEList(id: any) {
    let input = {
      strProduct: id,
      strExpiry: ""
      //Status : false
    }
    this.AccountServices.optionlistPE(input).subscribe(res => {
      if (res != null && res != "") {
        //console.log(res.result)
        this.optionlistPE = res.result
        setTimeout(()=>{
        this.optionlistPE.forEach((element, test) => {
          this.signalRService.ordersignalr(element.identifier);
          this.emittService.getordersignal().subscribe(res => {
            let maindata = JSON.parse(res);
            if (maindata != null) {
              let value = this.optionlistPE.find(x => x.identifier.toLowerCase() == maindata.s2.toLowerCase());
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
    },
      (err: any) => {
        if (err.status == 401) {
          this.router.navigate(['/']);
        }
        else {
        }
      })
  }

  SymbolListByCategorydata: any;
  tabchangedata(id: any) {
    let Data = {
      CategoryID: id
    }
    let Data1 = {
      CategoryID: 2
    }
    let Data2 = {
      CategoryID: 3
    }
    let Data3 = {
      CategoryID: 5
    }
    let input = {
      strProduct: 'NIFTY',
      strExpiry: ""
    }
    let input1 = {
      strProduct: 'BANKNIFTY',
      strExpiry: ""
    }
    this.AccountServices.GetDashboardSymbolListByCategory(Data).subscribe(res => {
      if (res != null && res != "") {
        this.AccountServices.GetDashboardSymbolListByCategory(Data1).subscribe(res1 => {
          if (res != null && res != "") {
            this.AccountServices.GetDashboardSymbolListByCategory(Data2).subscribe(res2 => {
              if (res != null && res != "") {
                this.AccountServices.GetDashboardSymbolListByCategory(Data3).subscribe(res3 => {
                  if (res != null && res != "") {
                    this.AccountServices.optionlistPE(input).subscribe(res4 => {
                      if (res != null && res != "") {
                        this.AccountServices.toptionlistCEU(input).subscribe(res5 => {
                          if (res != null && res != "") {
                            this.AccountServices.optionlistPE(input1).subscribe(res6 => {
                              if (res != null && res != "") {
                                this.AccountServices.toptionlistCEU(input1).subscribe(res7 => {
                                  if (res != null && res != "") {
                                    this.SymbolListByCategorydata = res.result;
                                    if (res1.result != "" && res1.result != undefined && res1.result != null) {
                                      res1.result.forEach(element => {
                                        this.SymbolListByCategorydata.push(element);
                                      });
                                    }
                                    if (res2.result != "" && res2.result != undefined && res2.result != null) {
                                      res2.result.forEach(element => {
                                        this.SymbolListByCategorydata.push(element);
                                      });
                                    }
                                    if (res3.result != "" && res3.result != undefined && res3.result != null) {
                                      res3.result.forEach(element => {
                                        this.SymbolListByCategorydata.push(element);
                                      });
                                    }
                                    if (res4.result != "" && res4.result != undefined && res4.result != null) {
                                      res4.result.forEach(element => {
                                        this.SymbolListByCategorydata.push(element);
                                      });
                                    }
                                    if (res5.result != "" && res4.result != undefined && res5.result != null) {
                                      res5.result.forEach(element => {
                                        this.SymbolListByCategorydata.push(element);
                                      });
                                    }
                                    if (res6.result != "" && res4.result != undefined && res6.result != null) {
                                      res6.result.forEach(element => {
                                        this.SymbolListByCategorydata.push(element);
                                      });
                                    }
                                    if (res7.result != "" && res4.result != undefined && res7.result != null) {
                                      res7.result.forEach(element => {
                                        this.SymbolListByCategorydata.push(element);
                                      });
                                    }
                                    if (this.SymbolListByCategorydata != "" && this.SymbolListByCategorydata != undefined && this.SymbolListByCategorydata != null) {
                                      setTimeout(()=>{
                                      this.SymbolListByCategorydata.forEach((element, test) => {
                                        this.signalRService.addTransferChart(element.identifier);
                                        this.emittService.getsignalrDetail().subscribe(res => {
                                          let maindata = JSON.parse(res);
                                          if (maindata != null) {
                                            if (this.SymbolListByCategorydata != "" && this.SymbolListByCategorydata != undefined && this.SymbolListByCategorydata != null) {
                                              let value = this.SymbolListByCategorydata.find(x => x.identifier.toLowerCase() == maindata.s2.toLowerCase());
                                              if (value != "" && value != undefined && value != null) {
                                                value.buyPrice = maindata.s4;
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
                                            }
                                          }
                                        });
                                      },500)
                                        //  this.GetPortfolios();
                                      });
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
                              else {
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
    //this.toptionlistallid1(id)
    this.rowarry=[]
    this.CustomerOptionsform.reset();
    let finddata = this.SymbolListByCategory.find(m => m.symbolIdentifierId == id);
    this.getdatawatchlist = finddata;
    this.toptionlistallid1(finddata.product)
    this.toptionexpiryList(finddata.product)
    //this.toptionlistallid1(finddata.product)
  }

  getsetdataforwatchdata1(id: any) {
    setTimeout(() => {
      this.toptionlistallid1(id)
    }, 100)
    this.toptionexpiryList(id)

  }

  getsetdatatoptionlistCEU(id: any) {
    let finddata = this.toptionlistCEU.find(m => m.symbolIdentifierId == id);
    this.getdatawatchlist = finddata;

  }




  GetCustomerOptionslistdata(id: any) {
    let finddata = this.GetCustomerOptionslist.find(m => m.symbolIdentifierId == id);
    this.getdatawatchlist = finddata;
    //console.log(this.getdatawatchlist)
  }

  getsetdataoptionlistPEList(id: any) {
    let finddata = this.optionlistPE.find(m => m.symbolIdentifierId == id);
    this.getdatawatchlist = finddata;
  }

  Customeralgooff(Id: any) {
    let input = {
      CustomerAlgoTradeID: Id,
      Status: false
    }
    if (this.StoreCategoryID == 5) {
      let input1 = {
        COAID: Id,
        IsActive: false
      }
      this.AccountServices.PostCustomerOptionsAlgoStatus(input1).subscribe(res => {
        if (res != null && res != "") {
          //this.toastr.SuccessToastr("Close Algo");

          this.tabchange(this.StoreCategoryID);
          this.CustomerAlgoTradeform.reset(this.CustomerAlgoTradeform.value);
          this.router.navigate(['Market'])
        .then(() => {
          window.location.reload();
        });
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
    else {
      this.AccountServices.PostCustomerAlgoTradeStatus(input).subscribe(res => {
        if (res != null && res != "") {
          //this.toastr.SuccessToastr("Close Algo");
          this.tabchange(this.StoreCategoryID);
          this.CustomerAlgoTradeform.reset(this.CustomerAlgoTradeform.value);
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






  editalgo(Id: any) {
    let input = {
      CustAlgoTradeID: Id,
    }
    this.AccountServices.editalgodata(input).subscribe(res => {
      if (res != null && res != "") {
        //console.log(res.result)
        let finddata = this.SymbolListByCategory.find(m => m.customerAlgoTradeID == Id);
        this.getdatawatchlist = finddata;
        this.CustomerAlgoTradeform.get("TradeType")?.setValue(res.result.tradeType);
        this.CustomerAlgoTradeform.get("ProductType")?.setValue(res.result.productType);
        this.CustomerAlgoTradeform.get("BrokerConfigID")?.setValue(res.result.brokerConfigID);
        this.CustomerAlgoTradeform.get("StratergyID")?.setValue(res.result.stratergyID);
        this.CustomerAlgoTradeform.get("OrderQuantity")?.setValue(res.result.orderQuantity);
        this.CustomerAlgoTradeform.get("AlgoType")?.setValue(res.result.algoType);
        this.CustomerAlgoTradeform.get("Stoploss")?.setValue(res.result.stoploss);
        this.CustomerAlgoTradeform.get("Takeprofit")?.setValue(res.result.takeprofit);
        this.CustomerAlgoTradeform.get("SpecificLimitofDay")?.setValue(res.result.specificLimitofDay);
        this.CustomerAlgoTradeform.get("OverallCapital")?.setValue(res.result.overallCapital);
        this.CustomerAlgoTradeform.get("TrailingStopLoss")?.setValue(res.result.trailingStopLoss);
        this.CustomerAlgoTradeform.get("TrailingProfit")?.setValue(res.result.trailingProfit);
        this.CustomerAlgoTradeform.get("OverallCapitalProfit")?.setValue(res.result.overallCapitalProfit);
        if (res.result.algoType == 1) {
          this.Stoploss = "Points";
          this.IsStopLoss = true;
          this.TakeProfite = true;
        } else if (res.result.algoType == 2) {
          this.Stoploss = "%";
          this.IsStopLoss = true;
          this.TakeProfite = true;
        } else if (res.result.algoType == 3) {
          this.Stoploss = "quantity";
          this.IsStopLoss = true;
          this.TakeProfite = true;
        } else {
          this.Stoploss = "Est. Stock Price";
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

  refracealgo() {
    this.tabchange(this.StoreCategoryID);
    this.resetalgoform();
    this.CustomerAlgoTradeform.reset(this.CustomerAlgoTradeform.value);
    this.algotypechange();
  }

  get f() {
    return this.CustomerAlgoTradeform.controls;
  }

  CustomerID: any;
  isSubmitted: any = false;
  PostCustomerAlgoTrade() {
    this.isSubmitted = true;
    if (this.CustomerAlgoTradeform.valid) {
      var input = JSON.parse(JSON.stringify(this.CustomerAlgoTradeform.getRawValue()));
      if(input.OrderQuantity>=999999){
        this.toastr.ErrorToastr("Please maxmam Quantity 999999");
      }
      else{
      $('#preloader').css('display','block')
    $('[data-loader="circle-side"]').css('display','block')
      this.isSubmitted = true;
      this.CustomerID = this.sessionService.getcustomerID();
      
      input.IdentifierID = this.getdatawatchlist.symbolIdentifierId

      input.Identifier = this.getdatawatchlist.identifier
      input.CustomerAlgoTradeID = this.getdatawatchlist.customerAlgoTradeID
      input.CustomerID = this.CustomerID
      input.TradeType = 1
      input.Status = true
      input.Createddate = new Date()
      input.Modifieddate = new Date()

      this.AccountServices.PostCustomerAlgoTrade(input).subscribe(res => {
        if (res != null && res != "") {
          setTimeout(() => {
            $('[data-loader="circle-side"]').fadeOut(); 
            $('#preloader').delay(350).fadeOut('slow');
          }, 700);
          
            
          if(res.message=='success'){
            this.toastr.SuccessToastr("Success Algo");
           }
           else{
            this.toastr.ErrorToastr(res.message);
           }
           
          this.tabchange(this.StoreCategoryID);
          this.resetalgoform();
          this.CustomerAlgoTradeform.reset(this.CustomerAlgoTradeform.value);
          this.isSubmitted = false;
          setTimeout(() => {
          window.location.reload();
        },1000);
        } else {
          this.toastr.ErrorToastr("Please try again.");
        }
      },
        (err: any) => {
          if (err.status == 401) {
            setTimeout(() => {
              $('[data-loader="circle-side"]').fadeOut(); 
              $('#preloader').delay(350).fadeOut('slow');
            }, 200);
            this.toastr.SuccessToastr("Success Algo");
            this.router.navigate(['/']);
          }
          else {
          }
        })
    }
  }
  }

  toptionexpiry: any;
  toptionexpiryList(id: any) {
    let input = {
      strProduct: id,
    }
    this.AccountServices.getoptionexpiryList(input).subscribe(res => {
      if (res != null && res != "") {
        //console.log(res.result)
        this.toptionexpiry = res.result
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

  Stoploss: any = "Est. Stock Price";
  IsStopLoss: any = false;
  TakeProfite: any = false;
  algotypechange() {
    var input = JSON.parse(JSON.stringify(this.CustomerAlgoTradeform.getRawValue()));
    if (input.AlgoType == null)
      input.AlgoType = 1

    if (input.AlgoType == 1) {
      this.Stoploss = "Points";
      this.IsStopLoss = true;
      this.TakeProfite = true;
    } else if (input.AlgoType == 2) {
      this.Stoploss = "%";
      this.IsStopLoss = true;
      this.TakeProfite = true;
    } else if (input.AlgoType == 3) {
      this.Stoploss = "quantity";
      this.IsStopLoss = true;
      this.TakeProfite = true;
    } else {
      this.Stoploss = "Est. Stock Price";
    }
  }

  algotypechangeoption() {
    this.rowarry.forEach((element) => {
      if ($("#AlgoType"+element).val() == null) {
        $("#AlgoType"+element).val(1)
      }
    if ($("#AlgoType"+element).val() == 1) {
      $("#Stop0loss"+element).text("(Points)");
      $("#Take0Profit"+element).text("(Points)");
    } else if ($("#AlgoType"+element).val()== 2) {
      $("#Stop0loss"+element).text("(%)");
      $("#Take0Profit"+element).text("(%)");
    }
  });
  }

  Stoploss1: any = "Points";
  IsStopLoss1: any;
  TakeProfite1: any;
  algotypechangeoption1() {
    if ($("#AlgoType0"+0).val() == null) {
      $("#AlgoType0"+0).val(1)
    }
  if ($("#AlgoType0"+0).val() == 1) {
    $("#Stop0loss0"+0).text("(Points)");
    $("#Take0Profit0"+0).text("(Points)");
  } else if ($("#AlgoType0"+0).val()== 2) {
    $("#Stop0loss0"+0).text("(%)");
    $("#Take0Profit0"+0).text("(%)");
  }
  }

  WatchList: any;
  StoresymbolID: any;
  GetWatchLists() {
    let Data = {
      categoryID: this.StoreCategoryID
    }
    this.AccountServices.GetWatchList(Data).subscribe(res => {
      if (res != null && res != "") {
        this.WatchList = res.result;
        //console.log(this.WatchList)
        // this.StoresymbolID = res.result.symbolID;
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

  DeleteWatchlistdata:any;
  DeleteWatchlistData(id:any){
    let Data ={
      SymbolIdentifierId : id
    }
    this.AccountServices.DeleteWatchlist(Data).subscribe(res => {
      if(res != null && res != ""){
        // this.DeleteWatchlistdata = res.result;
        this.tabchange(this.StoreCategoryID);
        this.serachForm.get("text")?.setValue(this.StoreSearce)
        this.SearchWatchlist()  
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

  /*AddWatchlistdata:any;
  AddWatchlistData(id:any,symbolID:any){
    let Data ={
      SymbolIdentifierId : id,
      SymbolID : symbolID,
    }
    this.AccountServices.addWatchlist(Data).subscribe(res => {
      if(res != null && res != ""){
        // this.AddWatchlistdata = res.result;
        this.tabchange(this.StoreCategoryID);
        this.serachForm.get("text")?.setValue(this.StoreSearce)
        this.SearchWatchlist()
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
  }*/


  GetDataSymbolVolumeListData: any;
  GetDataSymbolVolumeListBySymbolID(id: any) {
    let Data = {
      categoryID: this.StoreCategoryID
    }
    this.AccountServices.GetWatchList(Data).subscribe(res => {
      if (res != null && res != "") {
        this.GetDataSymbolVolumeListData = res.result;
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

  SearchWatchlistdata: any;
  StoreSearce: any;
  SearchWatchlist() {
    var input = JSON.parse(JSON.stringify(this.serachForm.getRawValue()));
    let searchtxt = input.text;
    this.StoreSearce = input.text;
    this.AccountServices.SymbolIdentifierByUserID(searchtxt).subscribe(res => {
      if (res != null && res != "") {
        this.SearchWatchlistdata = res.result;
        this.toastr.SuccessToastr("Success");
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
  quantitystore: any = 0;
  changequantity() {
    var input = JSON.parse(JSON.stringify(this.detdata.getRawValue()));
    if (this.getdatawatchlist) {
      if (this.getdatawatchlist.QuotationLot == null) {
        this.getdatawatchlist.QuotationLot = 1
      }
      this.quantitystore = input.BuyPrice * this.getdatawatchlist.QuotationLot
    }

  }
  PostCreateOrder: any;
  addPostCreateOrderbuy(id: any) {
    
    this.isSubmitted = true;
    if (this.detdata.valid) {
      var input = JSON.parse(JSON.stringify(this.detdata.getRawValue()));
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
      TotalPurchaseAmt: this.quantitydata,
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
      setTimeout(() => {
        $('[data-loader="circle-side"]').fadeOut(); 
        $('#preloader').delay(350).fadeOut('slow');
      }, 200);
      if (res != null && res != "") {
        this.SearchWatchlist()
        this.Customeralgooff(this.getdatawatchlist.symbolIdentifierId);
        if(res.message=='success'){
          this.toastr.SuccessToastr("Add Buy Order");
         }
         else{
          this.toastr.ErrorToastr(res.message);
         }
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
        setTimeout(() => {
        this.router.navigate(['OrderList'])
        .then(() => {
          //this.toastr.SuccessToastr("Add Buy Order");
          window.location.reload();
        });
      },1000);
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
    if (this.detdata.valid) {
      var input = JSON.parse(JSON.stringify(this.detdata.getRawValue()));
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
    let customSwitchFilled2 = input.customSwitchFilled1;
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
      TotalPurchaseAmt: this.quantitydata,
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
      setTimeout(() => {
        $('[data-loader="circle-side"]').fadeOut(); 
        $('#preloader').delay(350).fadeOut('slow');
      }, 200);
      if (res != null && res != "") {
        this.SearchWatchlist()
        this.Customeralgooff(this.getdatawatchlist.symbolIdentifierId);
        if(res.message=='success'){
          this.toastr.SuccessToastr("Add Sell Order");
         }
         else{
          this.toastr.ErrorToastr(res.message);
         }
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
        setTimeout(() => {
        this.router.navigate(['OrderList'])
        .then(() => {
          
          window.location.reload();
        });
      },1000);
        if (err.status == 401) {
          this.router.navigate(['/']);
        }
        else {
        }
      })
    }
  }
  }

  maltiorder() {
    this.isSubmitted = true;
    
    if (this.CustomerOptionsform1.valid) {
      var input = JSON.parse(JSON.stringify(this.CustomerOptionsform1.getRawValue()));
      if(input.OrderQuantity>=999999){
        this.toastr.ErrorToastr("Please maxmam Quantity 999999");
      }
      else{
      $('#preloader').css('display','block')
    $('[data-loader="circle-side"]').css('display','block')
      
      let finddata = this.toptionlistCEU1.find(m => m.symbolIdentifierId == input.StrikeId);

      if (input.customSwitchFilled2 == null)
        input.customSwitchFilled2 = false;
      if (input.customSwitchFilled == null)
        input.customSwitchFilled = false;

      let data1 = {
        SymbolID: 0,
        Type: 1,
        OrderType: input.CallType,
        Quantity: input.OrderQuantity,
        EntryPrice: finddata.buyPrice,
        VolumePrice: "",
        Commission: "",
        TotalPurchaseAmt: this.quantitystore,
        isLimitOrder: "",
        isMarketOrder: "",
        isStopLoss: input.customSwitchFilled,
        StopLossPer: "",
        StopLossEstPrice: input.Stoploss,
        isTakeProfit: input.customSwitchFilled2,
        TakeProfitPer: "",
        TakeProfitEstPrice: input.Takeprofit,
        OrderStatus: 1,
        SellPrice: finddata.sellPrice,
        BuyPrice: finddata.buyPrice,
        ClosedPrice: "",
        BrokerConfigID: input.BrokerID,
        ProductType: input.ProductType,
        ProfitLost: "",
        IdentifierId: input.StrikeId,
        IsSettled: "",
        iSAutoTrade: finddata.addedinAlgoTrade,
        BrokerStatus: "",
        OrderID: 0
      }
      this.AccountServices.PostCreateOrderadd(data1).subscribe(res => {

        if (res != null && res != "") {
          this.SearchWatchlist()
          this.Customeralgooff(this.getdatawatchlist.symbolIdentifierId);
          if(res.message=='success'){
            this.toastr.SuccessToastr("Success Order");
           }
           else{
            this.toastr.ErrorToastr(res.message);
           }
        setTimeout(() => {
        this.router.navigate(['OrderList'])
        .then(() => {
          
          window.location.reload();
        });
      },1000);

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
      var input = JSON.parse(JSON.stringify(this.CustomerOptionsform1.getRawValue()));
      if(input.OrderQuantity1>=999999){
        this.toastr.ErrorToastr("Please maxmam Quantity 999999");
      }
      else{
      let finddata1 = this.optionlistPE1.find(m => m.symbolIdentifierId == input.StrikeId1);
      if (input.customSwitchFilled3 == null)
        input.customSwitchFilled3 = false;
      if (input.customSwitchFilled2 == null)
        input.customSwitchFilled2 = false;

      let Data1 = {
        SymbolID: 0,
        Type: 1,
        OrderType: input.CallType1,
        Quantity: input.OrderQuantity1,
        EntryPrice: finddata1.sellPrice,
        VolumePrice: "",
        Commission: "",
        TotalPurchaseAmt: this.quantitystore,
        isLimitOrder: "",
        isMarketOrder: "",
        isStopLoss: input.customSwitchFilled2,
        StopLossPer: "",
        StopLossEstPrice: input.Stoploss1,
        isTakeProfit: input.customSwitchFilled3,
        TakeProfitPer: "",
        TakeProfitEstPrice: input.Takeprofit1,
        OrderStatus: 1,
        SellPrice: finddata1.sellPrice,
        BuyPrice: finddata1.buyPrice,
        ClosedPrice: "",
        BrokerConfigID: input.BrokerID,
        ProductType: input.ProductType,
        ProfitLost: "",
        IdentifierId: input.StrikeId1,
        IsSettled: "",
        iSAutoTrade: finddata1.addedinAlgoTrade,
        BrokerStatus: "",
        OrderID: 0
      }
      this.AccountServices.PostCreateOrderadd(Data1).subscribe(res => {
        setTimeout(() => {
          $('[data-loader="circle-side"]').fadeOut(); 
          $('#preloader').delay(350).fadeOut('slow');
        }, 200);
        if (res != null && res != "") {
          this.SearchWatchlist()
          this.Customeralgooff(this.getdatawatchlist.symbolIdentifierId);
          if(res.message=='success'){
            this.toastr.SuccessToastr("Success Order");
           }
           else{
            this.toastr.ErrorToastr(res.message);
           }
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
          this.toastr.SuccessToastr("Success Order");
          setTimeout(() => {
          this.router.navigate(['OrderList'])
          .then(() => {
            
            window.location.reload();
          });
        },1000);
          if (err.status == 401) {
            this.router.navigate(['/']);
          }
          else {
          }
        })

    }
  }
  }

  quantitydata:any
  Quantitypricetotal(){

    var input = JSON.parse(JSON.stringify(this.detdata.getRawValue()));
    this.quantitydata= input.Quantity* this.getdatawatchlist.buyPrice
    if(input.Quantity>=999999){
      this.toastr.ErrorToastr("Please maxmam Quantity 999999");
    }
    
  }
}


