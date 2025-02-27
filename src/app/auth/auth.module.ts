import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageSelectorComponent } from '@app/i18n';
import { LoaderComponent } from '../shell/components/loader/loader.component';
import { AuthRouting } from '@app/auth/auth.routing';
import { LoginComponent } from '@app/auth/login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { SigninComponent } from './signin/signin.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, TranslateModule, AuthRouting, FormsModule, LanguageSelectorComponent, LoaderComponent],
  declarations: [LoginComponent, LogoutComponent, SigninComponent, ResetpasswordComponent],
})
export class AuthModule {}
