import { nanoid } from "nanoid";

export class Recipe {
  constructor(
    userId,
    user,
    name,
    short_descrption,
    time,
    ingredients,
    photo,
    description,
    keywords=[]
  ) {
    this.id = nanoid();
    this.userId = userId;
    this.user=user;
    this.name = name;
    this.short_descrption = short_descrption;
    this.time = time;
    this.ingredients = ingredients;
    this.photo = photo;
    this.description = description;
    this.keywords = keywords;
    this.shareDate = Date.now();
    this.lastModified = Date.now();
  }
}

