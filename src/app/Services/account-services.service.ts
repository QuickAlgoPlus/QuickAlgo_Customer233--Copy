import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppConfig } from '../appconfig';
import { SessionServicesService } from './session-services.service';

@Injectable({
  providedIn: 'root'
})
export class AccountServicesService {
  private apiUrl: any;
  base = new BaseModel;
  httpOptionsPost: any;
  httpOptionsGet: any;
  headerDict2: any
  requestOptions2: any;
  private requestOptions: any;
  private headerDict: any;
  constructor(private http: HttpClient, private appConfig: AppConfig, private httpClient: HttpClient, private sessionService: SessionServicesService) {
    this.apiUrl = {
      LoginUrl: this.appConfig.baseServiceUrl + 'api/CustGetLoginData',
      SignUpUrl: this.appConfig.baseServiceUrl + 'api/CustSaveSignup',
      ForgotUrl: this.appConfig.baseServiceUrl + 'api/CustForgotpassword',
      LoginForMobileUrl: this.appConfig.baseServiceUrl + 'api/Loginwithmobile',
      VerifyOTPUrl: this.appConfig.baseServiceUrl + 'api/CustVerifyOTP_ByUser',
      VerifyOTPUrl1: this.appConfig.baseServiceUrl + 'api/CustVerifyOTP',
      orderlistUrl: this.appConfig.baseServiceUrl + 'api/GetSymbolCatogeryList',
      GetDashboardCatogeryListUrl: this.appConfig.baseServiceUrl + 'api/GetSymbolCatogeryList',
      GetDashboardSymbolListByCategoryUrl: this.appConfig.baseServiceUrl + 'api/GetSymbolListByCategory',
      OrderListActiveUrl: this.appConfig.baseServiceUrl + 'api/GetOrderListActive',
      RejectedOrderListdataUrl: this.appConfig.baseServiceUrl + 'api/GetOrderListRejected',
      RejectedOrderListdata1Url: this.appConfig.baseServiceUrl + 'api/GetBrokerorderlogs',
      RoundoffOrdersUrl: this.appConfig.baseServiceUrl + 'api/RoundoffOrders',
      getcinfUrl: this.appConfig.baseServiceUrl + 'api/getcinf',
      OrderListClosedUrl: this.appConfig.baseServiceUrl + 'api/GetOrderListClosed',
      GetWatchListUrl: this.appConfig.baseServiceUrl + 'api/GetWatchListByUserId',
      GetNotificationByUserIDUrl: this.appConfig.baseServiceUrl + 'api/GetNotificationByCustomerID',
      GetPortfolioUrl: this.appConfig.baseServiceUrl + 'api/GetPortfolioByUser',
      UpdateProfileUrl: this.appConfig.baseServiceUrl + 'api/SaveProfile',
      ChangePasswordUrl: this.appConfig.baseServiceUrl + 'api/CustChangepassword',
      DepositUrl: this.appConfig.baseServiceUrl + 'api/PostDeposit',
      GetSymbolVolumeListBySymbolIDUrl: this.appConfig.baseServiceUrl + 'api/GetSymbolIdentifierByCategory',
      getSubscriptionExpiryUrl: this.appConfig.baseServiceUrl + 'api/getSubscriptionExpiry',
      DeleteWatchlistUrl: this.appConfig.baseServiceUrl + 'api/DeleteWatchlist',
      SymbolIdentifierByUserIDUrl: this.appConfig.baseServiceUrl + 'api/SymbolIdentifierByCustomerID',
      AddWatchListUrl: this.appConfig.baseServiceUrl + 'api/AddWatchList',
      PostCreateOrderUrl: this.appConfig.baseServiceUrl + 'api/PostCreateOrder',
      GetBrokerMastersUrl: this.appConfig.baseServiceUrl + 'api/GetBokerMaster',
      ResendOtpUrl: this.appConfig.baseServiceUrl + 'api/CustResendOTP',
      getStratergyListUrl: this.appConfig.baseServiceUrl + 'api/getStratergyList',
      GetBrokerConfigListUrl: this.appConfig.baseServiceUrl + 'api/GetCustBrokerConfig',
      PostCustomerAlgoTradeUrl: this.appConfig.baseServiceUrl + 'api/PostCustomerAlgoTrade',
      GetTradeSignalsUrl: this.appConfig.baseServiceUrl + 'api/GetTradeSignals',
      GetGroupbycustomerUrl: this.appConfig.baseServiceUrl + 'api/GetGroupbycustomer',
      PostCustomerAlgoTradeStatusUrl: this.appConfig.baseServiceUrl + 'api/PostCustomerAlgoTradeStatus',
      PostCustomerOptionsAlgoStatusUrl: this.appConfig.baseServiceUrl + 'api/PostCustomerOptionsAlgoStatus',
      editalgodataUrl: this.appConfig.baseServiceUrl + 'api/GetCustomerAlgoTradeByID',
      AddBrokerUrl: this.appConfig.baseServiceUrl + 'api/PostCustBrokerConfig',
      PostCustBrokerStatusUrl: this.appConfig.baseServiceUrl + 'api/PostCustBrokerStatus',
      PostNotificationStatusUrl: this.appConfig.baseServiceUrl + 'api/PostNotificationStatus',
      GetcustlogoutUrl: this.appConfig.baseServiceUrl + 'api/custlogout',
      GetCustBrokerConfigByIDUrl: this.appConfig.baseServiceUrl + 'api/GetCustBrokerConfigByID',
      GetAutoTradeAllowedUrl: this.appConfig.baseServiceUrl + 'api/AutoTradeAllowed',
      GetTopLooserUrl: this.appConfig.baseServiceUrl + 'api/getTopLooser',
      getTopGainerUrl: this.appConfig.baseServiceUrl + 'api/getTopGainer',
      getoptionlistCEUrl: this.appConfig.baseServiceUrl + 'api/getoptionlistCE',
      getoptionlistPEUrl: this.appConfig.baseServiceUrl + 'api/getoptionlistPE',
      GetCustomerOptionsAlgoUrl: this.appConfig.baseServiceUrl + 'api/GetCustomerOptionsAlgo',
      PostCustomerOptionsAlgoServiceUrl: this.appConfig.baseServiceUrl + 'api/PostCustomerOptionsLegAlgo',
      getoptionexpiryListUrl: this.appConfig.baseServiceUrl + 'api/getoptionexpiryList',
      GetCustDeviceLogUrl: this.appConfig.baseServiceUrl + 'api/GetCustDeviceLog',
      dayorderlistUrl: this.appConfig.baseServiceUrl + 'api/Getdayorderlist',
      getRecords_HistoricalListurl: this.appConfig.baseServiceUrl + 'api/getRecordsHistoricalList',
      GetSymbolcatUrl: this.appConfig.baseServiceUrl + 'api/GetSymbolcat',
      PostUpdateOrderUrl: this.appConfig.baseServiceUrl + 'api/PostUpdateOrder',
      GetUnreadNotificationByUserIDUrl: this.appConfig.baseServiceUrl + 'api/GetUnreadNotificationByCustomerID',
      CustGetLoginUrl: this.appConfig.baseServiceUrl + 'api/CustGetLogin',
      GetHeaderSymbolUrl: this.appConfig.baseServiceUrl + 'api/GetHeaderSymbols',
      GetOrderListPendingUrl: this.appConfig.baseServiceUrl + 'api/GetOrderListPending',
      SaveTOTPUrl: this.appConfig.baseServiceUrl + 'api/ChoiceBrokerLogin',
      GetGetSymbolcatAllUrl: this.appConfig.baseServiceUrl + 'api/GetSymbolcatAll',
      PostCustomerOptionsAlgoLegStatusUrl: this.appConfig.baseServiceUrl + 'api/PostCustomerOptionsAlgoLegStatus',
      PostCustomerOptionsAlgoLegDeleteUrl: this.appConfig.baseServiceUrl + 'api/PostCustomerOptionsAlgoLegDelete',
    }

    this.headerDict2 = {
      'Content-Type': 'application/json',
      //  'Authorization': 'cc1224752f83db1bce04aa1264d7688531ce4602d5ae96c756803ba4d3020c34',
      // 'Access-Control-Allow-Origin': '*',
      // //'Access-Control-Allow-Credentials': 'true',
      // 'Access-Control-Allow-Methods' : 'GET,PUT,PATCH,POST,DELETE',
      // 'Access-Control-Allow-Headers' : 'Origin, X-Requested-With, Content-Type, Accept',
      // 'mode': 'no-cors'
    }

    this.headerDict = {
      'Authorization': this.sessionService.getcustomerID() + ":" + this.sessionService.getToken(),
      'Content-type': 'application/json'
    }

    this.requestOptions2 = {
      headers: new HttpHeaders(this.headerDict2),
    };

    this.requestOptions = {
      headers: new HttpHeaders(this.headerDict),
    };

  }

