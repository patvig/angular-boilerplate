import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';
import { LoginComponent } from '@app/auth/login/login.component';
import { AlreadyLoggedCheckGuard } from '@app/auth/guard/authentication.guard';
import { LogoutComponent } from '@app/auth/logout/logout.component';
import { SigninComponent } from './signin/signin.component';
import { ResetpasswordRequestComponent } from './resetpasswordRequest/resetpasswordRequest.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';

const routes: Routes = [
  {
    path: 'resetpassword/:token/:email',
    canActivate: [AlreadyLoggedCheckGuard],
    component: ResetpasswordComponent,
    data: { title: marker('Reset password') },
  },
  {
    path: 'login',
    canActivate: [AlreadyLoggedCheckGuard],
    component: LoginComponent,
    data: { title: marker('Login') },
  },
  {
    path: 'resetpasswordRequest',
    canActivate: [AlreadyLoggedCheckGuard],
    component: ResetpasswordRequestComponent,
    data: { title: marker('Reset password Request') },
  },
  {
    path: 'signin',
    canActivate: [AlreadyLoggedCheckGuard],
    component: SigninComponent,
    data: { title: marker('Sign in') },
  },
  {
    path: 'logout',
    component: LogoutComponent,
    data: { title: marker('Logout') },
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class AuthRouting {}
