import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from '../../../../environments/environment';

export interface Sale {
  id: number;
  client: string;
  prixProduitsHT: number;
  prixProduitsTTC: number;
  numeroVente: string;
}

@Injectable({
  providedIn: 'root',
})
export class SalesService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Sale[]> {
    return this.http.get<Sale[]>(this.apiUrl + '/sales').pipe(
      catchError((error) => {
        console.error('Erreur lors du chargement des ventes', error);
        return throwError(() => new Error('Erreur API'));
      }),
    );
  }
}
