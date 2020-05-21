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
import { RecipesComponent } from './components/recipes/recipes.component';
import { AddRecipeComponent } from './components/recipes/add-recipe/add-recipe.component';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    WelcomeComponent,
    SignUpComponent,
    LoginComponent,
    RecipesComponent,
    AddRecipeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,
  ],
  providers: [UserService, AuthService, TokenStorage, TokenStorage, WelcomeComponent,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: Interceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
