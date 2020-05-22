import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../../model/User';
import {Recipe} from '../../model/Recipe';


@Injectable({
  providedIn: 'root'
})

export class RecipeService {

  private readonly recipeURL: string;


  constructor(private http: HttpClient) {
    this.recipeURL = 'http://localhost:8089/recipes/';
  }

  public save(recipe: Recipe) {
    console.log('recipe.service');
    return this.http.post<Recipe>(this.recipeURL + 'add', recipe);
  }
}
