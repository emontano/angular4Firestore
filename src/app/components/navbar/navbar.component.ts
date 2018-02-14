import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
import { Client } from '../../models/Client';
import { AuthService } from '../../services/auth.service';
import { SettingsService} from '../../services/settings.service';
import { User } from '../../models/User';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isLoggedIn:boolean;
  loggedInUser:User;
  showRegister:boolean;

  constructor(
    private authService:AuthService, 
    private router:Router, 
    private flashMessage:FlashMessagesService,
    private settingService :SettingsService) { }

  ngOnInit() {
    this.authService.getAuth().subscribe(auth => {
      if(auth){
        this.isLoggedIn = true;
        this.loggedInUser = {email: auth.email, password:''};
        }
      else{
        this.isLoggedIn = false;
      }
    });
    this.showRegister = this.settingService.getSettings().allowRegistration;
  }

  onLogout(){
    this.authService.logout();
    this.displayMessage('You are now logged out','alert-success','/login');
  }

  displayMessage(message:string, messageclass:string,route:string){
    //console.log('route to go:'+ route);
    this.flashMessage.show(message, {cssClass:messageclass, timeout:4000});
    this.router.navigate([route]);
  }

}
