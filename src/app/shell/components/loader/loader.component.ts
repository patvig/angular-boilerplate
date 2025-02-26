import { Component, effect, Signal, signal } from '@angular/core';
import { LoaderService } from '../../../@core/services/loader/loader.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
  imports: [MatProgressSpinnerModule, CommonModule],
})
export class LoaderComponent {
  loading: Signal<boolean> = signal(false);

  constructor(private loaderService: LoaderService) {
    this.loading = this.loaderService.isLoading;
  }
}
