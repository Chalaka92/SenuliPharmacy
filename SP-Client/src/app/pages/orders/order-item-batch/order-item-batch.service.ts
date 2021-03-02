import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OrderItemBatch } from '@app/_models/orderItemBatch';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrderItemBatchService {
  constructor(private http: HttpClient) {}

  getAllOrderItemBatches(): Observable<OrderItemBatch[]> {
    return this.http.get<OrderItemBatch[]>(
      `${environment.apiUrl}/orderItemBatch`
    );
  }

  createOrderItemBatch(request: OrderItemBatch) {
    return this.http.post(`${environment.apiUrl}/orderItemBatch`, request);
  }

  updateOrderItemBatch(id: number, request: OrderItemBatch) {
    return this.http.put<OrderItemBatch[]>(
      `${environment.apiUrl}/orderItemBatch/` + id,
      request
    );
  }

  deleteOrderItemBatch(id: number) {
    return this.http.delete(`${environment.apiUrl}/orderItemBatch/` + id);
  }
}
