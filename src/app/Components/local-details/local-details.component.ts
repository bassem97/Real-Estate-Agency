import { Component, OnInit } from '@angular/core';
import {HomeComponent} from '../home/home.component';
import {Local} from '../../Models/Local';

@Component({
  selector: 'app-local-details',
  templateUrl: './local-details.component.html',
  styleUrls: ['./local-details.component.css']
})
export class LocalDetailsComponent implements OnInit {

  constructor(private homeComponent: HomeComponent ) { }
  locals: Local[] = [];
  ngOnInit() {
   this.locals = this.homeComponent.locals;
  }

}
