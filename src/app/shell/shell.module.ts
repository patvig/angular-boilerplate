import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';

import { AuthModule } from '@app/auth';
import { ShellComponent } from './shell.component';
import { HumanizePipe } from '@shared/pipes';
import { FormsModule } from '@angular/forms';
import { SidebarComponent } from '@app/shell/components/sidebar/sidebar.component';
import { HeaderComponent } from '@app/shell/components/header/header.component';
import { LoaderComponent } from './components/loader/loader.component';
import { PagesModule } from '@pages/pages.module';
import { LanguageSelectorComponent } from '@app/i18n';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    AuthModule,
    RouterModule,
    HumanizePipe,
    FormsModule,
    PagesModule,
    LanguageSelectorComponent,
    LoaderComponent,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
  ],
  declarations: [ShellComponent, HeaderComponent, SidebarComponent],
})
export class ShellModule {}
