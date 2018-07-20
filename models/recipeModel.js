class RecipeModel {
  static format(recipeArr) {
    let recipeAttrs = recipeArr.map(recipe => {
      return {"name": recipe.recipeName, "url": `http://www.yummly.co/recipe/${recipe.id}`}
    })
  return { "recipes": recipeAttrs }
  }
}

module.exports = RecipeModel;
