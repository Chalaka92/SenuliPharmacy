import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserDetail } from '@app/_models/userDetails';
import { UserRegister } from '@app/_models/userRegister';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient) {}

  getAllUserDetails(): Observable<UserDetail[]> {
    return this.http.get<UserDetail[]>(`${environment.apiUrl}/userDetail`);
  }

  getSingleUserDetails(id: number): Observable<UserDetail> {
    return this.http.get<UserDetail>(`${environment.apiUrl}/userDetail/` + id);
  }

  createUserDetail(request: UserDetail) {
    return this.http.post(`${environment.apiUrl}/userDetail`, request);
  }

  updateUserDetail(id: number, request: UserDetail) {
    return this.http.put<UserDetail[]>(
      `${environment.apiUrl}/userDetail/` + id,
      request
    );
  }

  deleteUserDetail(id: number) {
    return this.http.delete(`${environment.apiUrl}/userDetail/` + id);
  }

  RegisterUserDetail(request: UserRegister) {
    return this.http.post(`${environment.apiUrl}/user/register`, request);
  }
}
