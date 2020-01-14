import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Client} from '../Models/Client';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private baseUrl = 'http://localhost:81/client/';
  // tslint:disable-next-line:max-line-length
  // private header = new HttpHeaders({'authorization': 'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1c2VyMUBnbWFpbCIsInJvbGVzIjpbIlVTRVIiXSwiaXNzIjoiL2xvZ2luIiwiZXhwIjoxNTc1NDg4Nzc5fQ.k8ZKAtZUaGXefvsTgqyku_pANq_sH5rbd2NV0xQxLFM'});
  constructor(private http: HttpClient) { }

  add(client: Client): Observable<object> {
    return this.http.post(this.baseUrl + 'register', client);
  }

  list(): Observable<any> {
    return this.http.get(this.baseUrl + 'list' );
  }

  remove(id) {
    return this.http.delete(this.baseUrl + 'remove/' + id );
  }

  modify(idClient: number, client: Client): Observable<any> {
    return this.http.put( this.baseUrl + 'update/' + idClient, client);
  }

  findById(id): Observable<any> {
    return this.http.get(this.baseUrl  + id);
  }
  findByEmail(email): Observable<any> {
    return this.http.get(this.baseUrl + email);
  }
}
