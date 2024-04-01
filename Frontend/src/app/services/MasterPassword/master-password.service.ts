import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MasterPasswordService {
  private path =
    'https://mynotes-production-ac8e.up.railway.app/manager/create-master-password/';
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  constructor(private httpClient: HttpClient) {}

  postRequest(user_id: number, master_password: string) {
    return this.httpClient.post(
      this.path,
      { user_id, master_password },
      { headers: this.headers }
    );
  }
}
