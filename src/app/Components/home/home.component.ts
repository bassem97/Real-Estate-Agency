import {Component, Inject, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {LocalService} from '../../services/Local/local.service';
import {Observable} from 'rxjs';
import {Local} from '../../Models/Local';
import {UserService} from '../../services/User/user.service';
import {MatSnackBar} from '@angular/material';
import {Router} from '@angular/router';
import {User} from '../../Models/User';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [ {provide: Array, useValue: 'array'}]
})
export class HomeComponent implements OnInit  {

  locals: Local[] = [];
  constructor(private localService: LocalService,
              private userService: UserService,
              private snackBar: MatSnackBar,
              private  router: Router,
             ) {
  }
  user: User = null;

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
  message;


  ngOnInit() {
    this.userService.findUserWithToken().subscribe(res => {
      // @ts-ignore
      this.user = res ;
      this.localService.list().subscribe(data => {
        for (const local of data) {

          // @ts-ignore
          if (!(local.userWished.findIndex(i => i.idUser === res.idUser ) === -1)) {
            local.hasWished = true ;
          }

          console.log(local);
          this.locals.push(local);
        }
      });
    }, error => {
      this.localService.list().subscribe(data => {
        console.log(data);
        for (const local of data) {
          this.locals.push(local);
        }
        console.log(this.locals);
      });
    });
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
    snackBar.onAction().subscribe(() => this.router.navigate(['userProfile', 2]) );
  }

  verifLocal(local: Local) {
      return this.user !== null ? this.user.locals.findIndex(i => i.idLocal === local.idLocal ) === -1 ? 1 : 2 : 0;
  }
}


