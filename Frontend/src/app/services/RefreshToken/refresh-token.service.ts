import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RefreshTokenService {
  private path =
    'https://mynotes-production-ac8e.up.railway.app/auth/refresh-token/';
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  constructor(private httpClient: HttpClient) {}

  postRequest(token: string) {
    return this.httpClient.post(
      this.path,
      { token: token },
      { headers: this.headers }
    );
  }
}
