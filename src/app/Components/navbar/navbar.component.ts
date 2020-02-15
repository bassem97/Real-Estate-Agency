import {Component, Input, OnInit} from '@angular/core';
import {SignComponent} from '../sign/sign.component';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../services/Authentication/authentication.service';
import {User} from '../../Models/User';
import {UserService} from '../../services/User/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
   selected: number;
   isLoggedIn;
   user: User = new User('', '', '');
  username;
  constructor(private router: Router, private auth: AuthenticationService, private userService: UserService) { }

  ngOnInit() {
    this.isLoggedIn = this.auth.loggedIn() ;
    this.userService.findUserWithToken().subscribe(res => { // @ts-ignore
      // @ts-ignore
      this.username = res.username ; });
  }

  changerSelection(num) {
    this.selected = num;
  }

  logOut() {
    console.log('ddddd');
    this.auth.loggedOut();
    this.ngOnInit();
    this.router.navigateByUrl('');
  }
}
