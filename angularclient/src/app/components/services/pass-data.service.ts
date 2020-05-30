import {Injectable, Output} from '@angular/core';
import {Recipe} from '../../model/Recipe';
import {EventEmitter} from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class PassDataService {
  @Output()
  recipetoPass: EventEmitter<Recipe> = new EventEmitter<Recipe>();
  clickedRecipe: Recipe;
  public recipeDetails(recipe: Recipe){
    console.log('Recipe details service: ' + recipe.name);
    this.clickedRecipe = recipe;
    this.recipetoPass.emit(recipe);
  }

}
