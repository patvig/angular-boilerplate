import { Component } from '@angular/core';
import { Sale, SalesService } from '@app/shared/services/sales/sales.service';

@Component({
  selector: 'app-sales',
  standalone: false,

  templateUrl: './sales.component.html',
  styleUrl: './sales.component.scss',
})
export class SalesComponent {
  sales: Sale[] = [];
  isLoading = true;
  errorMessage = '';

  constructor(private salesService: SalesService) {}

  ngOnInit() {
    this.loadSales();
  }

  loadSales() {
    this.salesService.getProducts().subscribe({
      next: (data) => {
        this.sales = data['member'];
        console.log('this.sales', this.sales);
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = 'Impossible de charger les ventes.';
        this.isLoading = false;
      },
    });
  }
}
