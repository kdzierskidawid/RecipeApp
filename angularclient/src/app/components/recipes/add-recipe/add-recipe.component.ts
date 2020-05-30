import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Recipe} from '../../../model/Recipe';
import {map} from 'rxjs/operators';
import {RecipeService} from '../../services/recipe.service';
import {PhotoUploadComponent} from '../../photo-upload/photo-upload.component';
import {Photo} from '../../../model/Photo';
import {PhotoService} from '../../services/photo.service';
import {InputFileComponent} from 'ngx-input-file';
import {async} from 'rxjs/internal/scheduler/async';
import {__await} from 'tslib';
import {PassDataService} from '../../services/pass-data.service';

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.css']
})
export class AddRecipeComponent implements OnInit {

  recipe: Recipe = new Recipe(null, null, null, null, null, null, null, null, null);

  constructor(private recipeService: RecipeService, private photoService: PhotoService, private passDataService: PassDataService) {
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
  photo: Photo;
  mapSelected = false;
  mapName: string;
  success = false;
  error = false;
  public imageURL = '';
  public image: Photo;
  public clickedRecipeid: string;
  /*select*/
  selectedPortion: string;
  selectedPreparationTime: string;
  tempMap: any;

  recipes: Recipe[] = [];

  ngOnInit(): void {
    this.recipe.ingredients = new Map();
    this.checkAllRecipes();
    if(this.passDataService.clickedRecipe){
      //console.log("Jest: " + this.passDataService.clickedRecipe);
      this.name = this.passDataService.clickedRecipe.name;
      this.category = this.passDataService.clickedRecipe.category;
      this.description = this.passDataService.clickedRecipe.description;
      this.preparationTime = this.passDataService.clickedRecipe.preparationTime;
      this.portion = this.passDataService.clickedRecipe.portion;
      this.clickedRecipeid = this.passDataService.clickedRecipe.id;
      this.map = this.passDataService.clickedRecipe.ingredients;
      for (let [key, value] of Object.entries(this.map)) {
        this.recipe.ingredients.set(key, value);
        //console.log(''+key + ' ' + value);
      }
      console.log(this.recipe.ingredients);

      /*    const convMap = {};
    this.map.forEach((val: string, key: string) => {
      convMap[key] = val;
    });
    this.recipe.ingredients = convMap;*/
      /*this.map = this.passDataService.clickedRecipe.ingredients;
      this.recipe.ingredients =  this.map;*/
      this.photo = this.passDataService.clickedRecipe.photo;
      console.log("id: " + this.passDataService.clickedRecipe.id);
      this.passDataService.clickedRecipe = new Recipe(null, null, null, null,
        null, null, null, null, null);
    }
    else{
      //console.log("Nie ma: ");
    }

  }

  @ViewChild('mapInput', {static: false})
  public mapInputComponent: InputFileComponent;

  addIngredient() {
    this.recipe.ingredients.set(this.nameIngredient, this.amount);

    this.map = this.recipe.ingredients;
    this.nameIngredient = null;
    this.amount = null;

  }

  selectPortion(id: string) {
    this.selectedPortion = id;
  }

  selectPreparationTime(id: string) {
    this.selectedPreparationTime = id;
  }

  addRecipe(){
    console.log('xd: ' + this.tempMap);

    this.recipe.name = this.name;
    this.recipe.category = this.category;
    this.recipe.preparationTime = this.preparationTime;
    this.recipe.description = this.description;
    this.recipe.portion = this.selectedPortion;
    this.recipe.preparationTime = this.selectedPreparationTime;
    this.mapName = 'test';

  /*  this.photoService.save(this.mapName, this.mapInputComponent.files[0].file).subscribe(
      data => {
        this.success = true;
        this.image = data;

        console.log("W pętli: " + this.image.mapImage);
        console.log("Obraz" + this.image.mapImage);
        this.recipe.photo = this.image;
        console.log('Mapa dodana pomyślnie' + this.recipe.photo);


        this.recipe.photo = this.image;
        console.log(this.image.mapImage.toString());
        console.log(this.image.mapImage.toString());
        const convMap = {};
        this.map.forEach((val: string, key: string) => {
          convMap[key] = val;
        });
        this.recipe.ingredients = convMap;
        console.log(this.recipe);

        //console.log("Z innego komponentu: " + this.photoService.submitFiles());
        //this.recipe.photo = this.photoService.mapInputComponent.files[0].file;

      },
      error => {
        console.log('Bląd podczas dodawania mapy' + error.message);
        this.error = true;
      });
*/
    const convMap = {};
    this.map.forEach((val: string, key: string) => {
      convMap[key] = val;
    });
    this.recipe.ingredients = convMap;
    this.recipe.id = this.clickedRecipeid;
    this.recipeService.save(this.recipe).subscribe(
      result => {
        console.log(this.recipes);
        console.log("Check if exists: " + this.clickedRecipeid);
        this.recipe.id = this.clickedRecipeid;
        if (this.checkIfRecipeExists(this.recipe.id)) {
          this.recipes[this.recipes.findIndex(item => item.id == result.id)] = result;
        } else {
          console.log('Response' + result.id);
        }
        this.recipe = new Recipe(null, null, null, null, null, null, null, null,
          null);
        console.log("Dodano lub edytowano pomyślnie " + result.id);
      },
      error => {
        console.log("Wystąpił bład podczas dodawania lub edycji");
      }
    );
    this.recipes = [];
  }

  checkIfRecipeExists(id: string) {
    return this.recipes.some(item => item.id == id);
  }


  public checkAllRecipes(){
      this.recipeService.getRecipes().subscribe(all=>{
        all.forEach(recipe=>{
          this.recipes.push(recipe);
        });
      });

  }


  public addfoto(){

  }

  public deleteIngredient(key: string){
    this.map.delete(key);
    console.log(this.map);
  }

  public editIngredient(key: string){
    this.nameIngredient = key;
    this.amount = this.map.get(key);
  }
}
