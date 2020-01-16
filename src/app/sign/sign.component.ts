import { Component, OnInit } from '@angular/core';
import {NavbarComponent} from '../navbar/navbar.component';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Agency} from '../Models/Agency';
import {Client} from '../Models/Client';
import {ClientService} from '../services/Client/client.service';

@Component({
  selector: 'app-sign',
  templateUrl: './sign.component.html',
  styleUrls: ['./sign.component.css']
})
export class SignComponent implements OnInit {
  selected: number;
  selectedItem = 'Person';
  agency: Agency = new Agency();
  client: Client = new Client();
  signUpForm: FormGroup;
  signInForm: FormGroup;
  isEmailExist = false;

  constructor(private route: ActivatedRoute, private clientService: ClientService, private formBuilder: FormBuilder) {
  }

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
    this.clientService.add(this.client).subscribe();
  }

  searchEmail() {
    // if (this.clientService.findByEmail(this.client.email).subscribe(data => console.log(data)) { this.isEmailExist = true; }
    this.clientService.findByEmail(this.client.email).subscribe(data => console.log(data)   );
    // if (this.isEmailExist) {console.log('exist'); }
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
