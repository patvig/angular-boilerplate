import { Component, signal } from '@angular/core';
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
  readonly panelOpenState = signal(false);

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products = data['member'];
        console.log('this.products', this.products);
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = 'Impossible de charger les produits.';
        this.isLoading = false;
      },
    });
  }
}
