import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { District, IDistrictEnvelope } from '@app/_models/district';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DistrictService {
  constructor(private http: HttpClient) {}

  getAllDistrictsByPagination(limit, offset): Observable<IDistrictEnvelope> {
    const params = new HttpParams().set('limit', limit).set('offset', offset);
    return this.http.get<IDistrictEnvelope>(
      `${environment.apiUrl}/district/ListByPagination/`,
      {
        observe: 'body',
        params: params,
      }
    );
  }

  getAllDistricts(): Observable<District[]> {
    return this.http.get<District[]>(`${environment.apiUrl}/district/`);
  }

  getDistrictsByProvinceId(provinceId:number): Observable<District[]> {
    return this.http.get<District[]>(`${environment.apiUrl}/district/ListByProvinceId/`+provinceId);
  }

  createDistrict(request: District) {
    return this.http.post(`${environment.apiUrl}/district/`, request);
  }

  updateDistrict(id: number, request: District) {
    return this.http.put<District[]>(
      `${environment.apiUrl}/district/` + id,
      request
    );
  }

  deleteDistrict(id: number) {
    return this.http.delete(`${environment.apiUrl}/district/` + id);
  }
}
