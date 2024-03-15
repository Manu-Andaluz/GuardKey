import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private path = 'http://localhost:8000/manager/retrieve-entries/';
  private headers = new HttpHeaders({
    'Content-Type': 'application/json', // Example header
  });

  constructor(private httpClient: HttpClient) {}

  examplePost(body: { master_password: string; decrypt_password: boolean }) {
    return this.httpClient.post<{ data: Entry[] }>(this.path, body, {
      headers: this.headers,
    });
  }
}
