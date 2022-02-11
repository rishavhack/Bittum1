import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from "../services/authentication.service";
import { Observable } from 'rxjs';
@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {
  public items:any[] =[];
  constructor(
  	private authenticationService: AuthenticationService
  	) { }

  ngOnInit() {
  	this.authenticationService.fetchListOfUser().subscribe(
  	res=>{
  		this.items = res['data'];
  	})
  }

}
