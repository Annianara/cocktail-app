import {Component, OnDestroy, OnInit, ViewChild} from "@angular/core";
import {
  IonButton,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonContent,
  IonHeader, IonIcon,
  IonImg,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonModal,
  IonProgressBar,
  IonTitle,
  IonToolbar
} from "@ionic/angular/standalone";
import {Router} from "@angular/router";
import {CocktailApiService} from "../../services/cocktail-api.service";


import {Cocktail, CocktailApiInfo} from "../../interfaces/cocktail";
import {distinctUntilChanged, Subject, Subscription, switchMap} from "rxjs";
import {CocktailDetailsPage} from "../cocktail-details/cocktail-details.page";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonInput, IonHeader, IonToolbar, IonTitle, IonProgressBar, IonContent, IonModal, CocktailDetailsPage, IonList, IonItem, IonLabel, IonImg, IonCard, IonCardHeader, IonCardSubtitle, FormsModule, IonButton, IonIcon],
})
export class HomePage implements OnInit, OnDestroy {
  isReloading: any;
  @ViewChild(IonModal) modal!: IonModal;
  searchTerm$: Subject<string> = new Subject();
  searchQuery: string = '';
  cocktails: Cocktail[] = [];
  isChecked: boolean = false;
  isInitialized: boolean = false;
  private searchTermSubscription: Subscription = new Subscription();

  constructor(private cocktailApiService: CocktailApiService, private router: Router) {
  }

  ngOnInit() {
    this.searchTermSubscription = this.searchTerm$.pipe(
      distinctUntilChanged(),
      switchMap((term) => {
        this.isReloading = true
        return this.cocktailApiService.getCocktailsList({name: term});
      })
    ).subscribe((items) => {
      this.isChecked = true;
      this.isReloading = false;
      if (items.drinks) {
        this.isInitialized = true;
        const cocktails: Cocktail[] = []
        items.drinks.map((item: CocktailApiInfo) => {
          cocktails.push({
            id: item.idDrink,
            name: item.strDrink,
            glassType: item.strGlass,
            imageUrl: `${item.strDrinkThumb}/small`
          });
        });
        this.cocktails = cocktails;
      } else {
        this.isInitialized = false;
      }
    });
  }

  onSearch() {
    const query = this.searchQuery?.toLowerCase() || '';
    if (this.searchQuery && this.searchQuery.length >= 3) {
      this.searchTerm$.next(query);
    }
  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }


  navigate(id: string) {
    this.router.navigate(['../cocktail', id]);
  }

  ngOnDestroy() {
    this.searchTermSubscription.unsubscribe();
  }


}
