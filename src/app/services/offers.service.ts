import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ReplaySubject } from "rxjs";
import { map, take } from "rxjs/operators";

interface OfferRaw {
  "@_id": number;
  picture: string | string[];
  thumb: string;
  name: string;
  description?: string;
  url: string;
  price: string;
  currencyId: string;
}

export interface Offer {
  id: number;
  name: string;
  description?: string;
  picture: string[];
  thumbnail: string;
  price: string;
  currency: string;
  url: string;
}

@Injectable({
  providedIn: "root",
})
export class OffersService {
  private allOffers$ = new ReplaySubject<Offer[]>(1);

  constructor(private http: HttpClient) {
    this.allOffers$.subscribe((offers) =>
      console.log("Total offers:", offers.length)
    );

    this.http
      .get<OfferRaw[]>("assets/offer_data/offers_subset.json")
      .subscribe((raws) =>
        this.allOffers$.next(
          raws
            .map(
              (r): Offer => ({
                id: r["@_id"],
                name: r.name,
                description: r.description,
                thumbnail: r.thumb != null ? "https://" + r.thumb : null,
                picture:
                  r.picture == null
                    ? null
                    : r.picture instanceof Array
                    ? r.picture
                    : [r.picture],
                url: r.url,
                currency: r.currencyId,
                price: r.price,
              })
            )
            .map((offer) => {
              offer.picture = offer.picture.map((p) => "https://" + p);
              return offer;
            })
          // .filter((offer) => offer.thumbnail != null)
        )
      );
  }

  public search(params: { offset: number; size: number; q?: string }) {
    return this.allOffers$.pipe(
      map((offers) =>
        offers.filter((o) => {
          if (params.q != null) {
            // TODO search in description as well
            return o.name.includes(params.q);
          } else {
            return true;
          }
        })
      ),
      map((offers) => offers.slice(params.offset, params.offset + params.size)),
      take(1)
    );
  }

  public getOfferById(offerId: number) {
    return this.allOffers$.pipe(
      map((offers) => offers.find((o) => o.id === offerId)),
      take(1)
    );
  }
}
