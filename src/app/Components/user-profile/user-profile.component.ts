import { Component, OnInit } from '@angular/core';
import {UserService} from '../../services/User/user.service';
import {User} from '../../Models/User';
import {ActivatedRoute, Router} from '@angular/router';
import {Local} from '../../Models/Local';
import {Form, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {ChangePassword} from '../../Models/ChangePassword';
import { SearchCountryField, TooltipLabel, CountryISO } from 'ngx-intl-tel-input';
import {MatDialog, MatDialogRef, MatInputModule, MatSnackBar} from '@angular/material';
import {NgxMatIntlTelInputModule} from 'ngx-mat-intl-tel-input';
import {PhoneNumber} from 'libphonenumber-js';
import {AgencyService} from '../../services/Agency/agency.service';
import {ClientService} from '../../services/Client/client.service';
import {DialogComponent} from '../sign/dialog.component';
import {LocalService} from '../../services/Local/local.service';


export function MustMatch(controlName: string, matchingControlName: string) {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];
    const matchingControl = formGroup.controls[matchingControlName];

    if (matchingControl.errors && !matchingControl.errors.mustMatch) {
      // return if another validator has already found an error on the matchingControl
      return;
    }

    // set error on matchingControl if validation fails
    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({ mustMatch: true });
    } else {
      matchingControl.setErrors(null);
    }
  };
}
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  formGroup: FormGroup;
  passwordFormGroup: FormGroup;
  post: any = '';
  userFile = File;
  selected: number;
  constructor(private userService: UserService,
              private localService: LocalService,
              private route: ActivatedRoute,
              public dialog: MatDialog,
              private snackBar: MatSnackBar,
              private formBuilder: FormBuilder,
              private agencyService: AgencyService,
              private clientService: ClientService) {
    this.createForm();
  }
  dialogComponent: MatDialogRef<DialogComponent>;
  user: User =  {
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

  changePassword: ChangePassword = {newPassword: '', oldPassword: ''};
  maxDate = new Date(2003, 0, 0);
  minDate = new Date(1920, 0, 1);
  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.selected = Number(params.get('element'));
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

  removeFromProperty(local: Local) {
    this.user.locals.forEach( (item, index) => {
      if (item === local ) {
        this.user.locals.splice(index, 1);
        // @ts-ignore
        this.localService.remove(local.idLocal).subscribe();
      }
    });
  }
  removeFromWishlist(local: Local) {
    this.user.wishList.forEach( (item, index) => {
      if (item === local ) {
        this.user.wishList.splice(index, 1);
        // @ts-ignore
        this.userService.removeLocalFromWishlist(this.user.idUser, local.idLocal).subscribe();
      }
    });
  }

  // field Validator

  createForm() {
    // tslint:disable-next-line:max-line-length
    const emailregex: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const name: RegExp = /^[a-zA-Z]*$/;
    this.formGroup = this.formBuilder.group({
      email: [this.user.email, [Validators.required, Validators.pattern(emailregex)], this.checkInUseEmail.bind(this)],
      username: [this.user.email, [Validators.required, Validators.minLength(4)], this.checkInUseUsername.bind(this)],
      phonenumber: [this.user.phoneNumber, [Validators.required], this.checkInUsePhoneNumber.bind(this)]
    });
    this.userService.findUserWithToken().subscribe(user => {
      // @ts-ignore
      if (user.dtype === 'Client') {
        // tslint:disable-next-line:max-line-length
        this.formGroup.addControl('firstname', new FormControl(this.user.firstName, [Validators.required,  Validators.pattern(name),  Validators.minLength(3)]));
        // tslint:disable-next-line:max-line-length
        this.formGroup.addControl('lastname', new FormControl(this.user.lastName, [Validators.required,  Validators.pattern(name),  Validators.minLength(3)]));
        this.formGroup.addControl('birthdate', new FormControl(this.user.birthdate, [Validators.required]));
      } else {
        // tslint:disable-next-line:max-line-length
        this.formGroup.addControl('agencyname', new FormControl(this.user.agencyName, [Validators.required,  Validators.pattern(name),  Validators.minLength(3)]));
        this.formGroup.addControl('taxregistration',
          new FormControl(this.user.taxRegistration, [Validators.required,  Validators.minLength(4)],
            this.checkInUseTaxRegistration.bind(this)));
      }

    });
    this.passwordFormGroup = this.formBuilder.group({
      oldpassword: [this.changePassword.oldPassword, [Validators.required]],
      newpassword: [this.changePassword.newPassword, [Validators.required, this.checkPassword]],
      repassword: [null, Validators.required],
    }, {
      validator: MustMatch('newpassword', 'repassword')
    });
  }



// Check form controls





  onSubmit(post) {
    if (this.user.dtype === 'Client') {
      this.clientService.modify(this.user.idUser, this.user).subscribe( user => console.table(user)) ;
    } else {
      this.agencyService.modify(this.user.idUser, this.user).subscribe(user => console.table(user));
    }
    this.dialogComponent = this.dialog.open(DialogComponent, {
      width: '400px',
      data : 'informations updated successfully ! '
    });
    this.formGroup.markAsUntouched();
  }
  ChangePassword(value: any) {
    this.userService.changePassword(this.changePassword, this.user).subscribe(res => {
      console.table(res);
      if ( res === false) {
        this.oldpassword.setErrors({incorrect: true});
      } else {
        this.dialogComponent = this.dialog.open(DialogComponent, {
          width: '350px',
          data : 'Password changed successfully ! '
        });
        this.passwordFormGroup.reset();
        this.oldpassword.setErrors(null);
        this.newpassword.setErrors(null);
        this.repassword.setErrors(null);
      }
    });
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
    this.userService.findUserWithToken().subscribe(userr => {
      this.userService.list().subscribe(users => {
        console.log(users);
        for (const user of users) {
          // @ts-ignore
          if (user.taxRegistration !== userr.taxRegistration) {
            // console.log(user.taxRegistration);
            taxRegistrations.push(user.taxRegistration);
          }
        }
      });
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
     this.userService.findUserWithToken().subscribe(userr => {
       this.userService.list().subscribe(users => {
         for (const user of users) {
           // @ts-ignore
           if (user.email !== userr.email) {
             emails.push(user.email);
           }
         }
       });
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
    this.userService.findUserWithToken().subscribe(userr => {
      this.userService.list().subscribe(users => {
        for (const user of users) {
          // @ts-ignore
          if (user.username !== userr.username) {
            usernames.push(user.username);
          }
        }
      });
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
  checkInUsePhoneNumber(control) {
    // mimic http database access
    const phoneNumbers = [];
    console.log('dakhall lil methode');
    this.userService.findUserWithToken().subscribe(userr => {
      this.userService.list().subscribe(users => {
        for (const user of users) {
          // @ts-ignore
          if (user.phoneNumber !== userr.phoneNumber) {
            phoneNumbers.push(user.phoneNumber);
          }
        }
      });
    });
    console.log(phoneNumbers);
    return new Observable(observer => {
      setTimeout(() => {
        const result = (phoneNumbers.indexOf(control.value) !== -1) ? { alreadyInUse: true } : null;
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
  getErrorPhonenumber() {
    return this.phonenumber.hasError('alreadyInUse') ? 'This phone number is already in use' :
      'Invalid phone number ' ;
  }
  getErrorOldPassword() {
    return this.oldpassword.hasError('required') ? 'Field is required ' : 'Incorrect password';
  }
  getErrorNewPassword() {
    return this.newpassword.hasError('required') ? 'Field is required (at least six characters, one uppercase letter and one number)' :
      this.newpassword.hasError('requirements') ? 'Password needs to be at least six characters, one uppercase letter and one number' : '';
  }
  getErrorRepassword() {
    return this.repassword.hasError('required') ? 'Field is required ' : 'Passwords Must match ' ;
  }


// Get the form controls
  get firstname() {
    return this.formGroup.get('firstname') as FormControl;
  }
  get lastname() {
    return this.formGroup.get('lastname') as FormControl;
  }
  get agencyname() {
    return this.formGroup.get('agencyname') as FormControl;
  }
  get taxregistration() {
    return this.formGroup.get('taxregistration') as FormControl;
  }
  get email() {
    return this.formGroup.get('email') as FormControl;
  }
  get birthdate() {
    return this.formGroup.get('birthdate') as FormControl;
  }
  get username() {
    return this.formGroup.get('username') as FormControl;
  }
  get phonenumber() {
    return this.formGroup.get('phonenumber') as FormControl;
  }
  get oldpassword() {
    return this.passwordFormGroup.get('oldpassword') as FormControl;
  }
  get newpassword() {
    return this.passwordFormGroup.get('newpassword') as FormControl;
  }
  get repassword() {
    return this.passwordFormGroup.get('repassword') as FormControl;
  }
  get description() {
    return this.formGroup.get('description') as FormControl;
  }

  openSnackBar() {
    const message = 'local removed ';
    const snackBar = this.snackBar.open(message, '', {
      duration: 3000,
    });
  }
}
