import { Injectable } from '@angular/core';
import {Agency} from '../../Models/Agency';
import {Client} from '../../Models/Client';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ClientService} from '../Client/client.service';
import {AgencyService} from '../Agency/agency.service';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService  {
  private baseUrl = 'http://localhost:81/';
  private jwt: string;
  private username: string;
  private agency: Agency;
  private client: Client;

  // tslint:disable-next-line:max-line-length
  constructor(private http: HttpClient, private clientService: ClientService, private agencyService: AgencyService, private router: Router) {
  }


}
