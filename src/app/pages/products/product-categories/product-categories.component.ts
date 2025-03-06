import { Component } from '@angular/core';
import { productCategoryService, ProductCategory } from '../../../shared/services/products/productCategory.service';

@Component({
  selector: 'app-product-categories',
  standalone: false,

  templateUrl: './product-categories.component.html',
  styleUrl: './product-categories.component.scss',
})
export class ProductCategoriesComponent {
  productCategories: ProductCategory[] = [];
  isLoading = true;
  errorMessage = '';

  constructor(private productCategoryService: productCategoryService) {}

  ngOnInit() {
    this.loadCategories();
  }

  loadCategories() {
    this.productCategoryService.getProductCategories().subscribe({
      next: (data) => {
        this.productCategories = data['member'];
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = 'Impossible de charger les produits.';
        this.isLoading = false;
      },
    });
  }
}
