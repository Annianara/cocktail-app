import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {CocktailApiService} from "../../services/cocktail-api.service";
import {ActivatedRoute} from "@angular/router";
import {CocktailFullApiInfo, CocktailFullInfo} from "../../interfaces/cocktail";
import {
  IonBackButton, IonButton,
  IonButtons,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonChip,
  IonContent,
  IonHeader,
  IonIcon,
  IonImg,
  IonItem,
  IonLabel,
  IonList,
  IonProgressBar,
  IonSkeletonText,
  IonTitle,
  IonToolbar
} from "@ionic/angular/standalone";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-cocktail-details',
  templateUrl: './cocktail-details.page.html',
  styleUrls: ['./cocktail-details.page.scss'],
  standalone: true,
  imports: [IonCard, IonCardHeader, IonCardSubtitle, IonList, IonItem, IonIcon, IonLabel, IonChip, IonImg, IonSkeletonText, IonContent, IonProgressBar, IonTitle, IonBackButton, IonButtons, IonToolbar, IonHeader, IonButton],
})
export class CocktailDetailsPage implements OnInit, OnDestroy {
  @Input() isRandomCocktail = false;
  @Output() cancelWasClicked = new EventEmitter<boolean>();
  private routeSubscription: Subscription = new Subscription();

  cocktailInfo: CocktailFullInfo = {id: '', name: '', ingredients: [], instructions: '', glassType: '', imageUrl: ''}
  isReloading: boolean = false;
  isInitialized: boolean = false;
  isChecked: boolean = false;
  imgLoading: boolean = true;

  constructor(private cocktailService: CocktailApiService, private route: ActivatedRoute) {
  }

  handleResult(cocktails: { drinks: CocktailFullApiInfo[] }) {
    this.isReloading = false;
    this.isChecked = true;
    if (cocktails.drinks) {
      this.isInitialized = true;
      const ingredients: string[] = [];
      Object.keys(cocktails.drinks[0]).filter(key => key.startsWith('strIngredient')).map(key => {
          if (cocktails.drinks[0][key]) {
            ingredients.push(cocktails.drinks[0][key])
          }
          return true;
        }
      );
      this.cocktailInfo = {
        id: cocktails.drinks[0].idDrink,
        name: cocktails.drinks[0].strDrink,
        imageUrl: `${cocktails.drinks[0].strDrinkThumb}/medium`,
        glassType: cocktails.drinks[0].strGlass,
        instructions: cocktails.drinks[0].strInstructions,
        ingredients: ingredients
      }
    } else {
      this.isInitialized = false;
    }
  }

  cancel() {
    this.cancelWasClicked.emit(true);
  }

  ngOnInit() {
    if (this.isRandomCocktail) {
      this.isReloading = true;
      this.cocktailService.getRandom().subscribe(cocktails => {
        this.handleResult(cocktails);
      });
    } else {
      this.routeSubscription = this.route.params.subscribe(params => {
        if (params['id']) {
          this.isReloading = true;
          this.cocktailService.getCocktail(params['id']).subscribe(cocktails => {
            this.handleResult(cocktails);
          });
        }
      });
    }
  }

  ngOnDestroy() {
    this.routeSubscription.unsubscribe();
  }

}
