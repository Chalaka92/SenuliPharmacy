import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ItemCategory } from '@app/_models/itemCategory';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ItemCategoryService {
  constructor(private http: HttpClient) {}

  getAllItemCategories(): Observable<ItemCategory[]> {
    return this.http.get<ItemCategory[]>(`${environment.apiUrl}/itemCategory`);
  }

  createItemCategory(request: ItemCategory) {
    return this.http.post(`${environment.apiUrl}/itemCategory`, request);
  }

  updateItemCategory(id: number, request: ItemCategory) {
    return this.http.put<ItemCategory[]>(
      `${environment.apiUrl}/itemCategory/` + id,
      request
    );
  }

  deleteItemCategory(id: number) {
    return this.http.delete(`${environment.apiUrl}/itemCategory/` + id);
  }
}
