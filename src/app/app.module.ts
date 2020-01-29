import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {
  MatButtonModule,
  MatCardModule, MatCheckboxModule, MatDialogModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule, MatOptionModule, MatSelectModule,
  MatSliderModule,
  MatTabsModule
} from '@angular/material';
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
//

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
  ],
  entryComponents: [DialogComponent],
  providers: [HttpClientModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
