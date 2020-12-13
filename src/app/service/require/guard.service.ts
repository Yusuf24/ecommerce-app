import { Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';

@Injectable()
export class GuardService implements CanActivate {

  constructor(private auth: AuthService, private router: Router) { }

  canActivate(next, state:RouterStateSnapshot): Observable<boolean> {
    return this.auth.user$.pipe(
      take(1),
      map(user => !!user),
      tap(login => {
        if (!login) {
          console.log('access denied')
          this.router.navigate(['/login'] , {queryParams: {returnUrl: state.url}});
        }
      })
    );

  }
}