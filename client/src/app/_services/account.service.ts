import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  baseUrl = 'https://localhost:5001/api/';
  private currentUserSource = new ReplaySubject<User>(1);
  currentUser$ = this.currentUserSource.asObservable();
  users: any;

  constructor(private http: HttpClient, private router: Router) {}

  public login(model: any): Observable<void> {
    console.log('model', model);
    return this.http.post(this.baseUrl + 'account/login', model).pipe(
      map((response: User) => {
        const user = response;
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
          this.currentUserSource.next(user);
        }
      })
    );
  }

  public setCurrentUser(user: User) {
    this.currentUserSource.next(user);
  }

  public logout() {
    localStorage.removeItem('user');
    this.currentUserSource.next(null);
    console.log('clicado em logout', this.currentUserSource);
    if (this.currentUserSource == null) {
      // this.router.navigateByUrl('/');
    }
  }

  public register(model: any) {
    return this.http.post(this.baseUrl + 'account/register', model).pipe(
      map((user: User) => {
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
          this.currentUserSource.next(user);
        }
      })
    );
  }
}
