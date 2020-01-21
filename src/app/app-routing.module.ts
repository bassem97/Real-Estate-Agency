import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SignComponent} from './Components/sign/sign.component';
import {HomeComponent} from './Components/home/home.component';
import {ContactComponent} from './Components/contact/contact.component';


const routes: Routes = [
  {path: '' , component: HomeComponent},
  {path: 'sign/:id' , component: SignComponent},
  {path: 'contact' , component: ContactComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
