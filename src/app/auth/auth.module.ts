import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { AuthRouting } from '@app/auth/auth.routing';
import { LoginComponent } from '@app/auth/login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { LanguageSelectorComponent } from '@app/i18n';
import { SigninComponent } from './signin/signin/signin.component';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, TranslateModule, AuthRouting, FormsModule, LanguageSelectorComponent],
  declarations: [LoginComponent, LogoutComponent, SigninComponent],
})
export class AuthModule {}