  getIPAddress(): Observable<any> {
    return this.http.get("http://api.ipify.org/?format=json");
  }

  login(input: any): Observable<any> {
    return this.http.post<any>(this.apiUrl.LoginUrl, JSON.stringify(input), this.requestOptions2);
  }
  SignUp(input: any): Observable<any> {
    return this.httpClient.post(this.apiUrl.SignUpUrl, JSON.stringify(input), this.requestOptions2);
  }
  ForgotPassword(input: any): Observable<any> {
    return this.http.post<any>(this.apiUrl.ForgotUrl, JSON.stringify(input), this.requestOptions2);
  }
  LoginForMobile(input: any): Observable<any> {
    return this.http.get<any>(this.apiUrl.LoginForMobileUrl + "?MobileNo=" + input.MobileNo + "&&DeviceNo=" + "" + "");
  }
  CustGetLogin(input: any): Observable<any> {
    return this.http.post<any>(this.apiUrl.CustGetLoginUrl, JSON.stringify(input), this.requestOptions2);
  }

  getSaveTOTP(input: any): Observable<any> {
    return this.http.post<any>(this.apiUrl.SaveTOTPUrl, JSON.stringify(input), this.requestOptions2);
  }
 
  VerifyOtp(input: any): Observable<any> {
    return this.http.get<any>(this.apiUrl.VerifyOTPUrl + "?CustomerID=" + input.CustomerID + "&&otp=" + input.otp + "&&ipAddress="+input.ipAddress + "&&Device="+input.Device, this.requestOptions2);
    // https://tradethinkermobileapi.azurewebsites.net/api/VerifyOTP?CustomerID=1024&& otp=1023}
  }
  VerifyOtp1(input: any): Observable<any> {
    return this.http.get<any>(this.apiUrl.VerifyOTPUrl1 + "?CustomerID=" + input.CustomerID + "&&otp=" + input.otp + "&&ipAddress="+input.ipAddress + "&&Device="+input.Device, this.requestOptions2);
    // https://tradethinkermobileapi.azurewebsites.net/api/VerifyOTP?CustomerID=1024&& otp=1023}
  }

