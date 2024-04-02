import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class GeneratePasswordService {
  private path = `${environment.apiPath}/manager/generate-password/`;
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  constructor(private httpClient: HttpClient) {}

  getRequest() {
    return this.httpClient.post<{ data: Entry[] }>(
      this.path,
      {},
      { headers: this.headers }
    );
  }
}
