import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Category } from '../../models/interfaces';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private apiUrl = `${environment.API_URL}/categories`;
  private http = inject(HttpClient);

  constructor() {}

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.apiUrl);
  }
}