  ResendOtp(input: any): Observable<any> {
    return this.http.get<any>(this.apiUrl.ResendOtpUrl + "?customerId=" + input, this.requestOptions2);
  }

  GetDashboardCatogeryList(): Observable<any> {
    return this.http.get<any>(this.apiUrl.GetDashboardCatogeryListUrl, this.requestOptions);
  }

  GetDashboardSymbolListByCategory(input: any): Observable<any> {
    return this.http.get<any>(this.apiUrl.GetWatchListUrl + "?categoryID=" + input.CategoryID+"&indentifier="+input.indentifier, this.requestOptions);
  }
  OrderListActive(input: any, inputTxt = "",pl:any,CategoryId:any): Observable<any> {
    return this.http.get<any>(this.apiUrl.OrderListActiveUrl + "?AutoOrder=" + input + "&indentifier=" + inputTxt+"&Pl="+pl+"&CategoryId="+CategoryId, this.requestOptions);
  }
  getRecords_HistoricalList(input: any, pl: any): Observable<any> {
    return this.http.get<any>(this.apiUrl.getRecords_HistoricalListurl + "?orderStatus=" + input + "&categoryId="+pl, this.requestOptions);
  }
  GetOrderListPending(input: any, inputTxt = "",pl:any,CategoryId:any): Observable<any> {
    return this.http.get<any>(this.apiUrl.GetOrderListPendingUrl + "?AutoOrder=" + input + "&indentifier=" + inputTxt+"&Pl="+pl+"&CategoryId="+CategoryId, this.requestOptions);
  }

  RejectedOrderListdata(input: any,inputTxt = ""): Observable<any> {
    return this.http.get<any>(this.apiUrl.RejectedOrderListdata1Url + "?AutoOrder=" + input + "&indentifier=" + inputTxt, this.requestOptions);
  }
  RejectedOrderList(input: any,inputTxt = "",pl:any,CategoryId:any): Observable<any> {
    return this.http.get<any>(this.apiUrl.RejectedOrderListdataUrl+"?AutoOrder=" + input + "&indentifier=" + inputTxt+"&Pl="+pl+"&CategoryId="+CategoryId ,this.requestOptions);
  }
  RoundoffOrders(input: any): Observable<any> {
    return this.http.get<any>(this.apiUrl.RoundoffOrdersUrl + "?orderID=" + input.orderID, this.requestOptions);
  }
  GetBrokerMasters(inputTxt:any): Observable<any> {
    return this.http.get<any>(this.apiUrl.GetBrokerMastersUrl+"?broker=" + inputTxt, this.requestOptions);
  }
  
