import { Component, OnInit } from '@angular/core';
import {NavbarComponent} from '../navbar/navbar.component';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Agency} from '../Models/Agency';
import {Client} from '../Models/Client';
import {ClientService} from '../services/Client/client.service';
import {AgencyService} from '../services/Agency/agency.service';
import {MatDialog, MatDialogRef} from '@angular/material';
import {DialogComponent} from './dialog.component';

@Component({
  selector: 'app-sign',
  templateUrl: './sign.component.html',
  styleUrls: ['./sign.component.css']
})
export class SignComponent implements OnInit {
  dialogComponent: MatDialogRef<DialogComponent>;


  constructor(private route: ActivatedRoute, private clientService: ClientService, private agencyService: AgencyService, private formBuilder: FormBuilder, public dialog: MatDialog) {
  }
  selected: number;
  selectedItem = 'Person';
  agency: Agency = new Agency();
  client: Client = new Client();
  signUpForm: FormGroup;
  signInForm: FormGroup;
  private isEmailExist = false;
  private data: any;

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
      validator: MustMatch('password', 'rePassword')
    });
    // form control sign in
    this.signInForm = this.formBuilder.group({
      emailUsername: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

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
  }

  searchEmail() {
    // tslint:disable-next-line:prefer-const

    if (this.client.email != null) {
    this.clientService.findByEmail(this.client.email).subscribe(
      data => { this.data = data ;  }
      ) ;
    }

    this.data != null ? this.isEmailExist = true : this.isEmailExist = false;
    console.log(this.isEmailExist);
    console.log(this.data);
    // if (this.isEmailExist) {console.log('exist'); }
  }


  changeSelection() {

  }


}

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
