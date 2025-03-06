import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Shell } from '@app/shell/services/shell.service';
import { DashboardComponent } from '@pages/dashboard/dashboard.component';
import { UserComponent } from './user/user/user.component';
import { ProductListComponent } from './products/product-list/product-list.component';
import { ProductCategoriesComponent } from './products/product-categories/product-categories.component';

const routes: Routes = [
  Shell.childRoutes([
    {
      path: 'dashboard',
      component: DashboardComponent,
    },
    {
      path: 'profile',
      component: UserComponent,
    },
    {
      path: 'product-list',
      component: ProductListComponent,
    },
    {
      path: 'product-categories',
      component: ProductCategoriesComponent,
    },
    {
      path: 'users',
      loadChildren: () => import('./users/users.module').then((m) => m.UsersModule),
    },

    // Fallback when no prior route is matched
    { path: '**', redirectTo: '', pathMatch: 'full' },
  ]),
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
