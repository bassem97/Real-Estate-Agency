import { Injectable } from '@angular/core';
import {Agency} from '../../Models/Agency';
import {Client} from '../../Models/Client';
import {HttpClient} from '@angular/common/http';
import {ClientService} from '../Client/client.service';
import {AgencyService} from '../Agency/agency.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private baseUrl = 'http://localhost:81/';
  private jwt: string;
  private username: string;
  private agency: Agency;
  private client: Client;

  constructor(private http: HttpClient, private clientService: ClientService, private agencyService: AgencyService) { }

  getUserDetails(username, password){

  }

  login(user: object) {

  }

  saveToken(jwt: string) {

  }

  isAuthentified() {

  }
}
