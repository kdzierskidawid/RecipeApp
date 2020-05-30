import {User} from './User';
import {Photo} from './Photo';

export class Recipe {

  id: string;
  name: string;
  preparationTime: string;
  portion: string;
  description: string;
  category: string;
  userId: User;
  ingredients: any; // składnik, ilość
  photo: Photo;

  constructor(id: string = null, name: string = null, preparationTime: string = null, portion: string = null, description: string = null,
              category: string = null, userId: User = null, ingredients: any = null, photo: Photo = null) {
    this.id = id;
    this.name = name;
    this.preparationTime = preparationTime;
    this.portion = portion;
    this.description = description;
    this.category = category;
    this.userId = userId;
    this.ingredients = ingredients;
    this.photo = photo;
  }
}
