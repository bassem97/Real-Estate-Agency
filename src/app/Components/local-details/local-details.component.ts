import {Component, Input, OnInit} from '@angular/core';
import {HomeComponent} from '../home/home.component';
import {Local} from '../../Models/Local';
import {ActivatedRoute} from '@angular/router';
import {LocalService} from '../../services/Local/local.service';

@Component({
  selector: 'app-local-details',
  templateUrl: './local-details.component.html',
  styleUrls: ['./local-details.component.css']
})
export class LocalDetailsComponent implements OnInit {
  local: Local = new Local();
  imagePath;
  constructor(private homeComponent: HomeComponent, private route: ActivatedRoute, private localService: LocalService ) { }

  slides = [
    {
      url: '../../../assets/images/about.jpg'
    },
    {
      url: '../../../assets/images/bg_1.jpg'
    }
  ];
  ngOnInit() {
    this.route.paramMap.subscribe(id => {
       this.localService.findById(Number(id.get('id'))).subscribe((local: Local ) => {
         this.local = local;
         this.imagePath = '../../../assets/images/' + local.fileName ;
         console.log(this.local);
       });
    });


  }

}
