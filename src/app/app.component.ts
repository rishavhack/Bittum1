import { Component } from '@angular/core';
import { BnNgIdleService } from 'bn-ng-idle';
import { Router } from "@angular/router";
import { NotificationService } from './services/notification.service'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'assingmet';
  constructor(    
  	private notifyService : NotificationService,
  	private router: Router,
  	private bnIdle: BnNgIdleService){

  }

   ngOnInit(): void {
    this.bnIdle.startWatching(300).subscribe((isTimedOut: boolean) => {
      if (isTimedOut) {
      	this.notifyService.showError("Session Timeout", "Error")
      	sessionStorage.removeItem('token')
        this.router.navigate(['login'])
      }
    });
  }
}
