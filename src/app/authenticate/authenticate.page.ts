import { Component, OnInit, ViewChild } from "@angular/core";
import { AuthService } from "../services/auth.service";
import { Router, ActivatedRoute, UrlSegment } from "@angular/router";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-authenticate",
  templateUrl: "./authenticate.page.html",
  styleUrls: ["./authenticate.page.scss"],
})
export class AuthenticatePage implements OnInit {
  private redirectTo = ["/", "account"];

  public username: string;
  public password: string;

  @ViewChild("loginForm") ngForm: NgForm;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    const nav = this.router.getCurrentNavigation();
    const state = nav.extras.state;

    if (state != null && state.redirectTo != null) {
      const urlSegments: UrlSegment[] = state.redirectTo;
      this.redirectTo = urlSegments.map((s) => s.path);
    }

    console.log("Will redirect to", this.redirectTo, "on login");
  }

  onSubmit() {
    if (this.ngForm.form.invalid) {
      this.ngForm.form.markAsTouched();
      return;
    }

    this.authService.login(this.username, this.password);
    // TODO params
    this.router.navigate(this.redirectTo, { replaceUrl: true });
  }
}
