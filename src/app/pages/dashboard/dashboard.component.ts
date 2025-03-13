import { Component } from '@angular/core';
import { Sale, SalesService } from '@app/shared/services/sales/sales.service';
import { TranslateModule } from '@ngx-translate/core';
import * as Highcharts from 'highcharts';
import { HighchartsChartModule } from 'highcharts-angular';

@Component({
  selector: 'app-dashboard',
  imports: [TranslateModule, HighchartsChartModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  sales: Sale[] = [];
  isLoading = true;
  errorMessage = '';

  Highcharts: typeof Highcharts = Highcharts; // required
  chartConstructor: string = 'chart'; // optional string, defaults to 'chart'
  chartOptions: Highcharts.Options = {
    series: [
      {
        data: [],
        type: 'line',
      },
    ],
  };

  constructor(private salesService: SalesService) {}

  ngOnInit() {
    this.loadSales();
  }

  loadSales() {
    this.salesService.getProducts().subscribe({
      next: (data) => {
        this.sales = data['member'];
        this.makeSeries();
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = 'Impossible de charger les ventes.';
        this.isLoading = false;
      },
    });
  }

  makeSeries() {
    let serie1 = [];
    this.sales.forEach((sale) => {
      serie1.push(sale.prixProduitsHT);
    });

    this.chartOptions = {
      series: [
        {
          data: serie1,
          type: 'line',
        },
      ],
    };
  }
}
