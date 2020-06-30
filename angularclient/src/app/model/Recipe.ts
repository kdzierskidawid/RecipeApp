import {User} from './User';
import {Photo} from './Photo';

export class Recipe {

  id: string;
  name: string;
  preparationTime: string;
  portion: string;
  description: string;
  category: string;
  userId: string;
  ingredients: any; // składnik, ilość
  photo: string;
  gallery: string[];

  constructor(id: string = null, name: string = null, preparationTime: string = null, portion: string = null, description: string = null,
              category: string = null, userId: string = null, ingredients: any = null, photo: string = null, gallery: string[] = null) {
    this.id = id;
    this.name = name;
    this.preparationTime = preparationTime;
    this.portion = portion;
    this.description = description;
    this.category = category;
    this.userId = userId;
    this.ingredients = ingredients;
    this.photo = photo;
    this.gallery = gallery;
  }
}
