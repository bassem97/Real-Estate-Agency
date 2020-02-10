import { Injectable } from '@angular/core';
import {Local} from '../../Models/local';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LocalService {

  private baseUrl = 'http://localhost:81/local/';
  private headers: HttpHeaders;
  constructor(private http: HttpClient) { }


  add(local: Local) {
    return this.http.post(this.baseUrl + 'add', local);
  }

  list(): Observable<any> {
    return this.http.get(this.baseUrl + 'list' );
  }

  remove(id) {
    return this.http.delete(this.baseUrl + 'remove/' + id );
  }

  modify(idLocal: number, local: Local): Observable<any> {
    return this.http.put( this.baseUrl + 'update/' + idLocal, local);
  }

  findById(id): Observable<any> {
    return this.http.get(this.baseUrl + 'localById/'  + id);
  }

  findByAdress(adress): Observable<any> {
    return this.http.get(this.baseUrl + 'findByAdress/' + adress);
  }

  isWishedByUser(idUser, idLocal): Observable<any> {
    this.headers = new HttpHeaders({Authorization: 'Bearer ' + localStorage.token});
    return this.http.get(this.baseUrl + 'isWishedByUser/' + idUser + '/' + idLocal);
  }

}
