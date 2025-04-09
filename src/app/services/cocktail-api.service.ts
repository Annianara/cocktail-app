import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {CocktailApiInfo, CocktailFullApiInfo} from "../interfaces/cocktail";


@Injectable({providedIn: 'root'})
export class CocktailApiService {
    constructor(private http: HttpClient) {
    }

    getCocktailsList(filters: { name: string }): Observable<{ drinks: CocktailApiInfo[] }> {
        return this.http.get<{
            drinks: CocktailApiInfo[]
        }>(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${filters.name}`);
    }

    getCocktail(id: number): Observable<{ drinks: CocktailFullApiInfo[] }> {
        return this.http.get<{
            drinks: CocktailFullApiInfo[]
        }>(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
    }

    getRandom(): Observable<{ drinks: CocktailFullApiInfo[] }> {
        return this.http.get<{
            drinks: CocktailFullApiInfo[]
        }>(`https://www.thecocktaildb.com/api/json/v1/1/random.php`);
    }

}
