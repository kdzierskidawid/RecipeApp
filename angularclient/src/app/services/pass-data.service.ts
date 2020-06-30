import {Injectable, Output} from '@angular/core';
import {Recipe} from '../model/Recipe';
import {EventEmitter} from '@angular/core';
import {Photo} from '../model/Photo';


@Injectable({
  providedIn: 'root'
})
export class PassDataService {
  @Output()
  recipetoPass: EventEmitter<Recipe> = new EventEmitter<Recipe>();
  clickedRecipe: Recipe;

  clickedPhoto: string;
  public recipeDetails(recipe: Recipe, photo: string){
    console.log('Recipe details service: ' + recipe.name);
    console.log('Recipe photo: ' + this.clickedPhoto);
    this.clickedRecipe = recipe;
    this.recipetoPass.emit(recipe);
  }

}
