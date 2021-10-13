import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { DataArmComponent } from './data-arm/data-arm.component';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  {path: '' , component:DataArmComponent},
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
