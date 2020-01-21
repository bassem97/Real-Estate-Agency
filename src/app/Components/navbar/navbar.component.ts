import {Component, Input, OnInit} from '@angular/core';
import {SignComponent} from '../sign/sign.component';
import {Router} from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
   selected: number;
  constructor(private router: Router) { }

  ngOnInit() {
  }

  changerSelection(num) {
    this.selected = num;
  }
}
