import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { DataArmComponent } from './data-arm/data-arm.component';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthGuard } from "./services/auth.guard";


const routes: Routes = [
  {path: 'Login', component:LoginComponent},
  {path: '' , component:DataArmComponent, canActivate:[AuthGuard]},
  {path: '**', component:PageNotFoundComponent, canActivate:[AuthGuard]}
];

@NgModule({
  imports: [RouterModule, RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
