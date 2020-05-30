import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { LoginComponent } from './components/login/login.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {UserService} from './components/services/user.service';
import {AuthService} from './components/services/auth.service';
import {TokenStorage} from './components/services/token.storage';
import {Interceptor} from './components/services/inteceptor';
import { AddRecipeComponent } from './components/recipes/add-recipe/add-recipe.component';
import { PhotoUploadComponent } from './components/photo-upload/photo-upload.component';
import { InputFileConfig, InputFileModule } from 'ngx-input-file';
import { AllRecipesComponent } from './components/recipes/all-recipes/all-recipes.component';
import { RecipeDetailsComponent } from './components/recipes/recipe-details/recipe-details.component';
import { FooterComponent } from './components/footer/footer.component';
import { UserRecipesComponent } from './components/recipes/user-recipes/user-recipes.component';

const config: InputFileConfig = {
  fileAccept: '*',
  fileLimit: 4
};



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    WelcomeComponent,
    SignUpComponent,
    LoginComponent,
    AddRecipeComponent,
    PhotoUploadComponent,
    AllRecipesComponent,
    RecipeDetailsComponent,
    FooterComponent,
    UserRecipesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    InputFileModule.forRoot(config),
    AppRoutingModule,
  ],
  providers: [UserService, AuthService, TokenStorage, TokenStorage, WelcomeComponent, PhotoUploadComponent,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: Interceptor,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
