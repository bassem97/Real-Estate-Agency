import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Client} from '../../Models/Client';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private baseUrl = 'http://localhost:81/Client/';
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
    return this.http.put( this.baseUrl + 'update/' + idClient, client);
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
}
