import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DeleteEntryService {
  private path = `http://localhost:8000/manager/delete-entry/`;

  constructor(private httpClient: HttpClient) {}

  deleteRequest(master_password: string, search: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Master-Password': master_password,
    });

    return this.httpClient.delete<{ data: Entry }>(this.path, {
      headers: headers,
      params: { search: search },
    });
  }
}
