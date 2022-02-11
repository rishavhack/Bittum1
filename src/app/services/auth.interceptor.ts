import { Injectable } from '@angular/core';
import { HttpParams,HttpRequest,HttpHandler,HttpInterceptor } from '@angular/common/http'
import { AuthenticationService } from './authentication.service';
import { take,exhaustMap} from 'rxjs/operators'

@Injectable()
export class AuthInterceptor implements HttpInterceptor{
	constructor(private authService:AuthenticationService){

	}

	intercept(req:HttpRequest<any>,next: HttpHandler){
		return this.authService.user.pipe(take(1),exhaustMap(user=>{
			if(!user){
				return next.handle(req)
			}

			const modifiedReq = req.clone({
				params: new HttpParams().set('auth',user.token)
			});

			return next.handle(modifiedReq)
		}))
		//return next.handle(req)
	}
}