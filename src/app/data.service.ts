import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
  useValue: null,
})
export class DataService implements OnInit {
  constructor(private url: string, private http: HttpClient) {}
  ngOnInit(): void {}
  getAll() {
    return this.http.get(this.url);
  }

  checkUsernameAvailability(username: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.url}?username=${username}`);
  }
  add(data: any) {
    return this.http.post(this.url, data);
  }
  update(id: string | number, data: any) {
    return this.http.put(`${this.url}/${id}`, data);
  }
  getById(id: string | number) {
    return this.http.get(`${this.url}/${id}`);
  }
  delete(id: string | number) {
    return this.http.delete(`${this.url}/${id}`);
  }
}
