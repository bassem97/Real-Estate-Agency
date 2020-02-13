import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Client} from '../../Models/Client';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private baseUrl = 'http://localhost:81/client/';
  private headers: HttpHeaders;
  constructor(private http: HttpClient) { }


  add(client: Client) {
    return this.http.post(this.baseUrl + 'register', client);
  }

  list(): Observable<any> {
    return this.http.get(this.baseUrl + 'list' );
  }

  remove(id) {
    return this.http.delete(this.baseUrl + 'remove/' + id );
  }

  modify(idClient: number, client: Client): Observable<any> {
    this.headers = new HttpHeaders({Authorization: 'Bearer ' + localStorage.token});
    return this.http.put( this.baseUrl + 'update/' + idClient, client , {
      headers: this.headers
    });
  }

  findById(id): Observable<any> {
    return this.http.get(this.baseUrl + 'clientById/'  + id);
  }

  findByUsername(username): Observable<any> {
    return this.http.get(this.baseUrl + 'clientByUsername/'  + username);
  }

  findByEmail(email): Observable<any> {
     return this.http.get(this.baseUrl + 'clientByEmail/' + email);
  }

  login(loginPayload) {
    const headers = {
      Authorization: 'Basic ' + btoa('devglan-client:devglan-secret'),
      'Content-type': 'application/x-www-form-urlencoded'
    };
    return this.http.post(this.baseUrl + 'oauth/token', loginPayload, {headers});
  }
}
