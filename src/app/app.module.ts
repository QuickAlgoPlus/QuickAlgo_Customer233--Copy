import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgChartsModule } from 'ng2-charts';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// import { LoginComponent } from './login/login.component';
// import { SignupComponent } from './signup/signup.component';
// import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
// import { AccountServicesComponent } from './Services/account-services/account-services.component';
import { DashboardComponent } from './Views/dashboard/dashboard.component';
// import { ForgotPasswordComponent } from './Views/forgot-password/forgot-password.component';
import { LoginComponent } from './Views/login/login.component';
import { SignupComponent } from './Views/signup/signup.component';
import { MobileotpComponent } from './Views/mobileotp/mobileotp.component';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ForgotPasswordComponent } from './Views/Forgot_Password/forgot-password.component';
import { OrderlistsComponent } from './Views/orderlists/orderlists.component';
import { PortofolioComponent } from './Views/portofolio/portofolio.component';
import { FundsComponent } from './Views/funds/funds.component';
import { ProfileComponent } from './Views/profile/profile.component';
import { ChangepasswordComponent } from './Views/changepassword/changepassword.component';
import { BrokersComponent } from './Views/brokers/brokers.component';
import { SignalsComponent } from './Views/signals/signals.component';
import { AdminloginComponent } from './Views/adminlogin/adminlogin.component';
import { CookieService } from 'ngx-cookie-service';
import { OptionsComponent } from './Views/options/options.component';
import { MarketComponent } from './Views/market/market.component';
import { NotificationsComponent } from './Views/notifications/notifications.component';
import { HeaderComponent } from './Views/header/header.component';
import { SessionServicesService } from './Services/session-services.service';
import { AppConfig } from './appconfig';
import { ToastrServiceServiceService } from './Services/toastr-service-service.service';
import { AccountServicesService } from './Services/account-services.service';
import { Router } from '@angular/router';
// import { SignupComponent } from './Views/signup/signup.component';
// import { ForgotPasswordComponent } from './Views/forgot-password/forgot-password.component';
// import { ForgotPasswordComponent } from './Views/forgot-password/forgot-password.component';
// import { LoginComponent } from './Views/login/login.component';
// import { SignupComponent } from './Views/signup/signup.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    DashboardComponent,
    MobileotpComponent,
    ForgotPasswordComponent,
    OrderlistsComponent,
    PortofolioComponent,
    FundsComponent,
    ProfileComponent,
    ChangepasswordComponent,
    BrokersComponent,
    SignalsComponent,
    AdminloginComponent,
    OptionsComponent,
    MarketComponent,
    NotificationsComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgChartsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    BrowserAnimationsModule,],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { 
    
}
