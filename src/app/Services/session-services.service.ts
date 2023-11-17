import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class SessionServicesService {

  constructor(private cookieService: CookieService) { }

  saveSession(user: any) {
    // sessionStorage.setItem("customerID", user.customerID);
    
    // sessionStorage.setItem("tokenID", user.tokenID);
    // sessionStorage.setItem("fullName", user.fullName);
    // sessionStorage.setItem("emailid", user.emailid);
    // sessionStorage.setItem("mobileNo", user.mobileNo);
    // sessionStorage.setItem("Address", user.address);
    localStorage.setItem( 'customerID', user.customerID );
    localStorage.setItem( 'tokenID', user.tokenID );
    localStorage.setItem( 'fullName', user.fullName );
    localStorage.setItem( 'emailid', user.emailid );
    localStorage.setItem( 'mobileNo', user.mobileNo );
    localStorage.setItem( 'Address', user.address );
    localStorage.setItem( 'allowlogs', user.allowlogs );
  }

  getallowlogs() {
    // return sessionStorage.getItem("NIFTY50");
    return localStorage.getItem("allowlogs");
  }
  saveallowlogs(user: any) {
    sessionStorage.setItem("allowlogs", user.allowlogs);
  }
  saveSessionforpotfoliyo(user: any) {
    // sessionStorage.setItem("TotalFund", user.totalPurchaseAmt);
    this.cookieService.set( 'TotalFund', user.totalPurchaseAmt );
  }
  saveisactive(user: any) {
    sessionStorage.setItem("isactive", user.isactive);
  }
  getisactive() {
    return sessionStorage.getItem("isactive");
  }
  saveSessionforUserName(user: any) {
    localStorage.setItem( 'UserName', user );
  }
  saveSessioncustomerID(user: any) {
    // sessionStorage.setItem("customerID", user);
    localStorage.setItem( 'customerID', user );
  }

  saveprofit(data: any) {
    this.cookieService.set( 'saveprofit', data );
  }
  getprofit() {
    return this.cookieService.get("saveprofit");
  }
  savecloseprofit(data: any) {
    this.cookieService.set( 'savecloseprofit', data );
  }
  getcloseprofit() {
    return this.cookieService.get("savecloseprofit");
  }
  saverejectprofit(data: any) {
    this.cookieService.set( 'saverejectprofit', data );
  }
  getrejectprofit() {
    return this.cookieService.get("saverejectprofit");
  }
  savemenulist(data: any) {
    this.cookieService.set( 'menulist', data );
  }
  getmenulist() {
    return this.cookieService.get("menulist");
  }

  saveactiveStock(data: any) {
    this.cookieService.set( 'activeStock', data );
  }
  getactiveStock() {
    return this.cookieService.get("activeStock");
  }
  savecloseStock(data: any) {
    this.cookieService.set( 'closeStock', data );
  }
  getcloseStock() {
    return this.cookieService.get("closeStock");
  }
  saverejectStock(data: any) {
    this.cookieService.set( 'rejectStock', data );
  }
  getrejectStock() {
    return this.cookieService.get("rejectStock");
  }

  saveNIFTY50(data: any) {
    // sessionStorage.setItem("NIFTY50", data);
    this.cookieService.set( 'NIFTY50', data );
    
  }
  saveNIFTYBANK(data: any) {
    // sessionStorage.setItem("NIFTYBANK", data);
    this.cookieService.set( 'NIFTYBANK', data );
  }
  saveNIFTYFINSERVICE(data: any) {
    // sessionStorage.setItem("NIFTYFINSERVICE", data);
    this.cookieService.set( 'NIFTYFINSERVICE', data );
  }
  getNIFTY50() {
    // return sessionStorage.getItem("NIFTY50");
    return this.cookieService.get("NIFTY50");
  }
  getNIFTYBANK() {
    // return sessionStorage.getItem("NIFTYBANK");
    return this.cookieService.get("NIFTYBANK");
  }
  getNIFTYFINSERVICE() {
    // return sessionStorage.getItem("NIFTYFINSERVICE");
    return this.cookieService.get("NIFTYFINSERVICE");
  }
  getUsername() {
    // return sessionStorage.getItem("fullName");
    return localStorage.getItem("fullName");
  }
  getUserName1() {
    // return sessionStorage.getItem("fullName");
    return localStorage.getItem("UserName");
  }
  getTotalFund() {
    // return sessionStorage.getItem("TotalFund");
    return localStorage.getItem("TotalFund");
  }
  getToken() {
    // return sessionStorage.getItem("tokenID");
    return localStorage.getItem("tokenID");
  }

  getcustomerID() {
    // return sessionStorage.getItem('customerID');
    return localStorage.getItem("customerID");
  }
  getMobileNo() {
    // return sessionStorage.getItem('mobileNo');
    return localStorage.getItem("mobileNo");
  }

  getEmail() {
    // return sessionStorage.getItem('emailid');
    return localStorage.getItem("emailid");
  }

  getAddress() {
    // return sessionStorage.getItem('Address');
    return localStorage.getItem("Address");
  }
  // getUserApplicationId() {
  //   return sessionStorage.getItem('applicationId');
  // }
  clearsession() {
    // sessionStorage.clear();
    this.cookieService.deleteAll();
  }
}
