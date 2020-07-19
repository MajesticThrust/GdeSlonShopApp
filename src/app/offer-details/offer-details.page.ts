import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Offer, OffersService } from "../services/offers.service";
import { InAppBrowser } from "@ionic-native/in-app-browser/ngx";

@Component({
  selector: "app-offer-details",
  templateUrl: "./offer-details.page.html",
  styleUrls: ["./offer-details.page.scss"],
})
export class OfferDetailsPage implements OnInit {
  offer: Offer;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private offersService: OffersService,
    private iab: InAppBrowser
  ) {}

  ngOnInit() {
    const offerId = +this.route.snapshot.paramMap.get("offerId");

    const state = this.router.getCurrentNavigation().extras.state;
    if (state != null && state.offer != null) {
      this.offer = state.offer;
    } else {
      this.offersService
        .getOfferById(offerId)
        .subscribe((offer) => (this.offer = offer));
    }
  }

  onBuyClick() {
    this.iab.create(this.offer.url, "_system");
  }
}
