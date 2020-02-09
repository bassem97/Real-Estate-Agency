import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SignComponent} from './Components/sign/sign.component';
import {HomeComponent} from './Components/home/home.component';
import {ContactComponent} from './Components/contact/contact.component';
import {LocalDetailsComponent} from './Components/local-details/local-details.component';
import {AddLocalComponent} from './Components/add-local/add-local.component';
import {UserProfileComponent} from './Components/user-profile/user-profile.component';
import {AuthenticationGuard} from './guard/authentication.guard';
import {AgentsComponent} from './Components/agents/agents.component';
import {AboutComponent} from './Components/about/about.component';


const routes: Routes = [
  {path: '' , component: HomeComponent},
  {path: 'sign/:id' , component: SignComponent, canActivate: [AuthenticationGuard]},
  {path: 'contact' , component: ContactComponent},
  {path: 'localDetails/:id' , component: LocalDetailsComponent},
  {path: 'localAdd' , component: AddLocalComponent},
  {path: 'userProfile' , component: UserProfileComponent},
  {path: 'agents' , component: AgentsComponent},
  {path: 'about' , component: AboutComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
