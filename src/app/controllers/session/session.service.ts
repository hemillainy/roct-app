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

  public getUserId(){
    return this.user.id;
  }

  public logIn(token: string): void {
    //this.cookie.set('Authorization', token);
    localStorage.setItem('Authorization', token);
    this.isLogged = true;
  }

  public getToken(): string {
    return "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.     eyJpYXQiOjE2MDQwOTE2MDIsIm5iZiI6MTYwNDA5MTYwMiwianRpIjoiYmM4MTFhNzMtN2U1Yy00M2NmLWI0ZWEtYmVmYjQ4ZGQxY2EyIiwiZXhwIjoxNjA0MDkyNTAyLCJpZGVudGl0eSI6e30sImZyZXNoIjpmYWxzZSwidHlwZSI6ImFjY2VzcyJ9.1XXcquwHJZ0xYOai2NC0NVPA9vMzPM2W4MYct-CdM50";
    //return this.cookie.get('Authorization');
    //return localStorage.getItem('Authorization');
  }

  public logOut(): void {
    //this.cookie.deleteAll();
    localStorage.clear();
    this.isLogged = false;
  }
}
