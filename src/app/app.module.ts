import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {
  _MatMenuDirectivesModule,
  MatButtonModule, MatButtonToggleModule,
  MatCardModule, MatCheckboxModule, MatDialogModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule, MatMenuModule, MatOptionModule, MatSelectModule,
  MatSliderModule, MatSnackBarModule, MatStepperModule, MatTableModule,
  MatTabsModule, MatTooltipModule
} from '@angular/material';
import {MatSnackBar} from '@angular/material/snack-bar';
import { HomeComponent } from './Components/home/home.component';
import { SignComponent } from './Components/sign/sign.component';
import { AboutComponent } from './Components/about/about.component';
import { ContactComponent } from './Components/contact/contact.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatPasswordStrengthModule} from '@angular-material-extensions/password-strength';
import { FooterComponent } from './Components/footer/footer.component';
import {HttpClientModule} from '@angular/common/http';
import {DialogComponent} from './Components/sign/dialog.component';
import { NewsletterComponent } from './Components/newsletter/newsletter.component';
import { DisplayLocalsComponent } from './Components/home/display-locals/display-locals.component';
import {FilterPipe} from './Components/home/filterPipe';
import { LocalDetailsComponent } from './Components/local-details/local-details.component';
import {AddLocalComponent} from './Components/add-local/add-local.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { UserProfileComponent } from './Components/user-profile/user-profile.component';
import {MatCarouselModule} from '@ngmodule/material-carousel';
import {UiCarouselModule} from 'ngx-ui-carousel';
import {AuthenticationGuard} from './guard/authentication.guard';
import {AgentsComponent} from './Components/agents/agents.component';
import {CarouselDirective} from './Components/home/carousel.directive';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    SignComponent,
    AboutComponent,
    ContactComponent,
    FooterComponent,
    DialogComponent,
    NewsletterComponent,
    DisplayLocalsComponent,
    FilterPipe,
    LocalDetailsComponent,
    AddLocalComponent,
    UserProfileComponent,
    AgentsComponent,
    CarouselDirective


  ],
  imports: [
    MatSliderModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatTabsModule,
    FormsModule,
    MatCheckboxModule,
    MatPasswordStrengthModule,
    MatOptionModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatDialogModule,
    FormsModule,
    MatTableModule,
    _MatMenuDirectivesModule,
    MatMenuModule,
    MatStepperModule,
    MatButtonToggleModule,
    DragDropModule,
    MatCarouselModule,
    UiCarouselModule,
    MatTooltipModule,
    MatSnackBarModule
  ],
  entryComponents: [DialogComponent],
  providers: [HttpClientModule, NavbarComponent, HomeComponent, AuthenticationGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
