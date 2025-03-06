import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { UserComponent } from './user/user/user.component';
import { ProductListComponent } from './products/product-list/product-list.component';

@NgModule({
  declarations: [UserComponent, ProductListComponent],
  imports: [CommonModule, PagesRoutingModule],
})
export class PagesModule {}