  GetPortfolio(): Observable<any> {
    return this.http.get<any>(this.apiUrl.GetPortfolioUrl, this.requestOptions);
  }
  OrderListClosed(input: any, inputTxt = "",pl:any,CategoryId:any): Observable<any> {
    return this.http.get<any>(this.apiUrl.OrderListClosedUrl+ "?AutoOrder=" + input + "&indentifier=" + inputTxt + "&Pl="+pl+"&CategoryId="+CategoryId, this.requestOptions);
  }
  GetTradeSignals(inputTxt = ""): Observable<any> {
    return this.http.get<any>(this.apiUrl.GetTradeSignalsUrl+"?indentifier=" + inputTxt, this.requestOptions);
  }
  GetGroupbycustomerapi(): Observable<any> {
    return this.http.get<any>(this.apiUrl.GetGroupbycustomerUrl, this.requestOptions);
  }
  getStratergyList(): Observable<any> {
    return this.http.get<any>(this.apiUrl.getStratergyListUrl, this.requestOptions);
  }
  GetHeaderSymbol(): Observable<any> {
    return this.http.get<any>(this.apiUrl.GetHeaderSymbolUrl, this.requestOptions);
  }
  GetBrokerConfigList(inputTxt = ""): Observable<any> {
    return this.http.get<any>(this.apiUrl.GetBrokerConfigListUrl+"?broker=" + inputTxt, this.requestOptions);
  }
  GetTopLooser(): Observable<any> {
    return this.http.get<any>(this.apiUrl.GetTopLooserUrl, this.requestOptions);
  }
  getTopGainer(): Observable<any> {
    return this.http.get<any>(this.apiUrl.getTopGainerUrl, this.requestOptions);
  }
  GetWatchList(input: any): Observable<any> {
    return this.http.get<any>(this.apiUrl.GetWatchListUrl + "?categoryID=" + input.categoryID+"&indentifier="+input.indentifier, this.requestOptions);
  }
  GetNotificationByUserID(): Observable<any> {
    return this.http.get<any>(this.apiUrl.GetNotificationByUserIDUrl, this.requestOptions);
  }
  GetUnreadNotificationByUserID(): Observable<any> {
    return this.http.get<any>(this.apiUrl.GetUnreadNotificationByUserIDUrl, this.requestOptions);
  }
  GetCustBrokerConfigByID(input: any): Observable<any> {
    return this.http.get<any>(this.apiUrl.GetCustBrokerConfigByIDUrl + "?ConfigID=" + input.ConfigID, this.requestOptions);
  }
  toptionlistCEU(input: any): Observable<any> {
    return this.http.get<any>(this.apiUrl.getoptionlistCEUrl + "?strProduct=" + input.strProduct + "&strExpiry=" + input.strExpiry +"&strike=" + input.strike, this.requestOptions);
  }
  optionlistPE(input: any): Observable<any> {
    return this.http.get<any>(this.apiUrl.getoptionlistPEUrl + "?strProduct=" + input.strProduct + "&strExpiry=" + input.strExpiry+"&strike=" + input.strike, this.requestOptions);
  }
  getoptionexpiryList(input: any): Observable<any> {
    return this.http.get<any>(this.apiUrl.getoptionexpiryListUrl + "?strProduct=" + input.strProduct, this.requestOptions);
  }
  GetCustomerOptionsAlgo(input: any): Observable<any> {
    return this.http.get<any>(this.apiUrl.GetCustomerOptionsAlgoUrl + "?COAID=" + input.CustomerOptions, this.requestOptions);
  }
  AutoTradeAllowed(input: any): Observable<any> {
    return this.http.get<any>(this.apiUrl.GetAutoTradeAllowedUrl + "?identifierID=" + input.identifierID, this.requestOptions);
  }
  UpdateProfile(input: any): Observable<any> {
    return this.http.post<any>(this.apiUrl.UpdateProfileUrl, JSON.stringify(input), this.requestOptions);
  }

  PostCustomerOptionsAlgoLegStatus(input: any): Observable<any> {
    return this.http.post<any>(this.apiUrl.PostCustomerOptionsAlgoLegStatusUrl, JSON.stringify(input), this.requestOptions);
  }

  PostCustomerOptionsAlgoLegDelete(input: any): Observable<any> {
    return this.http.post<any>(this.apiUrl.PostCustomerOptionsAlgoLegDeleteUrl, JSON.stringify(input), this.requestOptions);
  }

