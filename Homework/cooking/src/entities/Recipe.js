import { nanoid } from "nanoid";

class Recipe {
  constructor(
    userId,
    name,
    short_descrption,
    time,
    ingredients,
    photo,
    description,
    keywords
  ) {
    this.id = nanoid();
    this.userId = userId;
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
async function (password) {
    try {
      return await bcrypt.compare(password, this.password)
    } catch (error) {
      throw error
    }
  }

}
module.exports = Recipe;
