import {User} from './User';

export class Recipe {

  id: string;
  name: string;
  preparationTime: string;
  portion: string;
  description: string;
  category: string;
  userId: User;
  ingredients: any; // składnik, ilość

  constructor(id: string = null, name: string = null, preparationTime: string = null, portion: string = null, description: string = null,
              category: string = null, userId: User = null, ingredients: any = null) {
    this.id = id;
    this.name = name;
    this.preparationTime = preparationTime;
    this.portion = portion;
    this.description = description;
    this.category = category;
    this.userId = userId;
    this.ingredients = ingredients;
  }
}
