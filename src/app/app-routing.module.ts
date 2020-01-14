import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SignComponent} from './sign/sign.component';
import {HomeComponent} from './home/home.component';


const routes: Routes = [
  {path: '' , component: HomeComponent},
  {path: 'sign/:id' , component: SignComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
