import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

export interface User {
  name: string;
}

/** Auth mockup */
@Injectable({
  providedIn: "root",
})
export class AuthService {
  private _authenticated$ = new BehaviorSubject<boolean>(false);
  public authenticated$ = this._authenticated$.asObservable();
  public get isAuthenticated() {
    return this._authenticated$.getValue();
  }

  private _currentUser$ = new BehaviorSubject<User>(null);
  public currentUser$ = this._currentUser$.asObservable();
  public get currentUser() {
    return this._currentUser$.getValue();
  }

  constructor() {}

  public login(username: string, password: string) {
    this._authenticated$.next(true);
    this._currentUser$.next({ name: username });
    console.log("User logged in! Current user:", this.currentUser);
  }

  public logout() {
    this._authenticated$.next(false);
    this._currentUser$.next(null);
    console.log("User logged out!");
  }
}
