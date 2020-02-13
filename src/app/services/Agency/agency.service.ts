import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Agency} from '../../Models/Agency';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AgencyService {

  private baseUrl = 'http://localhost:81/agency/';
  private headers: HttpHeaders;
  // tslint:disable-next-line:max-line-length
  // private header = new HttpHeaders({'authorization': 'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1c2VyMUBnbWFpbCIsInJvbGVzIjpbIlVTRVIiXSwiaXNzIjoiL2xvZ2luIiwiZXhwIjoxNTc1NDg4Nzc5fQ.k8ZKAtZUaGXefvsTgqyku_pANq_sH5rbd2NV0xQxLFM'});
  constructor(private http: HttpClient) { }

  add(agency: Agency) {
    return this.http.post(this.baseUrl + 'register', agency);
  }

  list(): Observable<any> {
    return this.http.get(this.baseUrl + 'list' );
  }

  remove(id) {
    return this.http.delete(this.baseUrl + 'remove/' + id );
  }

  modify(idAgency: number, agency: Agency): Observable<any> {
    this.headers = new HttpHeaders({Authorization: 'Bearer ' + localStorage.token});
    return this.http.put( this.baseUrl + 'update/' + idAgency, agency, {headers: this.headers});
  }

  findById(id): Observable<any> {
    return this.http.get(this.baseUrl + 'agencyById/'  + id);
  }

  findByEmail(email): Observable<any> {
    return this.http.get(this.baseUrl + 'agencyByEmail/' + email);
  }

  findByUsername(username): Observable<any> {
    return this.http.get(this.baseUrl + 'agencyByUsername/' + username);
  }


  findBytaxRegistration(taxRegistration): Observable<any> {
    return this.http.get(this.baseUrl + 'agencyByTaxRegistration/' + taxRegistration);
  }

}
