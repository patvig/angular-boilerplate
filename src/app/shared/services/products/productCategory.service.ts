import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from '../../../../environments/environment';

export interface ProductCategory {
  id: number;
  name: string;
}

@Injectable({
  providedIn: 'root',
})
export class productCategoryService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getProductCategories(): Observable<ProductCategory[]> {
    return this.http.get<ProductCategory[]>(this.apiUrl + '/product_categories').pipe(
      catchError((error) => {
        console.error('Erreur lors du chargement des categories de produits', error);
        return throwError(() => new Error('Erreur API'));
      }),
    );
  }
}
