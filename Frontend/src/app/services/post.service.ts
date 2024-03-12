import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private path = 'http://localhost:8000/manager/example/';

  constructor(private httpClient: HttpClient) {}

  examplePost(data: string) {
    return this.httpClient.post(this.path, data);
  }
}
