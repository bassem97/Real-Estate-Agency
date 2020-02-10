import { Component, OnInit } from '@angular/core';
import {UserService} from '../../services/User/user.service';
import {User} from '../../Models/User';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  userFile = File;
  selected: string;
  constructor(private userService: UserService, private route: ActivatedRoute) { }
  user: User = new User();
  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.selected = String(params.get('active'));
    });
    console.log(this.selected);

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
