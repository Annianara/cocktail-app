export interface CocktailApiInfo {
    idDrink: string;
    strDrink: string;
    strGlass: string;
    strDrinkThumb: string
}

export interface CocktailFullApiInfo extends CocktailApiInfo {
    [key: string]: string;
    strInstructions: string;
}

export interface Cocktail {
    id: string,
    name: string,
    glassType: string,
    imageUrl: string
}

export interface CocktailFullInfo extends Cocktail {
    ingredients: string[]
    instructions: string;
}
