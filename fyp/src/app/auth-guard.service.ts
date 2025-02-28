import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {CookieService} from  'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

  constructor(
    private tsr:ToastrService,
    private cookieservice:CookieService,
    private router:Router

  ) { }

  isLoggedIn():boolean{
    let cookies = this.cookieservice.getAll();
    console.log(cookies);
    return this.cookieservice.check('jwt');
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean{
    const isLoginorSignup=route.routeConfig ?.path ==='login' || route.routeConfig ?.path==='signup';

    if(this.isLoggedIn()){
      if(isLoginorSignup){
        this.tsr.error("Please logout to login/signup again!");
        this.router.navigate(['/home']);
        return false;
      }
      return true;
    }
    else{
      if(isLoginorSignup) return true;
    }

    this.router.navigate(['/login']);
    return false;
  }
}
