import {Component, OnInit} from '@angular/core';
import {Recipe} from '../../../model/Recipe';
import {map} from 'rxjs/operators';
import {RecipeService} from '../../services/recipe.service';

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.css']
})
export class AddRecipeComponent implements OnInit {

  recipe: Recipe = new Recipe(null, null, null, null, null, null, null, null);

  constructor(private recipeService: RecipeService) {
  }

  /*nGModel*/
  nameIngredient: string;
  amount: string;
  name: string;
  category: string;
  portion: string;
  preparationTime: string;
  description: string;

  map = new Map();

  /*select*/
  selectedPortion: string;
  selectedPreparationTime: string;

  ngOnInit(): void {
    this.recipe.ingredients = new Map();
  }


  addIngredient() {
    this.recipe.ingredients.set(this.nameIngredient, this.amount);
    this.map = this.recipe.ingredients;

  }

  selectPortion(id: string) {
    this.selectedPortion = id;
    console.log('Kliknięta porcja: ' + this.selectedPortion);
  }

  selectPreparationTime(id: string) {
    this.selectedPreparationTime = id;
    console.log('Kliknięty czas przygotowania: ' + this.selectedPortion);
  }

  addRecipe(){


    this.recipe.name = this.name;
    this.recipe.category = this.category;
    this.recipe.preparationTime = this.preparationTime;
    this.recipe.description = this.description;
    this.recipe.portion = this.selectedPortion;
    this.recipe.preparationTime = this.selectedPreparationTime;
    const convMap = {};
    this.map.forEach((val: string, key: string) => {
      convMap[key] = val;
    });
    this.recipe.ingredients = convMap;
    console.log(this.recipe);
    this.recipeService.save(this.recipe).subscribe(
      result => {
        console.log('Response' + result);
      },
      error => console.log('Error' + error));
  }
}
