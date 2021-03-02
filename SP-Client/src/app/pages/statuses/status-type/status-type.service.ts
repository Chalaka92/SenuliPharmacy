import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StatusType } from '@app/_models/statusType';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StatusTypeService {
  constructor(private http: HttpClient) {}

  getAllStatusTypes(): Observable<StatusType[]> {
    return this.http.get<StatusType[]>(`${environment.apiUrl}/statusType`);
  }

  createStatusType(request: StatusType) {
    return this.http.post(`${environment.apiUrl}/statusType`, request);
  }

  updateStatusType(id: number, request: StatusType) {
    return this.http.put<StatusType[]>(
      `${environment.apiUrl}/statusType/` + id,
      request
    );
  }

  deleteStatusType(id: number) {
    return this.http.delete(`${environment.apiUrl}/statusType/` + id);
  }
}
