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

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
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
    ProductType: new FormControl(),
    expiryDate: new FormControl(),
    productName: new FormControl(),
    lotSize: new FormControl(),
    lotQTy: new FormControl(),
    BrokerConfigID: new FormControl(),
    statergyID: new FormControl(),
    StratergyID2: new FormControl(),
    StratergyID1: new FormControl(),
    startTime: new FormControl(),
    endTime: new FormControl(),
    squareoffTime: new FormControl(),
    customerId: new FormControl(),
    isActive: new FormControl(),
    createddate: new FormControl(),
    companyId: new FormControl(),
    CallType: new FormControl(),
    OrderQuantity: new FormControl(),
    StratergyID: new FormControl(),
    AlgoType: new FormControl(),
    Stoploss: new FormControl(),
    Takeprofit: new FormControl(),
    SpecificLimitofDay: new FormControl(),
    OverallCapital: new FormControl(),
    TrailingStopLoss: new FormControl(),
    CallType1: new FormControl(),
    OrderQuantity1: new FormControl(),
    AlgoType1: new FormControl(),
    Stoploss1: new FormControl(),
    Takeprofit1: new FormControl(),
    SpecificLimitofDay1: new FormControl(),
    OverallCapital1: new FormControl(),
    TrailingStopLoss1: new FormControl(),
    OptionsType: new FormControl(),
    OptionsType1: new FormControl(),
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
    brokerConfigID: new FormControl(),
  })


  constructor(public signalRService: SignalrService, private emittService: EmittService, private http: HttpClient, formBuilder: FormBuilder, private sessionService: SessionServicesService, private router: Router, private AccountServices: AccountServicesService, private toastr: ToastrServiceServiceService) {
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
      customerBrokertype: [1],
      EstStockPrice1: [''],
      EstStockPrice2: [''],
      customSwitchFilleddata1: [''],
      customSwitchFilled2: [''],
      customSwitchFilled: [''],
      customSwitchFilleddata: ['']
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
      TradeType: [0],
      BrokerConfigID: ['', Validators.required],
      StratergyID: ['', Validators.required],
      OrderQuantity: [1],
      OptionsType: [1],
      OptionsType1: [1],
      ProductType: [null],
      lotSize: new FormControl(),
      lotQTy: new FormControl(),
      //BrokerConfigID:new FormControl(),
      statergyID: ['', Validators.required],
      StratergyID2: new FormControl(),
      StratergyID1: new FormControl(),
      startTime: new FormControl(),
      endTime: new FormControl(),
      squareoffTime: new FormControl(),
      customerId: new FormControl(),
      isActive: new FormControl(),
      createddate: new FormControl(),
      companyId: new FormControl(),
      CallType: new FormControl(),
      //OrderQuantity:new FormControl(),
      //StratergyID:new FormControl(),
      AlgoType: new FormControl(),
      Stoploss: new FormControl(),
      Takeprofit: new FormControl(),
      SpecificLimitofDay: new FormControl(),
      OverallCapital: new FormControl(),
      TrailingStopLoss: new FormControl(),
      CallType1: new FormControl(),
      OrderQuantity1: new FormControl(),
      AlgoType1: new FormControl(),
      Stoploss1: new FormControl(),
      Takeprofit1: new FormControl(),
      SpecificLimitofDay1: new FormControl(),
      OverallCapital1: new FormControl(),
      TrailingStopLoss1: new FormControl(),
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
      TrailingStopLoss: ['', Validators.required],
      Status: [true]
    });
    this.CustomerOptionsform1 = formBuilder.group({

      ProductType: ['', Validators.required],
      BrokerID: ['', Validators.required],
      // StratergyID:['', Validators.required],
      OrderQuantity1: [1],
      CallType: ['', Validators.required],
      CallType1: [1],
      OrderQuantity: [1],
      // AlgoType:['', Validators.required],
      expiryDate1: ['', Validators.required],
      StrikeId: ['', Validators.required],
      StrikeId1: ['', Validators.required],
      // TrailingStopLoss:['', Validators.required],
      // Status:[true]
    });
  }
  Name: any;
  // Token: any;
  // customerID: any;
  TotalFund: any;
  NIFTY50: any;
  NIFTYBANK: any;
  NIFTYFINSERVICE: any;
  ngOnInit(): void {

    this.signalRService.startConnection();
    this.Name = this.sessionService.getUsername();
    // this.Token = this.sessionService.getToken();
    // this.customerID = this.sessionService.getcustomerID();
    this.TotalFund = this.sessionService.getTotalFund();
    this.tabchange(1);
    this.tabchangedata(1);
    this.GetWatchLists();
    this.getStratergy();
    this.GetBrokerConfig();
    this.resetalgoform();
    this.CustomerAlgoTradeform.reset(this.CustomerAlgoTradeform.value);
    this.algotypechange();
    this.GetTopLooserlist();
    this.GetTopTopGainer();
    this.GetActiveOrderList();
    //this.GetCustomerOptions()
    this.changequantity();
    this.getip();
    this.dayorderlistdata()
    this.GetCustDeviceLogdata()
    this.GetHeaderSymbols()
    // setInterval(() =>{ 
    //   this.GetActiveOrderList()
    //   this.GetPortfolios();
    // },1000);
    //this.signalRService.startConnection()  
    setTimeout(() => {
      $('.statergyID12').css('display', 'none')
      $('.statergyID34').css('display', 'none')
    }, 500)
    setTimeout(() => {
      this.GetActiveOrderList();
      this.dayorderlistdata()
      this.GetPortfolios();
      this.GetTopTopGainer();
      this.GetHeaderSymbols();
      this.GetTopLooserlist();
    }, 1000);
    setTimeout(() => {
      console.clear();
    }, 1500)
  }

  changestatergyID() {
    var input = JSON.parse(JSON.stringify(this.CustomerOptionsform.getRawValue()));
    var statergyID = input.statergyID
    if (statergyID == 4 || statergyID == 5) {
      $('.statergyID12').css('display', 'none')
      $('.statergyID34').css('display', 'block')
    }
    else {
      // identifierID: new FormControl(),
      // identifierName: new FormControl(),
      // customerBrokerID:new FormControl(),
      // ProductType:new FormControl(),
      // expiryDate:new FormControl(),
      // productName:new FormControl(),
      // lotSize:new FormControl(),
      // lotQTy:new FormControl(),
      // BrokerConfigID:new FormControl(),
      // statergyID:new FormControl(),
      // StratergyID2:new FormControl(),
      // StratergyID1:new FormControl(),
      // startTime:new FormControl(),
      // endTime:new FormControl(),
      // squareoffTime:new FormControl(),
      // customerId:new FormControl(),
      // isActive:new FormControl(),
      // createddate:new FormControl(),
      // companyId:new FormControl(),
      // CallType:new FormControl(),
      // OrderQuantity:new FormControl(),
      // StratergyID:new FormControl(),
      // AlgoType:new FormControl(),
      // Stoploss:new FormControl(),
      // Takeprofit:new FormControl(),
      // SpecificLimitofDay:new FormControl(),
      // OverallCapital:new FormControl(),
      // TrailingStopLoss:new FormControl(),
      // CallType1:new FormControl(),
      // OrderQuantity1:new FormControl(),
      // AlgoType1:new FormControl(),
      // Stoploss1:new FormControl(),
      // Takeprofit1:new FormControl(),
      // SpecificLimitofDay1:new FormControl(),
      // OverallCapital1:new FormControl(),
      // TrailingStopLoss1:new FormControl(),
      // OptionsType:new FormControl(),
      // OptionsType1:new FormControl(),



      // this.Applicationform.get("parentPhoneNo")?.clearValidators();
      // this.Applicationform.get("dateOfBirth")?.addValidators(Validators.required);

      $('.statergyID12').css('display', 'block')
      $('.statergyID34').css('display', 'none')
    }
  }

  IpAdress:any;
  getip(){
    this.AccountServices.getIPAddress().subscribe(res => {
      if(res != null && res != ""){
        this.IpAdress = res.ip;
      }else{
        this.IpAdress = "";
      }
    });
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

  TopTopGainerList: any;
  GetTopTopGainer(): any {
    this.AccountServices.getTopGainer().subscribe(res => {
      if (res != null && res != "") {
        this.TopTopGainerList = res.result;
        setTimeout(()=>{
        this.TopTopGainerList.forEach((element, test) => {
          this.signalRService.ordersignalr(element.identifier);
          this.emittService.getordersignal().subscribe(res => {
            let maindata = JSON.parse(res);
            if (maindata != null) {
              let value = this.TopTopGainerList.find(x => x.identifier.toLowerCase() == maindata.s2.toLowerCase());
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
        //console.log(this.TopTopGainerList)
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


  TopLooserList: any;
  GetTopLooserlist(): any {
    this.AccountServices.GetTopLooser().subscribe(res => {
      if (res != null && res != "") {
        this.TopLooserList = res.result;
        setTimeout(()=>{
        this.TopLooserList.forEach((element, test) => {
          this.signalRService.ordersignalr(element.identifier);
          this.emittService.getordersignal().subscribe(res => {
            let maindata = JSON.parse(res);
            if (maindata != null) {
              let value = this.TopLooserList.find(x => x.identifier.toLowerCase() == maindata.s2.toLowerCase());
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
              // value.profitLost = naiveRound(value.lastBuyPrice*value.quantity-value.entryPrice*value.quantity,2)
              // function naiveRound(num, decimalPlaces = 0) {
              //   var p = Math.pow(10, decimalPlaces);
              //   return Math.round(num * p) / p;
              // }
              }
            }
          });
        });
      },500)
        //console.log(this.TopLooserList)
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
      }, 500)
    }
    else {
      setTimeout(() => {
        $('.tagchangebtn').css('display', 'block')
        $('.tagchangebtn1').css('display', 'none')
        $('.tableSwitchFilled2').css('display', 'none')
        $('.tableSwitchFilled1').css('display', 'block')

      }, 500)
    }
    this.StoreCategoryID = id;
    let Data = {
      CategoryID: id
    }
    this.AccountServices.GetDashboardSymbolListByCategory(Data).subscribe(res => {
      if (res != null && res != "") {
        this.SymbolListByCategory = res.result;

        //console.log(this.SymbolListByCategory)
        // this.SymbolListByCategory.forEach(element => {
        //   this.SymbolListByCategoryarraylist.push(element);
        // });
        if (this.SymbolListByCategory != "" && this.SymbolListByCategory != undefined && this.SymbolListByCategory != null) {
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

  // customerOptionsAlgoPE :any;
  // customerOptionsAlgoCE :any;
  PostCustomerOptionsAlgo() {

    this.isSubmitted = true;
    // var customerOptionsAlgoPE :any;
    // var customerOptionsAlgoCE :any;
    // if(this.CustomerOptionsform.valid){

    this.isSubmitted = true;

    this.CustomerID = this.sessionService.getcustomerID();
    var input = JSON.parse(JSON.stringify(this.CustomerOptionsform.getRawValue()));
    if (input.statergyID == '4' || input.statergyID == '5') {
      let finddata = this.optionlistPE1.find(m => m.symbolIdentifierId == input.StratergyID1);
      let finddata1 = this.toptionlistCEU1.find(m => m.symbolIdentifierId == input.StratergyID2);

      input.IdentifierID = this.getdatawatchlist.symbolIdentifierId
      input.IdentifierName = this.getdatawatchlist.identifier
      input.CustomerId = this.CustomerID;
      input.ProductName = this.getdatawatchlist.product;
      input.COAID = this.cOAID;
      input.CustomerBrokerID = input.customerBrokerID;
      var input1 = JSON.parse(JSON.stringify(this.customerOptionsAlgoCE.getRawValue()));
      // input1.COACID = 0;
      // input1.COAID = 0;
      if (input.CallType == null) {
        input1.CallType = 1;
      } else {
        input1.CallType = input.CallType;
      }
      input1.CustomerAlgoTradeID = 0;
      input1.cOACID = this.cOACIDCE;
      input1.cOAID = this.cOAID;
      input1.CustomerID = this.CustomerID;
      input1.IdentifierID = finddata.symbolIdentifierId;
      input1.Identifier = finddata.identifier;
      input1.TradeType = 0;
      input1.ProductType = input.ProductType;
      input1.StratergyID = input.StratergyID;
      input1.OrderQuantity = input.OrderQuantity;
      input1.AlgoType = input.AlgoType;
      input1.Stoploss = input.Stoploss;
      input1.Takeprofit = input.Takeprofit;
      input1.Status = null;
      input1.Createddate = new Date();
      input1.Modifieddate = new Date();
      input1.SpecificLimitofDay = input.SpecificLimitofDay;
      input1.OverallCapital = input.OverallCapital;
      input1.TrailingStopLoss = input.TrailingStopLoss;
      input1.brokerConfigID = input.customerBrokerID;
      input1.OptionsType = input.OptionsType;

      var input2 = JSON.parse(JSON.stringify(this.customerOptionsAlgoPE.getRawValue()));
      // input2.COACID = 0;
      // input2.COAID = 0;
      input2.cOACID = this.cOACIDPE;
      input2.cOAID = this.cOAID;
      input2.CallType = input.CallType1;
      input2.CustomerAlgoTradeID = 0;
      input2.CustomerID = this.CustomerID;
      input2.IdentifierID = finddata1.symbolIdentifierId;
      input2.OrderQuantity = input.OrderQuantity1;
      input2.Identifier = finddata1.identifier;
      input2.TradeType = 0;
      input2.ProductType = input.ProductType;
      input2.StratergyID = input.StratergyID1;
      input2.AlgoType = input.AlgoType1;
      input2.Stoploss = input.Stoploss1;
      input2.Takeprofit = input.Takeprofit1;
      input2.Status = null;
      input2.Createddate = new Date();
      input2.Modifieddate = new Date();
      input2.SpecificLimitofDay = input.SpecificLimitofDay1;
      input2.OverallCapital = input.OverallCapital1;
      input2.TrailingStopLoss = input.TrailingStopLoss1;
      input2.brokerConfigID = input.customerBrokerID;
      input2.OptionsType = input.OptionsType1;

      input.customerOptionsAlgoPE = input2;
      input.customerOptionsAlgoCE = input1;
    }
    else {
      input.IdentifierID = this.getdatawatchlist.symbolIdentifierId
      input.IdentifierName = this.getdatawatchlist.identifier
      input.CustomerId = this.CustomerID;
      input.ProductName = this.getdatawatchlist.product;
      input.COAID = this.cOAID;
      input.CustomerBrokerID = input.customerBrokerID;
      var input1 = JSON.parse(JSON.stringify(this.customerOptionsAlgoCE.getRawValue()));
      // input1.COACID = 0;
      // input1.COAID = 0;
      if (input.CallType == null) {
        input1.CallType = 1;
      } else {
        input1.CallType = input.CallType;
      }
      input1.CustomerAlgoTradeID = 0;
      input1.cOACID = this.cOACIDCE;
      input1.cOAID = this.cOAID;
      input1.CustomerID = this.CustomerID;
      input1.IdentifierID = this.getdatawatchlist.symbolIdentifierId;
      input1.Identifier = this.getdatawatchlist.identifier;
      input1.TradeType = 0;
      input1.ProductType = input.ProductType;
      input1.StratergyID = input.StratergyID;
      input1.OrderQuantity = input.OrderQuantity;
      input1.AlgoType = input.AlgoType;
      input1.Stoploss = input.Stoploss;
      input1.Takeprofit = input.Takeprofit;
      input1.Status = null;
      input1.Createddate = new Date();
      input1.Modifieddate = new Date();
      input1.SpecificLimitofDay = input.SpecificLimitofDay;
      input1.OverallCapital = input.OverallCapital;
      input1.TrailingStopLoss = input.TrailingStopLoss;
      input1.brokerConfigID = input.customerBrokerID;
      input1.OptionsType = input.OptionsType;

      var input2 = JSON.parse(JSON.stringify(this.customerOptionsAlgoPE.getRawValue()));
      // input2.COACID = 0;
      // input2.COAID = 0;
      input2.cOACID = this.cOACIDPE;
      input2.cOAID = this.cOAID;
      input2.CallType = input.CallType1;
      input2.CustomerAlgoTradeID = 0;
      input2.CustomerID = this.CustomerID;
      input2.IdentifierID = this.getdatawatchlist.symbolIdentifierId;
      input2.OrderQuantity = input.OrderQuantity1;
      input2.Identifier = this.getdatawatchlist.identifier;
      input2.TradeType = 0;
      input2.ProductType = input.ProductType;
      input2.StratergyID = input.StratergyID1;
      input2.AlgoType = input.AlgoType1;
      input2.Stoploss = input.Stoploss1;
      input2.Takeprofit = input.Takeprofit1;
      input2.Status = null;
      input2.Createddate = new Date();
      input2.Modifieddate = new Date();
      input2.SpecificLimitofDay = input.SpecificLimitofDay1;
      input2.OverallCapital = input.OverallCapital1;
      input2.TrailingStopLoss = input.TrailingStopLoss1;
      input2.brokerConfigID = input.customerBrokerID;
      input2.OptionsType = input.OptionsType1;

      input.customerOptionsAlgoPE = input2;
      input.customerOptionsAlgoCE = input1;
    }
    this.AccountServices.PostCustomerOptionsAlgoService(input).subscribe(res => {
      if (res != null && res != "") {
        this.toastr.SuccessToastr("Success");
        this.tabchange(this.StoreCategoryID);
        this.resetalgoform();
        this.CustomerAlgoTradeform.reset(this.CustomerAlgoTradeform.value);
        this.isSubmitted = false;
        window.location.reload();
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
    // }
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

  GetCustomerOptionslist: any;
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

        console.log(res.result)
        this.cOAID = id;
        this.cOACIDCE = res.result.customerOptionsAlgoChild[0].cOACID;
        this.cOACIDPE = res.result.customerOptionsAlgoChild[1].cOACID;
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
        this.CustomerOptionsform.get("Takeprofit")?.setValue(res.result.customerOptionsAlgoChild[0].takeprofit);
        this.CustomerOptionsform.get("Stoploss")?.setValue(res.result.customerOptionsAlgoChild[0].stoploss);
        this.CustomerOptionsform.get("AlgoType")?.setValue(res.result.customerOptionsAlgoChild[0].algoType);
        setTimeout(() => {
          this.CustomerOptionsform.get("StratergyID2")?.setValue(res.result.customerOptionsAlgoChild[1].stratergyID);
          this.CustomerOptionsform.get("StratergyID1")?.setValue(res.result.customerOptionsAlgoChild[0].stratergyID);
        }, 200);
        this.CustomerOptionsform.get("OrderQuantity")?.setValue(res.result.customerOptionsAlgoChild[0].orderQuantity);
        this.CustomerOptionsform.get("CallType")?.setValue(res.result.customerOptionsAlgoChild[0].callType);
        this.CustomerOptionsform.get("OptionsType")?.setValue(res.result.customerOptionsAlgoChild[0].optionsType);
        this.CustomerOptionsform.get("OptionsType1")?.setValue(res.result.customerOptionsAlgoChild[1].optionsType);
        this.CustomerOptionsform.get("TrailingStopLoss1")?.setValue(res.result.customerOptionsAlgoChild[1].trailingStopLoss);
        this.CustomerOptionsform.get("OverallCapital1")?.setValue(res.result.customerOptionsAlgoChild[1].overallCapital);
        this.CustomerOptionsform.get("SpecificLimitofDay1")?.setValue(res.result.customerOptionsAlgoChild[1].specificLimitofDay);
        this.CustomerOptionsform.get("Takeprofit1")?.setValue(res.result.customerOptionsAlgoChild[1].takeprofit);
        this.CustomerOptionsform.get("Stoploss1")?.setValue(res.result.customerOptionsAlgoChild[1].stoploss);
        this.CustomerOptionsform.get("AlgoType1")?.setValue(res.result.customerOptionsAlgoChild[1].algoType);

        this.CustomerOptionsform.get("OrderQuantity1")?.setValue(res.result.customerOptionsAlgoChild[1].orderQuantity);
        this.CustomerOptionsform.get("CallType1")?.setValue(res.result.customerOptionsAlgoChild[1].callType);
        this.CustomerOptionsform.get("TrailingStopLoss")?.setValue(res.result.customerOptionsAlgoChild[0].trailingStopLoss);
        this.CustomerOptionsform.get("OverallCapital")?.setValue(res.result.customerOptionsAlgoChild[0].overallCapital);
        this.CustomerOptionsform.get("SpecificLimitofDay")?.setValue(res.result.customerOptionsAlgoChild[0].specificLimitofDay);
        if (res.result.customerOptionsAlgoChild[0].algoType == 1) {
          this.Stoploss = "Points";
          this.IsStopLoss = true;
          this.TakeProfite = true;
        } else if (res.result.customerOptionsAlgoChild[0].algoType == 2) {
          this.Stoploss = "%";
          this.IsStopLoss = true;
          this.TakeProfite = true;
        } else if (res.result.customerOptionsAlgoChild[0].algoType == 3) {
          this.Stoploss = "quantity";
          this.IsStopLoss = true;
          this.TakeProfite = true;
        } else {
          this.Stoploss = "Est. Stock Price";
        }
        if (res.result.customerOptionsAlgoChild[1].algoType == 1) {
          this.Stoploss1 = "Points";
          this.IsStopLoss1 = true;
          this.TakeProfite1 = true;
        } else if (res.result.customerOptionsAlgoChild[1].algoType == 2) {
          this.Stoploss1 = "%";
          this.IsStopLoss1 = true;
          this.TakeProfite1 = true;
        } else if (res.result.customerOptionsAlgoChild[1].algoType == 3) {
          this.Stoploss1 = "quantity";
          this.IsStopLoss1 = true;
          this.TakeProfite1 = true;
        } else {
          this.Stoploss = "Est. Stock Price";
        }
        //
        this.changestatergyID()
        this.toptionlistallid2()

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
      strExpiry: expiry
      //Status : false
    }
    this.AccountServices.toptionlistCEU(input).subscribe(res => {
      if (res != null && res != "") {
        //console.log(res.result)
        this.toptionlistCEU1 = res.result
        if (this.toptionlistCEU1)
          this.toptionlistCEU1.forEach((element, test) => {
            this.signalRService.ordersignalr(element.identifier);
            this.emittService.getordersignal().subscribe(res => {
              let maindata = JSON.parse(res);
              if (maindata != null) {
                let value = this.toptionlistCEU1.find(x => x.identifier.toLowerCase() == maindata.s2.toLowerCase());
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
                // value.profitLost = naiveRound(value.lastBuyPrice*value.quantity-value.entryPrice*value.quantity,2)
                // function naiveRound(num, decimalPlaces = 0) {
                //   var p = Math.pow(10, decimalPlaces);
                //   return Math.round(num * p) / p;
                // }
                }
              }
            });
          });
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
      strExpiry: expiry
      //Status : false
    }
    this.AccountServices.optionlistPE(input).subscribe(res => {
      if (res != null && res != "") {
        //console.log(res.result)
        this.optionlistPE1 = res.result
        if (this.optionlistPE1) {
          this.optionlistPE1.forEach((element, test) => {
            this.signalRService.ordersignalr(element.identifier);
            this.emittService.getordersignal().subscribe(res => {
              let maindata = JSON.parse(res);
              if (maindata != null) {
                let value = this.optionlistPE1.find(x => x.identifier.toLowerCase() == maindata.s2.toLowerCase());
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
                // value.profitLost = naiveRound(value.lastBuyPrice*value.quantity-value.entryPrice*value.quantity,2)
                // function naiveRound(num, decimalPlaces = 0) {
                //   var p = Math.pow(10, decimalPlaces);
                //   return Math.round(num * p) / p;
                // }
                }
              }
            });
          });
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

        this.toptionlistCEU.forEach((element, test) => {
          this.signalRService.ordersignalr(element.identifier);
          this.emittService.getordersignal().subscribe(res => {
            let maindata = JSON.parse(res);
            if (maindata != null) {
              let value = this.toptionlistCEU.find(x => x.identifier.toLowerCase() == maindata.s2.toLowerCase());
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
              // value.profitLost = naiveRound(value.lastBuyPrice*value.quantity-value.entryPrice*value.quantity,2)
              // function naiveRound(num, decimalPlaces = 0) {
              //   var p = Math.pow(10, decimalPlaces);
              //   return Math.round(num * p) / p;
              // }
            }
          }
          });
        });
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
        this.optionlistPE.forEach((element, test) => {
          this.signalRService.ordersignalr(element.identifier);
          this.emittService.getordersignal().subscribe(res => {
            let maindata = JSON.parse(res);
            if (maindata != null) {
              let value = this.optionlistPE.find(x => x.identifier.toLowerCase() == maindata.s2.toLowerCase());
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
              // value.profitLost = naiveRound(value.lastBuyPrice*value.quantity-value.entryPrice*value.quantity,2)
              // function naiveRound(num, decimalPlaces = 0) {
              //   var p = Math.pow(10, decimalPlaces);
              //   return Math.round(num * p) / p;
              // }
            }
          }
          });
        });
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

                                        this.GetPortfolios();
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
          this.toastr.SuccessToastr("Success");

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
    else {
      this.AccountServices.PostCustomerAlgoTradeStatus(input).subscribe(res => {
        if (res != null && res != "") {
          this.toastr.SuccessToastr("Success");
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
      this.isSubmitted = true;
      this.CustomerID = this.sessionService.getcustomerID();
      var input = JSON.parse(JSON.stringify(this.CustomerAlgoTradeform.getRawValue()));
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
          this.toastr.SuccessToastr("Success");
          this.tabchange(this.StoreCategoryID);
          this.resetalgoform();
          this.CustomerAlgoTradeform.reset(this.CustomerAlgoTradeform.value);
          this.isSubmitted = false;
          window.location.reload();
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
    var input = JSON.parse(JSON.stringify(this.CustomerOptionsform.getRawValue()));
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

  Stoploss1: any = "Points";
  IsStopLoss1: any;
  TakeProfite1: any;
  algotypechangeoption1() {
    var input = JSON.parse(JSON.stringify(this.CustomerOptionsform.getRawValue()));
    if (input.AlgoType1 == null)
      input.AlgoType1 = 1
    if (input.AlgoType1 == 1) {
      this.Stoploss1 = "Points";
      this.IsStopLoss1 = true;
      this.TakeProfite1 = true;
    } else if (input.AlgoType1 == 2) {
      this.Stoploss1 = "%";
      this.IsStopLoss1 = true;
      this.TakeProfite1 = true;
    } else if (input.AlgoType1 == 3) {
      this.Stoploss1 = "quantity";
      this.IsStopLoss1 = true;
      this.TakeProfite1 = true;
    } else {
      this.Stoploss1 = "Est. Stock Price";
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

  /*DeleteWatchlistdata:any;
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

  AddWatchlistdata:any;
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
    var input = JSON.parse(JSON.stringify(this.detdata.getRawValue()));
    let Quantitys = input.Quantity;
    let customSwitchFilleddata1 = input.customSwitchFilleddata1;
    let customSwitchFilleddata = input.customSwitchFilleddata;
    let EstStockPrices1 = input.EstStockPrice1;
    let EstStockPrices2 = input.EstStockPrice1;
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
      ProductType: 1,
      ProfitLost: "",
      IdentifierId: this.getdatawatchlist.symbolIdentifierId,
      IsSettled: "",
      iSAutoTrade: this.getdatawatchlist.addedinAlgoTrade,
      BrokerStatus: "",
      OrderID: id
    }
    this.AccountServices.PostCreateOrderadd(Data).subscribe(res => {
      if (res != null && res != "") {
        this.SearchWatchlist()
        this.Customeralgooff(this.getdatawatchlist.symbolIdentifierId);
        this.toastr.SuccessToastr("Success");
        window.location.reload();

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

  addPostCreateOrdershell(id: any) {
    var input = JSON.parse(JSON.stringify(this.detdata.getRawValue()));
    let Quantitys = input.Quantity;
    let customSwitchFilleddata1 = input.customSwitchFilleddata1;
    let customSwitchFilleddata = input.customSwitchFilleddata;
    let EstStockPrices1 = input.EstStockPrice1;
    let EstStockPrices2 = input.EstStockPrice1;
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
      ProductType: 1,
      ProfitLost: "",
      IdentifierId: this.getdatawatchlist.symbolIdentifierId,
      IsSettled: "",
      iSAutoTrade: this.getdatawatchlist.addedinAlgoTrade,
      BrokerStatus: "",
      OrderID: id
    }
    this.AccountServices.PostCreateOrderadd(Data).subscribe(res => {
      if (res != null && res != "") {
        this.SearchWatchlist()
        this.Customeralgooff(this.getdatawatchlist.symbolIdentifierId);
        this.toastr.SuccessToastr("Success");
        window.location.reload();
        // this.tabchange(1)
        // this.tabchange(2)
        // this.tabchange(3)
        // this.tabchange(5)


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

  maltiorder() {
    this.isSubmitted = true;
    if (this.CustomerOptionsform1.valid) {
      var input = JSON.parse(JSON.stringify(this.CustomerOptionsform1.getRawValue()));
      let finddata = this.toptionlistCEU1.find(m => m.symbolIdentifierId == input.StrikeId);

      if (input.customSwitchFilled1 == null)
        input.customSwitchFilled1 = false;
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
        isTakeProfit: input.customSwitchFilled1,
        TakeProfitPer: "",
        TakeProfitEstPrice: input.Takeprofit,
        OrderStatus: 1,
        SellPrice: finddata.sellPrice,
        BuyPrice: finddata.buyPrice,
        ClosedPrice: "",
        BrokerConfigID: input.customerBrokertype,
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
          this.toastr.SuccessToastr("Success");
          window.location.reload();

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

      var input = JSON.parse(JSON.stringify(this.CustomerOptionsform1.getRawValue()));
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
        BrokerConfigID: input.customerBrokertype,
        ProductType: input.ProductType,
        ProfitLost: "",
        IdentifierId: input.StrikeId1,
        IsSettled: "",
        iSAutoTrade: finddata1.addedinAlgoTrade,
        BrokerStatus: "",
        OrderID: 0
      }
      this.AccountServices.PostCreateOrderadd(Data1).subscribe(res => {
        if (res != null && res != "") {
          this.SearchWatchlist()
          this.Customeralgooff(this.getdatawatchlist.symbolIdentifierId);
          this.toastr.SuccessToastr("Success");
          window.location.reload();
          // this.tabchange(1)
          // this.tabchange(2)
          // this.tabchange(3)
          // this.tabchange(5)


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

  ActiveOrderList : any;
  totalActiveprice:any = 0;
  totalActiveprice1:any = 0;
  totalisTakeProfit:any = 0;
  totalisTakeProfit1:any = 0;
  AutoOrderID:any
  GetActiveOrderList() {
    this.AutoOrderID=0
  this.AccountServices.OrderListActive(0,"",0,0).subscribe(res => {
    if(res != null && res != ""){
      this.ActiveOrderList = res.result;
      setTimeout(()=>{
      this.ActiveOrderList.forEach((element, test)=> {
        this.signalRService.addTransferChart(element.identifier);
        this.emittService.getsignalrDetail().subscribe(res => {
          let maindata = JSON.parse(res);
          if(maindata != null){
            let value = this.ActiveOrderList.find(x => x.identifier.toLowerCase( ) == maindata.s2.toLowerCase( ));
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
          this.GetPortfolios()
            //console.log(value)
          }
          
        });
      });
    },500)
      // this.ActiveOrderList.forEach(element => {
      //   this.totalActiveprice = this.totalActiveprice + element.lastBuyPrice * element.quantity;
      //   let value = this.SymbolListByCategory.find(x => x.identifier.toLowerCase( ) == element.identifier.toLowerCase( ));
      //   this.totalisTakeProfit = this.totalisTakeProfit + value.buyPrice * element.quantity;
      //  });
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
  currentValue:any
  totalInvestment:any
  todaysPL1:any
  GetPortfolio : any;
  todaysPL:any=0;
  totalplPercentage:any;
  GetPortfolios() {
    if(this.dayorderlist==null){
      this.currentValue = 0
      this.totalInvestment = 0
      this.todaysPL1 = 0
    }
    else{

    
        this.totalActiveprice1=0
       // setTimeout(()=>{
        this.dayorderlist.forEach(element => {
          
          
          if(element.orderStatus==2){
            //let value = this.dayorderlist.find(x => x.identifier.toLowerCase( ) == element.identifier.toLowerCase( ));
            //if(value != ""&&value!= undefined && value != null)
            this.totalActiveprice1 = this.totalActiveprice1 + element.entryPrice * element.quantity;
            if($('.type'+element.orderID).val()==1){
              this.totalActiveprice = this.totalActiveprice + element.lastBuyPrice * element.quantity;
              this.totalisTakeProfit = this.totalisTakeProfit + element.entryPrice * element.quantity;
              this.todaysPL=this.todaysPL+element.profitLost;
              //this.totalActiveprice1 = this.totalActiveprice1 + value.entryPrice * element.quantity;
            }
            if($('.type'+element.orderID).val()==2){
              this.totalActiveprice = this.totalActiveprice + element.entryPrice * element.quantity;
              this.totalisTakeProfit = this.totalisTakeProfit + element.lastBuyPrice * element.quantity;
              this.todaysPL=this.todaysPL+element.profitLost;
              //this.totalActiveprice1 = this.totalActiveprice1 + value.entryPrice * element.quantity;
            }
         //console.log(this.ActiveOrderList)
        //  this.totalActiveprice = this.totalActiveprice + value.entryPrice * element.quantity;
        //   this.totalisTakeProfit = this.totalisTakeProfit + value.lastBuyPrice * element.quantity;
        
        }
        if(element.orderStatus==1){
          let value = this.ActiveOrderList.find(x => x.identifier.toLowerCase( ) == element.identifier.toLowerCase( ));
          if(value != ""&&value!= undefined && value != null)
          this.totalActiveprice1 = this.totalActiveprice1 + value.entryPrice * element.quantity;
          if($('.type'+element.orderID).val()==1){
            this.totalActiveprice = this.totalActiveprice + value.lastBuyPrice * element.quantity;
            this.totalisTakeProfit = this.totalisTakeProfit + value.entryPrice * element.quantity;
            this.todaysPL=this.todaysPL+value.profitLost;
            //this.totalActiveprice1 = this.totalActiveprice1 + value.entryPrice * element.quantity;
          }
          if($('.type'+element.orderID).val()==2){
            this.totalActiveprice = this.totalActiveprice + value.entryPrice * element.quantity;
            this.totalisTakeProfit = this.totalisTakeProfit + value.lastBuyPrice * element.quantity;
            this.todaysPL=this.todaysPL+value.profitLost;
            //this.totalActiveprice1 = this.totalActiveprice1 + value.entryPrice * element.quantity;
          }
        }
      //},500)
         });
               
          this.totalisTakeProfit1 =  this.totalActiveprice1+ this.todaysPL;
          //this.totalActiveprice =  this.totalisTakeProfit1- this.todaysPL;
          this.currentValue = naiveRound(this.totalisTakeProfit1,2);
          this.totalInvestment = naiveRound(this.totalActiveprice1, 2);
          this.todaysPL1= naiveRound(this.todaysPL, 2)
          this.totalplPercentage=naiveRound((this.todaysPL*100)/this.totalActiveprice1, 2)
          function naiveRound(num, decimalPlaces = 0) {
            var p = Math.pow(10, decimalPlaces);
            return Math.round(num * p) / p;
          }
            if(isNaN(this.totalplPercentage)){
            this.totalplPercentage=0;
            }
        //console.log(this.GetPortfolio);
        this.totalActiveprice = 0;
        this.totalisTakeProfit = 0;
        this.todaysPL=0;
        //console.log(this.totalplPercentage)
       //$('#SvgjsTextvalue').text(this.totalplPercentage)
        }
     
        // this.toastr.SuccessToastr("Success");
  }

  GetCustDeviceLog:any;
  GetCustDeviceLogdata() {
    this.AutoOrderID=0
  this.AccountServices.GetCustDeviceLog().subscribe(res => {
    if(res != null && res != ""){
      this.GetCustDeviceLog = res.result;
console.log(this.GetCustDeviceLog)
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

  dayorderlist:any;
  dayorderlistdata() {
    this.AutoOrderID=0
  this.AccountServices.dayorderlist().subscribe(res => {
    if(res != null && res != ""){
      this.dayorderlist = res.result;
      // this.dayorderlist.forEach((element, test)=> {
      //   this.signalRService.addTransferChart(element.identifier);
      //   this.emittService.getsignalrDetail().subscribe(res => {
      //     let maindata = JSON.parse(res);
      //     if(maindata != null){
      //       let value = this.dayorderlist.find(x => x.identifier.toLowerCase( ) == maindata.s2.toLowerCase( ));
      //       if(value != null){
      //       value.lastBuyPrice = maindata.s4;
      //       value.high = maindata.s5;
      //       value.low = maindata.s6;
      //       value.openPrice = maindata.s9;
      //       value.closePrice = maindata.s10;
      //       value.sellPrice = maindata.s11;
      //       value.totalQtyTraded = maindata.s12;
      //       value.lastTradePrice = maindata.s8;
      //       value.priceChangePercentage = maindata.s14;
      //       value.QuotationLot = maindata.s15;
      //       //  element.buyPrice = maindata.s4;
      //       if(value.orderType==1){
      //         value.profitLost = naiveRound(value.lastBuyPrice * value.quantity - value.entryPrice * value.quantity, 2)
      //         function naiveRound(num, decimalPlaces = 0) {
      //           var p = Math.pow(10, decimalPlaces);
      //           return Math.round(num * p) / p;
      //         }
      //       }
      //       if(value.orderType==2){
      //         value.profitLost = naiveRound(value.entryPrice * value.quantity - value.lastBuyPrice * value.quantity , 2)
      //         function naiveRound(num, decimalPlaces = 0) {
      //           var p = Math.pow(10, decimalPlaces);
      //           return Math.round(num * p) / p;
      //         }
      //       }
      //     }
      //     this.GetPortfolios()
      //       //console.log(value)
      //     }
          
      //   });
      // });
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


