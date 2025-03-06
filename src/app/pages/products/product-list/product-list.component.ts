import { Component, OnInit } from '@angular/core';
import { ProductService, Product } from '../../../shared/services/products/product.service';

@Component({
  selector: 'product-list',
  standalone: false,

  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
})
export class ProductListComponent {
  products: Product[] = [];
  isLoading = true;
  errorMessage = '';

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products = data['member'];
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = 'Impossible de charger les produits.';
        this.isLoading = false;
      },
    });
  }
}
