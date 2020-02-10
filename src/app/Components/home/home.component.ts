import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {LocalService} from '../../services/Local/local.service';
import {Observable} from 'rxjs';
import {Local} from '../../Models/Local';
import {HttpClient} from '@angular/common/http';
import {observableToBeFn} from 'rxjs/internal/testing/TestScheduler';
import {FilterPipe} from './filterPipe';
import {UserService} from '../../services/User/user.service';
import {MatSnackBar} from '@angular/material';
import {User} from '../../Models/User';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit  {


  constructor(private localService: LocalService, private userService: UserService, private snackBar: MatSnackBar, private  router: Router) {
  }
   locals: Local[] = [];
   local: Local = {
     user: undefined,
     idLocal: null,
     address : '',
     area : null,
     description : '',
     price : null,
     roomsNumber : 1,
     transactionType : '',
     type : '',
     userWished: [],
     hasWished: true

   };
  minPrice = null;
  maxPrice = null;
  minArea = null;
  maxArea = null;
  hasWished = false;


  ngOnInit() {
    this.localService.list().subscribe(data => {
      for (const local of data) {
        this.userService.findUserWithToken().subscribe(user => {
          // @ts-ignore
          if (!(local.userWished.findIndex(i => i.idUser === user.idUser ) === -1)) {
            local.hasWished = true ;
          }
        });
        this.locals.push(local);
      }
    }  );


  }
  isWished(local: Local) {
    if (local.hasWished === true) {
      this.userService.findUserWithToken().subscribe(user => {
        // @ts-ignore
        this.userService.removeLocalFromWishlist(user.idUser, local.idLocal).subscribe(d => {
          console.log('tfassakh');
        }) ;
        // @ts-ignore
        console.log(user.idUser + '+' + local.idLocal);
        console.log('local removed !');
        local.hasWished = !local.hasWished;
      });
    } else {
      this.userService.findUserWithToken().subscribe(user => {
        // @ts-ignore
        this.userService.addLocalToWishlist(user.idUser, local.idLocal).subscribe(d => {
          console.log('tsabb');
        }) ;
        // @ts-ignore
        console.log(user.idUser + '+' + local.idLocal);
        console.log('local added !');
        local.hasWished = !local.hasWished;
      });
    }
  }

  openSnackBar(hasWished: boolean) {
    const message = hasWished ? 'local added to wishlist' : 'local removed from wishlist';
    const action = 'open wishlist';
    const snackBar = this.snackBar.open(message, action, {
      duration: 2000,
    });
    snackBar.onAction().subscribe(() => this.router.navigate(['userProfile', 'active']) );
  }
}
