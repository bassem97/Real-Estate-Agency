import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {LocalService} from '../../services/Local/local.service';
import {Observable} from 'rxjs';
import {Local} from '../../Models/Local';
import {HttpClient} from '@angular/common/http';
import {observableToBeFn} from 'rxjs/internal/testing/TestScheduler';
import {FilterPipe} from './filterPipe';
import {UserService} from '../../services/User/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit , OnChanges {


  constructor(private localService: LocalService, private userService: UserService) {
  }
   locals: Local[] = [];
   local: Local = {
    address : '',
     area : null,
     description : '',
     price : null,
     roomsNumber : 1,
     transactionType : '',
     type : ''
  };
  minPrice = null;
  maxPrice = null;
  minArea = null;
  maxArea = null;


  ngOnInit() {
    this.localService.list().subscribe(data => {
      for (const local of data) {
        this.locals.push(local);
      }
    }  );

  }

  searchLocation(location) {
    const reg = new RegExp( location , 'i');
    this.locals = this.locals.filter(local => reg.test(local.address));
  }

  searchType(type) {
    const reg = new RegExp( type , 'i');
    this.locals = this.locals.filter(local => reg.test(local.type) );
  }

  searchStatus(status) {
    const reg = new RegExp( status , 'i');
    this.locals = this.locals.filter(local => reg.test(local.transactionType));
  }

  search() {

  }




  ngOnChanges(changes: SimpleChanges): void {
    for (const propName of Object.keys(changes)) {
      const change = changes[propName];
      const from = JSON.stringify(change.previousValue);
      const to = JSON.stringify(change.currentValue);

      console.log(propName + ' changed from ' + from + ' to ' + to);
    }

  }

  test() {
    console.log();
  }
}
