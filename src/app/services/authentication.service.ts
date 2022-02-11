import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { User } from '../appModel/user.model';
import { tap,catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
user = new BehaviorSubject<User>(null);
  constructor(private http: HttpClient) {
   }

   checkLoginUser(obj) {
    return this.http.post('https://reqres.in/api/login',obj).pipe(
    tap(res=>{
      sessionStorage.setItem("token",JSON.stringify(res))
    	this.authenticatedUser(res);
      })
    )
  }
  fetchListOfUser(){
  	return this.http.get('https://reqres.in/api/unknown')
  }

  private authenticatedUser(res){
  	const user = new User(res.token)
  	this.user.next(user);
  }
}
