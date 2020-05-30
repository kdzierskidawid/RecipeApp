import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {WelcomeComponent} from './components/welcome/welcome.component';
import {SignUpComponent} from './components/sign-up/sign-up.component';
import {LoginComponent} from './components/login/login.component';
import {AddRecipeComponent} from './components/recipes/add-recipe/add-recipe.component';
import {PhotoUploadComponent} from './components/photo-upload/photo-upload.component';
import {AllRecipesComponent} from './components/recipes/all-recipes/all-recipes.component';
import {RecipeDetailsComponent} from './components/recipes/recipe-details/recipe-details.component';
import {UserRecipesComponent} from './components/recipes/user-recipes/user-recipes.component';


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
  },
  {
    path: 'photoupload', component: PhotoUploadComponent
  },
  {
    path: 'allrecipes', component: AllRecipesComponent
  },
  {
    path: 'recipe-details', component: RecipeDetailsComponent
  },  {
    path: 'app-user-recipes', component: UserRecipesComponent
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
