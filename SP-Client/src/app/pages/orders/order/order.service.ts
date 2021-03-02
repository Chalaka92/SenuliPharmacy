import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Order } from "@app/_models/order";
import { environment } from "@environments/environment";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class OrderService {
  constructor(private http: HttpClient) {}

  getAllOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(`${environment.apiUrl}/order`);
  }

  getSingleOrder(id: number): Observable<Order> {
    return this.http.get<Order>(`${environment.apiUrl}/order/` + id);
  }

  createOrder(request: Order) {
    return this.http.post(`${environment.apiUrl}/order`, request, {
      responseType: "text",
    });
  }

  updateOrder(id: number, request: Order) {
    return this.http.put<Order[]>(`${environment.apiUrl}/order/` + id, request);
  }

  completeOrder(id: number, request: Order) {
    return this.http.put<Order>(
      `${environment.apiUrl}/order/Complete/` + id,
      request
    );
  }

  cancelOrder(id: number, request: Order) {
    return this.http.put<Order>(
      `${environment.apiUrl}/order/Cancel/` + id,
      request
    );
  }

  deleteOrder(id: number) {
    return this.http.delete(`${environment.apiUrl}/order/` + id);
  }
}
