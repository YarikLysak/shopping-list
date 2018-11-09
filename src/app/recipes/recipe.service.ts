import { Injectable } from '../../../node_modules/@angular/core';

import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';

@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();

  private recipes: Recipe[] = [
    new Recipe(
      'Fettuccine with Olive Oil',
      'Italian super great Fettuchini',
      'https://imagesvc.timeincapp.com/v3/mm/image?url=https%3A%2F%2Fcdn-image.myrecipes.com%2Fsites%2Fdefault%2Ffiles%2Fstyles%2Fmedium_2x%2Fpublic%2Fimage%2Frecipes%2Fck%2F11%2F04%2Ffettuccine-olive-oil-ck-x.jpg%3Fitok%3Dbt5Cny7R&w=800&q=85',
      [
        new Ingredient('Fettuccine', 35),
        new Ingredient('Olive Oil', 1),
        new Ingredient('Garlic', 1)
      ]
    ),
    new Recipe(
      'Easy Pizza',
      'Italian easy pizza',
      'https://img.bestrecipes.com.au/rZFo7F8i/h300-w400-cscale-1495077669/br-api/asset/20771/super-easy-pizza-dough-recipe.jpg',
      [
        new Ingredient('Dough', 1),
        new Ingredient('Sauce', 1),
        new Ingredient('Sausages', 10)
      ]
    )
  ];
  constructor(private slService: ShoppingListService) {}

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  addIngredienceToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
}
