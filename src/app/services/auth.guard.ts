import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';
import { take,map} from 'rxjs/operators'
import { Router } from "@angular/router";


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
	constructor(
		private router: Router,
		private authService:AuthenticationService){

	}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authService.user.pipe(take(1),
    	map(user=>{
    		let isLocal= JSON.parse(sessionStorage.getItem("token")); 
    		if(user || isLocal){
    			return true
    		}

    		return  this.router.createUrlTree(['login'])
    	}))
  }
  
}
