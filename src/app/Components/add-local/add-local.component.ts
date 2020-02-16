import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Local} from '../../Models/Local';
import {MatBottomSheet, MatBottomSheetRef} from '@angular/material';
import {Observable} from 'rxjs';
import {Http} from '@angular/http';
import {HttpClient} from '@angular/common/http';
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
  selectedFile: File = null;
  public imagePath;
  imgURL: any;
  public message: string;

  constructor(private formBuilder: FormBuilder, private localService: LocalService, private userService: UserService) {}

  ngOnInit() {
    this.local = new Local();
    this.firstFormGroup = this.formBuilder.group({
      TransactionType: [this.local.transactionType, Validators.required],
      Type: [this.local.type, Validators.required],


    });
    this.secondFormGroup = this.formBuilder.group({
      Area: [this.local.area, [ Validators.required, Validators.min(1)]],
      // RoomsNumber: [this.local.roomsNumber, [ Validators.required, Validators.min(1)]],
      Price: [this.local.price, [ Validators.required, Validators.min(1)]],
    });
    this.thirdFormGroup = this.formBuilder.group({
      Address: [this.local.address, [ Validators.required]],
      Description: [this.local.description, [ Validators.required]],
      image: ['', [ Validators.required]],
    });

  }


  addLocal() {
   this.userService.findUserWithToken().subscribe(user => {
     // @ts-ignore
     this.local.user = user;
     this.localService.fileUpload(this.selectedFile).subscribe( file => {
        this.local.filePath = file[0];
        this.local.fileName = file[1];
        this.localService.add(this.local).subscribe();
     });
   });

  }

  onSelectFile(files) {

    if (files.length === 0) {
      return;
    }

    const mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = 'Only images are supported.';
      return;
    } else {
      this.selectedFile = files[0] as File;
    }

    const reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (event) => {
      this.imgURL = reader.result;
    };
    // const formData = new FormData();
    // formData.append('image', this.selectedFile, this.selectedFile.name);
  }
}




