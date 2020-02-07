import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  userFile = File;
  constructor() { }

  ngOnInit() {
  }

  onSelectFile(event) {
    const file = event.target.files[0];
    this.userFile = file ;
  }
}
