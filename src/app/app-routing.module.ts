import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DataArmComponent } from './data-arm/data-arm.component';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthGuard } from "./services/auth.guard";


const routes: Routes = [
  {path: 'Login', component:LoginComponent},
  {path: 'Carga' , component:DataArmComponent, canActivate:[AuthGuard]},
  {path: '', redirectTo: '/Carga', pathMatch: 'full'},
  {path: '**', component:PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)], //RouterModule, 
  exports: [RouterModule]
})
export class AppRoutingModule { }
