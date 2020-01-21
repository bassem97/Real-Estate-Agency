import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router,} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Agency} from '../../Models/Agency';
import {Client} from '../../Models/Client';
import {ClientService} from '../../services/Client/client.service';
import {AgencyService} from '../../services/Agency/agency.service';
import {MatDialog, MatDialogRef} from '@angular/material' 
import {DialogComponent} from './dialog.component';
import {Observable} from 'rxjs';
import {AuthenticationService} from '../../services/Authentication/authentication.service';

@Component({
  selector: 'app-sign',
  templateUrl: './sign.component.html',
  styleUrls: ['./sign.component.css']
})
export class SignComponent implements OnInit {
  // tslint:disable-next-line:max-line-length
  constructor(private route: ActivatedRoute,
              private clientService: ClientService,
              private agencyService: AgencyService,
              private formBuilder: FormBuilder,
              public dialog: MatDialog,
              private router: Router,
              ) {
  }
  dialogComponent: MatDialogRef<DialogComponent>;
  selected: number;
  selectedItem = 'Person';
  agency: Agency = new Agency();
  client: Client = new Client();
  signUpForm: FormGroup;
  signInForm: FormGroup;
  private isFieldExist = false;
  private isEmailFocused = false;
  private isUsernameFocused = false ;
  private isTaxRegistrationFocused = false;
  private auth: AuthenticationService;




  ngOnInit() {
    // choosing sign in or sign up depanding on button clicked in navbar
    this.route.paramMap.subscribe(params => {
      this.selected = Number(params.get('id'));
    });
    // form control sign Up
    this.signUpForm = this.formBuilder.group({
      firstName: [this.client.firstName, [Validators.required]],
      lastName: [this.client.lastName, [Validators.required]],
      userName: [this.client.username, [Validators.required,  Validators.minLength(4)]],
      taxRegistration: ['', [Validators.required]],
      agencyName: ['', [Validators.required]],
      email: [this.client.email, [Validators.required, Validators.email]],
      password: [this.client.password, [Validators.required, Validators.minLength(6)]],
      rePassword: ['', Validators.required]
    }, {
      validators: [ MustMatch('password', 'rePassword'), ]
    });
    // form control sign in
    this.signInForm = this.formBuilder.group({
      emailUsername: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  login(event) {
    event.preventDefault();
    const target = event.target ;
    const username = target.querySelector('#emailUsername').value;
    const password = target.querySelector('#password').value;
    this.auth.getUserDetails(username, password);
    console.log(username , password);




    // console.log('userComponent  ');
    // // @ts-ignore
    // return this.auth.login(user).subscribe(data => {
    //   const jwt = data.headers.get('Authorization');
    //   this.auth.saveToken(jwt) ;
    //   console.log( this.auth.isAuthentified());
    //   this.router.navigate(['']);
    // }, error => {
    // });
  }


  // signing up client or agency depanding on selected item
  register() {
    if (this.selectedItem === 'Person') {
      this.clientService.add(this.client).subscribe();
      this.dialogComponent = this.dialog.open(DialogComponent, {
        width: '350px',
        data : {firstName: this.client.firstName, lastName: this.client.lastName}
      });
    } else {
      this.agencyService.add(this.agency).subscribe();
      this.dialogComponent = this.dialog.open(DialogComponent, {
        width: '350px',
        data : {agencyName: this.agency.agencyName}
      });
    }
    this.signUpForm.reset();
    this.selected = 0;          // switch to sign in table
  }
  // choose between  agency or client input to send to existing method
  Existence(field: string) {
    if (this.selectedItem === 'Person') {
      if (field === 'username') {
        // tslint:disable-next-line:max-line-length
        this.Existing(this.client.username, this.clientService.findByUsername(this.client.username)); // send username of client and service method of client service to Existing method
        // tslint:disable-next-line:max-line-length
        this.Existing(this.client.username, this.agencyService.findByUsername(this.client.username)); // send username of client and service method of client service to Existing method
        this.isUsernameFocused = false;
      } else {
        this.Existing(this.client.email, this.clientService.findByEmail(this.client.email));          // send email of...
        this.Existing(this.client.email, this.agencyService.findByEmail(this.client.email));          // send email of...
        this.isEmailFocused = false;
      }
    } else {
        if (field === 'username') {
          // tslint:disable-next-line:max-line-length
          this.Existing(this.agency.username, this.agencyService.findByUsername(this.agency.username)); // send username of agency and  service method of agency service to Existing method
          // tslint:disable-next-line:max-line-length
          this.Existing(this.agency.username, this.clientService.findByUsername(this.agency.username)); // send username of agency and  service method of client service to Existing method
          this.isUsernameFocused = false;
        } else if (field === 'email') {
          this.Existing(this.agency.email, this.agencyService.findByEmail(this.agency.email)); // send email of ...
          this.Existing(this.agency.email, this.clientService.findByEmail(this.agency.email)); // send email of ...
          this.isEmailFocused = false;
        } else {
          // tslint:disable-next-line:max-line-length
          this.Existing(this.agency.taxRegistration, this.agencyService.findBytaxRegistration(this.agency.taxRegistration)); // send taxRegistration and his find method of agency service to Existing method
          this.isTaxRegistrationFocused = false;
          }
      }
  }

  // get the field of selected input and the method of service to ensure the right searching
Existing(field: string,  method: Observable<any> ) {
  if (field != null) {
        method.subscribe(
          data => data != null ? this.isFieldExist = true : this.isFieldExist = false
        );
        if (field === this.client.email || field === this.agency.email ) {
          this.isTaxRegistrationFocused = false;
          this.isUsernameFocused = false ;
        } else if (field === this.client.username || field === this.agency.username ) {
              this.isEmailFocused = false;
              this.isTaxRegistrationFocused = false;
              } else {
          this.isUsernameFocused = false;
          this.isEmailFocused = false;
        }
      }
    }
}

export function MustMatch(controlName: string, matchingControlName: string) {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];
    const matchingControl = formGroup.controls[matchingControlName];
    if (matchingControl.errors && !matchingControl.errors.mustMatch) {
      return;
    }
    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({ mustMatch: true });
    } else {
      matchingControl.setErrors(null);
    }
  };
}
