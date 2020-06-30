import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../model/User';
import {Recipe} from '../model/Recipe';
import {Observable} from 'rxjs';


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

  public getRecipe(id: string): Observable<Recipe> {
    return this.http.get<Recipe>(this.recipeURL + id, {responseType: 'json'});
  }

  public getRecipeByName(name: string): Observable<Recipe> {
    return this.http.get<Recipe>(this.recipeURL + 'name/' + name, {responseType: 'json'});
  }

  public getRecipes(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(this.recipeURL + 'all', {responseType: 'json'});
  }

  public delete(recipe: Recipe) {
    const httpOptions = {body: recipe, responseType: 'text' as 'json'};
    return this.http.delete(this.recipeURL + 'delete', httpOptions);
  }
}
