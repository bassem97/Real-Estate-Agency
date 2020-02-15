import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ActivatedRoute, Router, } from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Agency} from '../../Models/Agency';
import {Client} from '../../Models/Client';
import {ClientService} from '../../services/Client/client.service';
import {AgencyService} from '../../services/Agency/agency.service';
import {MatDialog, MatDialogRef, MatSelectChange} from '@angular/material';
import {DialogComponent} from './dialog.component';
import {Observable} from 'rxjs';
import {AuthenticationService} from '../../services/Authentication/authentication.service';
import {HttpParams} from '@angular/common/http';
import {User} from '../../Models/User';
import {Login} from '../../Models/Login';
import {UserService} from '../../services/User/user.service';
import {NavbarComponent} from '../navbar/navbar.component';

export function MustMatch(controlName: string, matchingControlName: string) {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];
    const matchingControl = formGroup.controls[matchingControlName];
    if (matchingControl.errors && !matchingControl.errors.mustMatch) {
      return;
    }
    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({mustMatch: true});
    } else {
      matchingControl.setErrors(null);
    }
  };
}
@Component({
  selector: 'app-sign',
  templateUrl: './sign.component.html',
  styleUrls: ['./sign.component.css']
})
export class SignComponent implements OnInit {
  // tslint:disable-next-line:max-line-length
  signUpForm: FormGroup;
  signInForm: FormGroup;
  user: User = {
    agencyName: '',
    birthdate: '',
    dtype: '',
    email: '',
    firstName: '',
    idUser: 0,
    image: '',
    lastName: '',
    locals: [],
    password: '',
    phoneNumber: '',
    taxRegistration: '',
    username: '',
    wishList: []
  };
  login: Login = {password: '', username: ''};
  dialogComponent: MatDialogRef<DialogComponent>;
  selected: number;
  selectedItem = 'Person';
  @Output() closeAll = new EventEmitter<boolean>();
  constructor(private route: ActivatedRoute,
              private clientService: ClientService,
              private agencyService: AgencyService,
              private formBuilder: FormBuilder,
              public dialog: MatDialog,
              private router: Router,
              private authService: AuthenticationService,
              private userService: UserService,
              private navBar: NavbarComponent
  ) {
  }



  ngOnInit() {

    // choosing sign in or sign up depanding on button clicked in navbar
    this.route.paramMap.subscribe(params => {
      this.selected = Number(params.get('id'));
    });
    this.createSignUpForm();
    this.createSignInForm();
    this.login = new Login() ;

    this.userService.list().subscribe(users => console.table(users));

  }
  createSignUpForm() {
    // tslint:disable-next-line:max-line-length
    const emailregex: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const name: RegExp = /^[a-zA-Z]*$/;
    this.signUpForm = this.formBuilder.group({
      firstname: [this.user.firstName, [Validators.required, Validators.pattern(name),  Validators.minLength(3)]],
      lastname: [this.user.lastName, [Validators.required, Validators.pattern(name), Validators.minLength(3)]],
      username: [this.user.username, [Validators.required,  Validators.minLength(4)], this.checkInUseUsername.bind(this)],
      email: [this.user.email, [Validators.required, Validators.pattern(emailregex)], this.checkInUseEmail.bind(this)],
      password: [this.user.password, [Validators.required, this.checkPassword]],
      repassword: ['', Validators.required]
    }, {
      validators: [ MustMatch('password', 'repassword'), ]
    });
  }
  editControls($event: MatSelectChange) {
    if (this.selectedItem === 'Agency') {
      this.signUpForm.addControl('agencyname', new FormControl(this.user.agencyName, [Validators.required, Validators.pattern(name),  Validators.minLength(3)]));
      this.signUpForm.addControl('taxregistration',
        new FormControl(this.user.taxRegistration, [Validators.required,  Validators.minLength(4)],
          this.checkInUseTaxRegistration.bind(this)));
      this.signUpForm.removeControl('firstname');
      this.signUpForm.removeControl('lastname');
    }
  }
  createSignInForm() {
    this.signInForm = this.formBuilder.group({
      username: [this.login.username, [Validators.required]],
      password: [this.login.password, [Validators.required]]
    });
  }

  signIn(value: any) {
    this.authService.authenticate(this.login).subscribe(res => {
      console.log(res);
      // @ts-ignore
      localStorage.token = res.token;
      this.userService.findUserWithToken().subscribe(result => {
        // @ts-ignore
        localStorage.username = result.username;
      });
      this.router.navigateByUrl('/').then(value =>   window.location.reload()) ;
    }, error => {
      this.dialogComponent = this.dialog.open(DialogComponent, {
        width: '350px',
        data : 'Username/password Invalid/does not exist ! '
      });
      this.signInForm.controls.emailUsername.setErrors({incorrect : true}) ;
      this.signInForm.controls.password.setErrors({incorrect : true}) ;
    }) ;
  }


