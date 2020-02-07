import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Local} from '../../Models/Local';
import {MatBottomSheet, MatBottomSheetRef} from '@angular/material';
import {Observable} from 'rxjs';
import {Http} from '@angular/http';
import {HttpClient} from '@angular/common/http';
import {ImageService} from '../../services/image.service';
import {LocalService} from '../../services/Local/local.service';
import {UserService} from '../../services/User/user.service';

class ImageSnippet {
  constructor(public src: string, public file: File) {}
}
@Component({
  selector: 'app-add-local',
  templateUrl: './add-local.component.html',
  styleUrls: ['./add-local.component.css']
})

export class AddLocalComponent implements OnInit {

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  local: Local;
  thirdFormGroup: FormGroup;
  selectedFile: ImageSnippet;

  constructor(private formBuilder: FormBuilder, private imageService: ImageService, private localService: LocalService, private userService: UserService) {}

  ngOnInit() {
    this.local = new Local();
    this.firstFormGroup = this.formBuilder.group({
      TransactionType: [this.local.transactionType, Validators.required],
      Type: [this.local.type, Validators.required],


    });
    this.secondFormGroup = this.formBuilder.group({
      Area: [this.local.area, [ Validators.required, Validators.min(1)]],
      RoomsNumber: [this.local.roomsNumber, [ Validators.required, Validators.min(1)]],
      Price: [this.local.price, [ Validators.required, Validators.min(1)]],
    });
    this.thirdFormGroup = this.formBuilder.group({
      Address: [this.local.address, [ Validators.required]],
      Description: [this.local.description, [ Validators.required]],
    });

  }


  addLocal() {
   this.userService.findUserWithToken().subscribe(user => {
     // @ts-ignore
     this.local.user = user;
     this.localService.add(this.local).subscribe();
   });

  }

  onSelectFile(event) {
    const file =  event.target.files;
  }
}




