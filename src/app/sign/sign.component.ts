import { Component, OnInit } from '@angular/core';
import {NavbarComponent} from '../navbar/navbar.component';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Agency} from '../Models/Agency';
import {Client} from '../Models/Client';

@Component({
  selector: 'app-sign',
  templateUrl: './sign.component.html',
  styleUrls: ['./sign.component.css']
})
export class SignComponent implements OnInit {
  selected: number;
  type = new FormControl('', Validators.required);
  selectedItem = 'Person';
  agency = new Agency();
  client = new Client();
  signUpForm: FormGroup;

  constructor(private route: ActivatedRoute, private formBuilder: FormBuilder) { }

  ngOnInit() {
    // choosing sign in or sign up depanding on button clicked in navbar
    this.route.paramMap.subscribe(params => {
      this.selected = Number(params.get('id'));
    });
    // form control
    this.signUpForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      userName: ['', [Validators.required]],
      taxRegistration: ['', [Validators.required]],
      agencyName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6) ]],
      rePassword: ['', Validators.required] }, {
      validator: MustMatch('password', 'rePassword')
    });

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
