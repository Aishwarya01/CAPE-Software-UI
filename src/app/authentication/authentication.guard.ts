import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginserviceService } from '../services/loginservice.service';
import { LoginBuyMeterService } from '../services/login-buy-meter.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {
  constructor(
    private router: Router,
    private loginservice: LoginserviceService,
    private loginBuyMeterservice: LoginBuyMeterService
  ) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (this.loginservice.isUserLoggedIn())
      return true;

    this.router.navigate(['login']);
    return false;
  }
  
  canActivate1(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  if(this.loginBuyMeterservice.isUserLoggedInBuyMeter())
    return true;

    this.router.navigate(['signIn-buyMeter']);
    return false;
  
  }
}
