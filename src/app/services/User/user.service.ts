import { Injectable } from '@angular/core';
import {User} from '../../Models/User';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseurl = 'http://localhost:81/user/';
  private headers: HttpHeaders;

  constructor(private http: HttpClient) { }


  public findUserWithToken() {
    this.headers = new HttpHeaders({Authorization: 'Bearer ' + localStorage.token});
    return this.http.get(this.baseurl + 'auth', { headers : this.headers});
  }
  add(user: User) {
    this.headers = new HttpHeaders({Authorization: 'Bearer ' + localStorage.token});
    return this.http.post(this.baseurl + 'users', user, {
      headers: this.headers
    });
  }
  list(): Observable<any> {
    this.headers = new HttpHeaders({Authorization: 'Bearer ' + localStorage.token});
    return this.http.get(this.baseurl + 'users', {
      headers: this.headers
    });
  }

  remove(id) {
    this.headers = new HttpHeaders({Authorization: 'Bearer ' + localStorage.token});
    return this.http.delete(this.baseurl + 'users/' + id, {
      headers: this.headers
    });
  }

  modify(user) {
    this.headers = new HttpHeaders({Authorization: 'Bearer ' + localStorage.token});
    return this.http.put(this.baseurl + 'users', user , {
      headers: this.headers
    });
  }
  findById(id): Observable<User> {
    this.headers = new HttpHeaders({Authorization: 'Bearer ' + localStorage.token});
    // @ts-ignore
    return this.http.get(this.baseurl + 'users/' + id, {
      headers: this.headers
    });
  }
  addUserProject(userProject) {
    this.headers = new HttpHeaders({Authorization: 'Bearer ' + localStorage.token});

    /*  return this.http.post(this.baseurl + 'userprojects', {
        user: {
         id : idU
    }, manager : isManager,
        project: {id: idP}} , {headers: this.headers});*/
    return this.http.post(this.baseurl + 'userprojects', userProject , {headers: this.headers});
  }

  viewNotification() {
    this.headers = new HttpHeaders({Authorization: 'Bearer ' + localStorage.token});

    return this.http.get(this.baseurl + 'notifs/viewed' , {headers: this.headers});
  }

  changePassword(user) {
    this.headers = new HttpHeaders({Authorization: 'Bearer ' + localStorage.token});
    return this.http.post(this.baseurl + 'password', user, {headers: this.headers});
  }

}
