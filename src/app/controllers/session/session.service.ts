import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  // Data
  public isLogged = false;

  constructor() { }

  public getUserId() {
    return localStorage.getItem('userId');
  }

  public setUser(user: any): void {
    localStorage.setItem('userId', user.id);
    localStorage.setItem('User', JSON.stringify(user))
  }

  public getUser(): any {
    return JSON.parse(localStorage.getItem('User'));
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

  public setPreviousPage(url: string): void {
    localStorage.setItem('previousPage', url);
  }

  public getPreviousPage(): string {
    return localStorage.getItem('previousPage') || '/';
  }

  public logOut(): void {
    localStorage.clear();
    this.isLogged = false;
  }
}
