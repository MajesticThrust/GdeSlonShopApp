import { Component, OnInit } from "@angular/core";
import { OffersService, Offer } from "../services/offers.service";
import { BehaviorSubject } from "rxjs";
import { Router } from "@angular/router";

@Component({
  selector: "app-offer-list",
  templateUrl: "./offer-list.page.html",
  styleUrls: ["./offer-list.page.scss"],
})
export class OfferListPage implements OnInit {
  private pageSize = 25;
  private currentOffset = 0;

  public offers$ = new BehaviorSubject<Offer[]>([]);

  constructor(private offersService: OffersService, private router: Router) {
    this.offers$.subscribe((offers) =>
      console.log("Currently loaded offers:", offers)
    );
  }

  ngOnInit() {
    this.loadMoreOffers(this.currentOffset);
  }

  async loadMoreOffers(offset: number) {
    const offers = await this.offersService
      .search({ offset, size: this.pageSize })
      .toPromise();

    console.log("Loaded more offers:", offers);
    const currentOffers = this.offers$.getValue();
    this.offers$.next([...currentOffers, ...offers]);
  }

  offerTrackBy(i: number, offer: Offer) {
    return offer.id;
  }

  async onInfScroll(event) {
    console.log("Infinite scroll triggered");

    this.currentOffset += this.pageSize;
    this.loadMoreOffers(this.currentOffset);
    event.target.complete();
  }

  onOfferClick(offer: Offer) {
    this.router.navigate(["/", "offer-details", offer.id], {
      state: {
        offer,
      },
    });
  }
}
