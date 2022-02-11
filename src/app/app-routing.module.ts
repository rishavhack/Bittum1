import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from "./login/login.component";
import { WelcomeComponent } from "./welcome/welcome.component";
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  { path: "login", component: LoginComponent },
  { path: "welcome", canActivate:[AuthGuard], component: WelcomeComponent },
  { path: "", redirectTo: "login", pathMatch: 'full' },
  { path: "**", redirectTo: "login", }
];


@NgModule({ 
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
