import {Routes} from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
    },
    {
        path: 'home',
        loadComponent: () => import('./pages/home/home.page').then(m => m.HomePage)
    },
    {
        path: 'cocktail/:id',
        loadComponent: () => import('./pages/cocktail-details/cocktail-details.page').then(m => m.CocktailDetailsPage)
    },

];
