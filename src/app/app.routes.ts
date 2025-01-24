import { Routes } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { loggedGuard } from './logged.guard';
import { SignupPageComponent } from './signup-page/signup-page.component';
export const routes: Routes = [
    {path:"login", component: LoginPageComponent},
    {path:"signUp", component: SignupPageComponent},
    {path:"", component: HomePageComponent, canActivate:[loggedGuard]}] ;

