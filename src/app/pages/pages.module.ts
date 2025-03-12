import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { UserComponent } from './user/user/user.component';
import { ProductListComponent } from './products/product-list/product-list.component';
import { ProductCategoriesComponent } from './products/product-categories/product-categories.component';
import { SalesComponent } from './sales/sales/sales.component';

@NgModule({
  declarations: [UserComponent, ProductListComponent, ProductCategoriesComponent, SalesComponent],
  imports: [CommonModule, PagesRoutingModule],
})
export class PagesModule {}
