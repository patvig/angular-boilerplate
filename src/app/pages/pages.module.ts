import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { UserComponent } from './user/user/user.component';
import { ProductListComponent } from './products/product-list/product-list.component';
import { ProductCategoriesComponent } from './products/product-categories/product-categories.component';
import { SalesComponent } from './sales/sales/sales.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTableModule } from '@angular/material/table';
import { HighchartsChartModule } from 'highcharts-angular';

@NgModule({
  declarations: [UserComponent, ProductListComponent, ProductCategoriesComponent, SalesComponent],
  imports: [CommonModule, PagesRoutingModule, MatMenuModule, MatButtonModule, MatIconModule, MatSlideToggleModule, MatCardModule, MatExpansionModule, MatTableModule, HighchartsChartModule],
})
export class PagesModule {}
