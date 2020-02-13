import { Component, OnInit } from '@angular/core';
import {UserService} from '../../services/User/user.service';
import {User} from '../../Models/User';
import {ActivatedRoute, Router} from '@angular/router';
import {Local} from '../../Models/Local';
import {Form, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {ChangePassword} from '../../Models/ChangePassword';
import { SearchCountryField, TooltipLabel, CountryISO } from 'ngx-intl-tel-input';
import {MatInputModule} from '@angular/material';
import {NgxMatIntlTelInputModule} from 'ngx-mat-intl-tel-input';
import {PhoneNumber} from 'libphonenumber-js';
import {AgencyService} from '../../services/Agency/agency.service';
import {ClientService} from '../../services/Client/client.service';


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
  emails: string[] = [];
  post: any = '';
  userFile = File;
  selected: number;
  constructor(private userService: UserService,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder,
              private agencyService: AgencyService,
              private clientService: ClientService) {
    this.createForm();
  }
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
    this.formGroup = this.formBuilder.group({
      email: [this.user.email, [Validators.required, Validators.pattern(emailregex)], this.checkInUseEmail.bind(this)],
      username: [null, [Validators.required, Validators.minLength(4)], this.checkInUseUsername.bind(this)],
      phonenumber: [null, [Validators.required], this.checkInUsePhoneNumber.bind(this)],
    });
    this.userService.findUserWithToken().subscribe(user => {
      // @ts-ignore
      if (user.dtype === 'Client') {
        this.formGroup.addControl('firstname', new FormControl(null, [Validators.required,  Validators.minLength(3)]));
        this.formGroup.addControl('lastname', new FormControl(null, [Validators.required,  Validators.minLength(3)]));
        this.formGroup.addControl('birthdate', new FormControl(null, [Validators.required]));
      } else {
        this.formGroup.addControl('agencyname', new FormControl(null, [Validators.required,  Validators.minLength(3)]));
        this.formGroup.addControl('taxregistration',
          new FormControl(null, [Validators.required,  Validators.minLength(4)], this.checkInUseTaxRegistration.bind(this)));
      }

    });
    this.passwordFormGroup = this.formBuilder.group({
      oldpassword: [null, [Validators.required]],
      newpassword: [null, [Validators.required, this.checkPassword]],
      repassword: [null, Validators.required],
    }, {
      validator: MustMatch('newpassword', 'repassword')
    });
  }



// Check form controls

  checkPassword(control) {
    const enteredPassword = control.value;
    const passwordCheck = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})/;
    return (!passwordCheck.test(enteredPassword) && enteredPassword) ? { requirements: true } : null;
  }

  // @ts-ignore
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
    this.userService.findUserWithToken().subscribe(userr => {
      this.userService.list().subscribe(users => {
        for (const user of users) {
          // @ts-ignore
          console.log(user.phoneNumber, '', userr.phoneNumber);
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



  onSubmit(post) {
    if (this.user.dtype === 'Client') {
      this.clientService.modify(this.user.idUser, this.user).subscribe( user => console.log(user)) ;
    } else {
      this.agencyService.modify(this.user.idUser, this.user).subscribe(user => console.log(user));
    }
  }

  // Get form controls Error

  getErrorFirstname() {
    return this.firstname.hasError('required') ?
      'Field is required' :
      this.firstname.hasError('minlength') ? 'You need to specify at least 3 characters' : '';
  }
  getErrorLastname() {
    return this.lastname.hasError('required') ?
      'Field is required' :
      this.lastname.hasError('minlength') ? 'You need to specify at least 3 characters' : '';
  }
  getErrorAgencyName() {
    return this.agencyname.hasError('required') ?
      'Field is required' :
      this.agencyname.hasError('minlength') ? 'You need to specify at least 3 characters' : '';
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
    return this.phonenumber.hasError('required') ? 'Field is required' :
    this.phonenumber.hasError('alreadyInUse') ? 'This phone number is already in use' :
      'Invalid phone number ' ;
  }
  getErrorOldPassword() {
    return this.oldpassword.hasError('required') ? 'Field is required ' : '';
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


  ChangePassword(value: any) {

      this.userService.changePassword(this.changePassword, this.user).subscribe(res => {
        console.log(res);
        if( res === true) {
          this.oldpassword.markAsDirty(); 
        }
      });

  }
}
