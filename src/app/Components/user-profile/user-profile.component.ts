import { Component, OnInit } from '@angular/core';
import {UserService} from '../../services/User/user.service';
import {User} from '../../Models/User';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  userFile = File;
  constructor(private userService: UserService) { }
  user: User = new User();
  ngOnInit() {
      this.userService.findUserWithToken().subscribe(user => {
        // @ts-ignore
        this.user = user;
        console.log(this.user);
      });

  }

  onSelectFile(event) {
    const file = event.target.files[0];
    this.userFile = file ;
  }
}
