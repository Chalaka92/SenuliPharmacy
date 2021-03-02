import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Status } from '@app/_models/status';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StatusService {
  constructor(private http: HttpClient) {}

  getAllStatuses(): Observable<Status[]> {
    return this.http.get<Status[]>(`${environment.apiUrl}/status`);
  }

  createStatus(request: Status) {
    return this.http.post(`${environment.apiUrl}/status`, request);
  }

  updateStatus(id: number, request: Status) {
    return this.http.put<Status[]>(
      `${environment.apiUrl}/status/` + id,
      request
    );
  }

  deleteStatus(id: number) {
    return this.http.delete(`${environment.apiUrl}/status/` + id);
  }
}
