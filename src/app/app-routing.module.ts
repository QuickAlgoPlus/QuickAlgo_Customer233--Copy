import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChangepasswordComponent } from './Views/changepassword/changepassword.component';
import { DashboardComponent } from './Views/dashboard/dashboard.component';
import { ForgotPasswordComponent } from './Views/Forgot_Password/forgot-password.component';
import { FundsComponent } from './Views/funds/funds.component';
// import { ForgotPasswordComponent } from './Views/forgot-password/forgot-password.component';
import { LoginComponent } from './Views/login/login.component';
import { MobileotpComponent } from './Views/mobileotp/mobileotp.component';
import { OrderlistsComponent } from './Views/orderlists/orderlists.component';
import { PortofolioComponent } from './Views/portofolio/portofolio.component';
import { ProfileComponent } from './Views/profile/profile.component';
import { SignupComponent } from './Views/signup/signup.component';
import { BrokersComponent } from './Views/brokers/brokers.component';
import { SignalsComponent } from './Views/signals/signals.component';
import { AdminloginComponent } from './Views/adminlogin/adminlogin.component';
import { OptionsComponent } from './Views/options/options.component';
import { MarketComponent } from './Views/market/market.component';
import { NotificationsComponent } from './Views/notifications/notifications.component';
import { HeaderComponent } from './Views/header/header.component';
// import { ForgotPasswordComponent } from './Views/forgot-password/forgot-password.component';
// import { LoginComponent } from './Views/login/login.component';
// import { SignupComponent } from './Views/signup/signup.component';
//import { PagesLayoutComponent } from './pages-layout/pages-layout.component';
// import { LoginComponent } from './login/login.component';
// import { SignupComponent } from './signup/signup.component';
// import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';

const routes: Routes = [
  {
    path: '',
    // component: PagesLayoutComponent,
    children: [
      // User Pages
      {
        path: 'login', component: LoginComponent, data: { extraParameter: '' }
      },
      // {
      //   path: 'Forgot_Password', component: ForgotPasswordComponent, data: { extraParameter: '' }
      // },
      // {
      //   path: 'signup', component: SignupComponent, data: { extraParameter: '' }
      // },
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
      },
    ]
  },
  {
    path: '',
    //component: PagesLayoutComponent,
    children: [
      // User Pages
      // {
      //   path: 'login', component: LoginComponent, data: { extraParameter: '' }
      // },
      {
        path: 'mobileotp', component: MobileotpComponent, data: { extraParameter: '' }
      },
      {
        path: 'signup', component: SignupComponent, data: { extraParameter: '' }
      },
      {
        path: 'Dashboard', component: DashboardComponent, data: { extraParameter: '' }
      },
      {
        path: 'Forgot_Password', component: ForgotPasswordComponent, data: { extraParameter: '' }
      },
      {
        path: 'OrderList', component: OrderlistsComponent, data: { extraParameter: '' }
      },
      {
        path: 'HistoricalList', component: PortofolioComponent, data: { extraParameter: '' }
      },
      {
        path: 'Fund', component: FundsComponent, data: { extraParameter: '' }
      },
      {
        path: 'Profile', component: ProfileComponent, data: { extraParameter: '' }
      },
      {
        path: 'Changepassword', component: ChangepasswordComponent, data: { extraParameter: '' }
      },
      {
        path: 'Brokers', component: BrokersComponent, data: { extraParameter: '' }
      },
      {
        path: 'Signals', component: SignalsComponent, data: { extraParameter: '' }
      },
      {
        path: 'VerifyOTP', component: AdminloginComponent, data: { extraParameter: '' }
      },
      {
        path: 'Options', component: OptionsComponent, data: { extraParameter: '' }
      },
      {
        path: 'Market', component: MarketComponent, data: { extraParameter: '' }
      },
      {
        path: 'Notifications', component: NotificationsComponent, data: { extraParameter: '' }
      },
      {
        path:"header", component: HeaderComponent, data: { extraParameter: '' }
      },
      // {
      //   path: '',
      //   redirectTo: 'home',
      //   pathMatch: 'full'
      // },
      // {
      //   path: '',
      //   redirectTo: 'login',
      //   pathMatch: 'full'
      // },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,
    {
      scrollPositionRestoration: 'enabled',
      anchorScrolling: 'enabled',
      relativeLinkResolution: 'legacy'
    })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
