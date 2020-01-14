import { Component, OnInit } from '@angular/core';
import {NavbarComponent} from '../navbar/navbar.component';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-sign',
  templateUrl: './sign.component.html',
  styleUrls: ['./sign.component.css']
})
export class SignComponent implements OnInit {
  selected: number;

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.selected = Number(params.get('id'));
    });
  }


}
