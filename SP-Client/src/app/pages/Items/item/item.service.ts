import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Item } from '@app/_models/item';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  constructor(private http: HttpClient) {}

  getAllItems(): Observable<Item[]> {
    return this.http.get<Item[]>(`${environment.apiUrl}/item`);
  }

  createItem(request: Item) {
    return this.http.post(`${environment.apiUrl}/item`, request);
  }

  updateItem(id: number, request: Item) {
    return this.http.put<Item[]>(`${environment.apiUrl}/item/` + id, request);
  }

  deleteItem(id: number) {
    return this.http.delete(`${environment.apiUrl}/item/` + id);
  }
}
