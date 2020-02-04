import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SignComponent} from './Components/sign/sign.component';
import {HomeComponent} from './Components/home/home.component';
import {ContactComponent} from './Components/contact/contact.component';
import {LocalDetailsComponent} from './Components/local-details/local-details.component';
import {AddLocalComponent} from './Components/add-local/add-local.component';
import {UserProfileComponent} from './Components/user-profile/user-profile.component';


const routes: Routes = [
  {path: '' , component: HomeComponent},
  {path: 'sign/:id' , component: SignComponent},
  {path: 'contact' , component: ContactComponent},
  {path: 'localDetails' , component: LocalDetailsComponent},
  {path: 'localAdd' , component: AddLocalComponent},
  {path: 'userProfile' , component: UserProfileComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
