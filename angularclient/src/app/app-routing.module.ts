import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {WelcomeComponent} from './components/welcome/welcome.component';
import {SignUpComponent} from './components/sign-up/sign-up.component';
import {LoginComponent} from './components/login/login.component';
import {AddRecipeComponent} from './components/recipes/add-recipe/add-recipe.component';


const routes: Routes = [
  {
    path: 'welcome', component: WelcomeComponent,
  },
  {
    path: 'signup', component: SignUpComponent,
  },
  {
    path: 'login', component: LoginComponent,
  },
  {
    path: 'addrecipes', component: AddRecipeComponent,
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
