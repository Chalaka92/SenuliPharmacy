import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Item } from "@app/_models/item";
import { IItemBatchEnvelope, ItemBatch } from "@app/_models/itemBatch";
import { environment } from "@environments/environment";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ItemBatchService {
  constructor(private http: HttpClient) {}

  getAllItemBatchesByPagination(limit, offset): Observable<IItemBatchEnvelope> {
    const params = new HttpParams().set("limit", limit).set("offset", offset);
    return this.http.get<IItemBatchEnvelope>(
      `${environment.apiUrl}/itemBatch/ListByPagination/`,
      {
        observe: "body",
        params: params,
      }
    );
  }

  getAllItemBatches(): Observable<ItemBatch[]> {
    return this.http.get<ItemBatch[]>(`${environment.apiUrl}/itemBatch`);
  }

  getItemBatchesByItemId(itemId: number): Observable<ItemBatch[]> {
    return this.http.get<ItemBatch[]>(
      `${environment.apiUrl}/itemBatch/ListByItemId/` + itemId
    );
  }

  createItemBatch(request: ItemBatch) {
    return this.http.post(`${environment.apiUrl}/itemBatch`, request);
  }

  updateItemBatch(id: number, request: ItemBatch) {
    return this.http.put<ItemBatch[]>(
      `${environment.apiUrl}/itemBatch/` + id,
      request
    );
  }

  deleteItemBatch(id: number) {
    return this.http.delete(`${environment.apiUrl}/itemBatch/` + id);
  }
}
