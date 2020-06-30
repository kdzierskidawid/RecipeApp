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
import {UserService} from './services/user.service';
import {AuthService} from './services/auth.service';
import {TokenStorage} from './services/token.storage';
import {Interceptor} from './services/inteceptor';
import { AddRecipeComponent } from './components/recipes/add-recipe/add-recipe.component';
import { PhotoUploadComponent } from './components/photo-upload/photo-upload.component';
import { InputFileConfig, InputFileModule } from 'ngx-input-file';
import { AllRecipesComponent } from './components/recipes/all-recipes/all-recipes.component';
import { RecipeDetailsComponent } from './components/recipes/recipe-details/recipe-details.component';
import { FooterComponent } from './components/footer/footer.component';
import { UserRecipesComponent } from './components/recipes/user-recipes/user-recipes.component';
import {ToastrModule} from 'ngx-toastr';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { ManageUsersComponent } from './components/admin-panel/manage-users/manage-users.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { ManageRolesComponent } from './components/admin-panel/manage-roles/manage-roles.component';
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
    ManageUsersComponent,
    SidenavComponent,
    ManageRolesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
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
