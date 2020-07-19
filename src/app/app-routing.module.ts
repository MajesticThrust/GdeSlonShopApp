import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "./guards/auth.guard";

const routes: Routes = [
  {
    path: "",
    redirectTo: "offer-list",
    pathMatch: "full",
  },
  {
    path: "authenticate",
    loadChildren: () =>
      import("./authenticate/authenticate.module").then(
        (m) => m.AuthenticatePageModule
      ),
  },
  {
    path: "offer-list",
    loadChildren: () =>
      import("./offer-list/offer-list.module").then(
        (m) => m.OfferListPageModule
      ),
  },
  {
    path: "offer-details",
    loadChildren: () =>
      import("./offer-details/offer-details.module").then(
        (m) => m.OfferDetailsPageModule
      ),
  },
  {
    path: "account",
    loadChildren: () =>
      import("./account/account.module").then((m) => m.AccountPageModule),
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
