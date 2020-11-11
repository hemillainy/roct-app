import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  // Data
  public user: any;
  public isLogged = false;

  constructor() { }

  public getUserId() {
    return this.user.id;
  }

  public setUser(user: any): void {
    this.user = user;
  }

  public clearUser(): void {
    this.user = undefined;
  }

  public setToken(token: string): void {
    localStorage.setItem('Authorization', token);
  }

  public logIn(token: string): void {
    localStorage.setItem('Authorization', token);
    this.isLogged = true;
  }

  public getToken(): string {
    return localStorage.getItem('Authorization');
  }

  public logOut(): void {
    localStorage.clear();
    this.clearUser();
    this.isLogged = false;
  }
}
