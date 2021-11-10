import { NgModule, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UploadPhotoComponent } from './upload-photo/upload-photo.component';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { NgbModule,NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule, HTTP_INTERCEPTORS  } from '@angular/common/http';
import { ConsultsService } from './services/consults.service';
import { DataArmComponent } from './data-arm/data-arm.component';
import { LoginService } from './services/login.service';
import { CookieService } from 'ngx-cookie-service';


@NgModule({
  declarations: [
    AppComponent,
    UploadPhotoComponent,
    LoginComponent,
    PageNotFoundComponent,
    DataArmComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatButtonModule,
    MatIconModule,
    NgbModule,
    NgbAlertModule,
    HttpClientModule
  ],
  providers: [
    
    ConsultsService,
    LoginService,
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