  AddBroker(input: any): Observable<any> {
    return this.http.post<any>(this.apiUrl.AddBrokerUrl, JSON.stringify(input), this.requestOptions);
  }

  PostCustBrokerStatus(input: any): Observable<any> {
    return this.http.post<any>(this.apiUrl.PostCustBrokerStatusUrl, JSON.stringify(input), this.requestOptions);
  }

  PostNotificationStatus(input: any): Observable<any> {
    return this.http.post<any>(this.apiUrl.PostNotificationStatusUrl, JSON.stringify(input), this.requestOptions);
  }

  PostCustomerOptionsAlgoService(input: any): Observable<any> {
    return this.http.post<any>(this.apiUrl.PostCustomerOptionsAlgoServiceUrl, JSON.stringify(input), this.requestOptions);
  }

  ChangePassword(input: any): Observable<any> {
    return this.http.post<any>(this.apiUrl.ChangePasswordUrl, JSON.stringify(input), this.requestOptions);
  }

  PostCustomerAlgoTrade(input: any): Observable<any> {
    return this.http.post<any>(this.apiUrl.PostCustomerAlgoTradeUrl, JSON.stringify(input), this.requestOptions);
  }

  PostCustomerAlgoTradeStatus(input: any): Observable<any> {
    return this.http.post<any>(this.apiUrl.PostCustomerAlgoTradeStatusUrl, JSON.stringify(input), this.requestOptions);
  }

  PostCustomerOptionsAlgoStatus(input: any): Observable<any> {
    return this.http.post<any>(this.apiUrl.PostCustomerOptionsAlgoStatusUrl, JSON.stringify(input), this.requestOptions);
  }

  Deposit(input: any): Observable<any> {
    return this.http.post<any>(this.apiUrl.DepositUrl, JSON.stringify(input), this.requestOptions);
  }
  getcinf(input: any): Observable<any> {
    return this.http.post<any>(this.apiUrl.getcinfUrl, JSON.stringify(input), this.requestOptions);
  }
  GetSymbolVolumeListBySymbolID(input: any): Observable<any> {
    return this.http.get<any>(this.apiUrl.GetSymbolVolumeListBySymbolIDUrl + "?categoryID=" + input.categoryID, this.requestOptions);
  }
  getSubscriptionExpirylist(): Observable<any> {
    return this.http.get<any>(this.apiUrl.getSubscriptionExpiryUrl, this.requestOptions);
  }

  editalgodata(input: any): Observable<any> {
    return this.http.get<any>(this.apiUrl.editalgodataUrl + "?CustAlgoTradeID=" + input.CustAlgoTradeID, this.requestOptions);
  }

  DeleteWatchlist(input: any): Observable<any> {
    return this.http.get<any>(this.apiUrl.DeleteWatchlistUrl + "?SymbolIdentifierId=" + input.SymbolIdentifierId, this.requestOptions);
  }
  SymbolIdentifierByUserID(input: any): Observable<any> {
    return this.http.get<any>(this.apiUrl.SymbolIdentifierByUserIDUrl + "?searchtxt=" + input, this.requestOptions);
  }
  GetCustDeviceLog(): Observable<any> {
    return this.http.get<any>(this.apiUrl.GetCustDeviceLogUrl, this.requestOptions);
  }
  dayorderlist(): Observable<any> {
    return this.http.get<any>(this.apiUrl.dayorderlistUrl, this.requestOptions);
  }
  GetSymbolcat(): Observable<any> {
    return this.http.get<any>(this.apiUrl.GetSymbolcatUrl, this.requestOptions);
  }
  GetGetSymbolcatAll(): Observable<any> {
    return this.http.get<any>(this.apiUrl.GetGetSymbolcatAllUrl, this.requestOptions);
  }
  addWatchlist(input: any): Observable<any> {
    return this.http.post<any>(this.apiUrl.AddWatchListUrl, JSON.stringify(input), this.requestOptions);
  }
  PostCreateOrderadd(input: any): Observable<any> {
    return this.http.post<any>(this.apiUrl.PostCreateOrderUrl, JSON.stringify(input), this.requestOptions);
  }
  PostUpdateOrderdata(input: any): Observable<any> {
    return this.http.post<any>(this.apiUrl.PostUpdateOrderUrl, JSON.stringify(input), this.requestOptions);
  }
  Getcustlogout(): Observable<any> {
    return this.http.get<any>(this.apiUrl.GetcustlogoutUrl, this.requestOptions);
  }
}


export class BaseModel {
  status: boolean = false;
  isActive: boolean = false;
  message: string = "";
  data: any;
}