  // signing up client or agency depanding on selected item
  register() {
    if (this.selectedItem === 'Person') {
      // tslint:disable-next-line:max-line-length
      const client: Client = new Client(this.user.username, this.user.email, this.user.password, this.user.firstName, this.user.lastName, this.user.birthdate) ;
      this.clientService.add(client).subscribe(user => {
        console.table(user);
        this.dialogComponent = this.dialog.open(DialogComponent, {
          width: '350px',
          data : 'Sign In Success !'
        });
        this.dialogComponent.afterClosed().subscribe(() => {
          this.selected = 0;
          this.signUpForm.reset();
        });
      });
    } else {
      // tslint:disable-next-line:max-line-length
      const agency: Agency = new Agency(this.user.username, this.user.email, this.user.password, this.user.agencyName, this.user.taxRegistration) ;
      this.agencyService.add(agency).subscribe(user => {
        console.table(user);
        this.dialogComponent = this.dialog.open(DialogComponent, {
          width: '350px',
          data : 'Sign In Success !'
        });
        this.dialogComponent.afterClosed().subscribe(() => {
          this.selected = 0;
          this.signUpForm.reset();
        });
      });
    }
  }

// check valide password : must be al least 6 caractere, one maj and one miniscule and a number
  checkPassword(control) {
    const enteredPassword = control.value;
    const passwordCheck = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})/;
    return (!passwordCheck.test(enteredPassword) && enteredPassword) ? { requirements: true } : null;
  }
// Check In User the fields : Tax Registration , Username , Email and Phone number
  checkInUseTaxRegistration(control) {
    const taxRegistrations = [];
    this.userService.list().subscribe(users => {
        console.log(users);
        for (const user of users) {
            taxRegistrations.push(user.taxRegistration);
        }
      });
    console.log(taxRegistrations);
    return new Observable(observer => {
      setTimeout(() => {
        const result = (taxRegistrations.indexOf(control.value) !== -1) ? { alreadyInUse: true } : null;
        observer.next(result);
        observer.complete();
      }, 4000);
    });
  }
  checkInUseEmail(control) {
    const emails = [];
    this.userService.list().subscribe(users => {
        for (const user of users) {
          // @ts-ignore
            emails.push(user.email);
          }
      });
    console.log(emails);
    return new Observable(observer => {
      setTimeout(() => {
        const result = (emails.indexOf(control.value) !== -1) ? { alreadyInUse: true } : null;
        observer.next(result);
        observer.complete();
      }, 4000);
    });
  }
  checkInUseUsername(control) {
    // mimic http database access
    const usernames = [];
    this.userService.list().subscribe(users => {
        for (const user of users) {
          // @ts-ignore
            usernames.push(user.username);
        }
    });
    console.log(usernames);
    return new Observable(observer => {
      setTimeout(() => {
        const result = (usernames.indexOf(control.value) !== -1) ? { alreadyInUse: true } : null;
        observer.next(result);
        observer.complete();
      }, 4000);
    });
  }
  // Get form controls Errors
  getErrorFirstname() {
    return this.firstname.hasError('required') ?
      'Field is required' :
      this.firstname.hasError('minlength') ? 'You need to specify at least 3 characters' : 'First name should be contain only caracters';
  }
  getErrorLastname() {
    return this.lastname.hasError('required') ?
      'Field is required' :
      this.lastname.hasError('minlength') ? 'You need to specify at least 3 characters' : 'Last name should be contain only caracters';
  }
  getErrorAgencyName() {
    return this.agencyname.hasError('required') ?
      'Field is required' :
      this.agencyname.hasError('minlength') ? 'You need to specify at least 3 characters' : 'Agency name should be contain only caracters';
  }
  getErrorTaxRegistration() {
    return this.taxregistration.hasError('required') ? 'Field is required' :
      this.taxregistration.hasError('minlength') ? 'You need to specify at least 4 characters' :
        this.taxregistration.hasError('alreadyInUse') ? 'your tax registration is already in use' : '';
  }
  getErrorUsername() {
    return this.username.hasError('required') ? 'Field is required' :
      this.username.hasError('minlength') ? 'You need to specify at least 4 characters' :
        this.username.hasError('alreadyInUse') ? 'This username is already in use' : '';
  }
  getErrorEmail() {
    return this.email.hasError('required') ? 'Field is required' :
      this.email.hasError('pattern') ? 'Not a valid email address' :
        this.email.hasError('alreadyInUse') ? 'This email address is already in use' : '';
  }
  getErrorPassword() {
    return this.password.hasError('required') ? 'Field is required (at least six characters, one uppercase letter and one number)' :
      this.password.hasError('requirements') ? 'Password needs to be at least six characters, one uppercase letter and one number' : '';
  }
  getErrorRepassword() {
    return this.repassword.hasError('required') ? 'Field is required ' : 'Passwords Must match ' ;
  }
  // Get the form controls
  get firstname() {
    return this.signUpForm.get('firstname') as FormControl;
  }
  get lastname() {
    return this.signUpForm.get('lastname') as FormControl;
  }
  get agencyname() {
    return this.signUpForm.get('agencyname') as FormControl;
  }
  get taxregistration() {
    return this.signUpForm.get('taxregistration') as FormControl;
  }
  get email() {
    return this.signUpForm.get('email') as FormControl;
  }
  get username() {
    return this.signUpForm.get('username') as FormControl;
  }

  get password() {
    return this.signUpForm.get('password') as FormControl;
  }
  get repassword() {
    return this.signUpForm.get('repassword') as FormControl;
  }

}



