import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  // Data
  public user: any;
  public isLogged = false;

  constructor(
  ) { }

  public logIn(token: string): void {
    //this.cookie.set('Authorization', token);
    localStorage.setItem('Authorization', token);
    this.isLogged = true;
  }

  public getToken(): string {
    //return this.cookie.get('Authorization');
    return localStorage.getItem('Authorization');
  }

  public logOut(): void {
    //this.cookie.deleteAll();
    localStorage.clear();
    this.isLogged = false;
  }
}
