import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { UploadPhotoComponent } from './upload-photo/upload-photo.component';

const routes: Routes = [
  {path: '' , component:UploadPhotoComponent},
  {path: 'Login', component:LoginComponent},
  { path: 'login',   redirectTo: 'Login', pathMatch: 'full' },
  {path: '**', component:PageNotFoundComponent}
  //{ path: '**',   redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
