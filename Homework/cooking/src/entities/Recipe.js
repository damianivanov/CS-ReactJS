import { nanoid } from "nanoid";

export class Recipe {
  constructor(
    id = "",
    userId = "",
    user,
    name,
    short_description,
    time,
    ingredients,
    photo,
    description,
    keywords = [],
    shareDate = 0,
    lastModified = 0
  ) {
    this.id = id === "" ? nanoid() : id;
    this.userId = userId;
    this.user = user;
    this.name = name;
    this.short_description = short_description;
    this.time = time;
    this.ingredients = ingredients;
    this.photo = photo;
    this.description = description;
    this.keywords = keywords;
    this.shareDate = shareDate === 0 ? Date.now() : shareDate ;
    this.lastModified = lastModified === 0 ? Date.now() : lastModified;
  }
}
