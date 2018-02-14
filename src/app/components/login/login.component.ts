import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router'; 
import { User } from '../../models/User';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
 //monty@gmail.com/angularProy
  user:User = {email:'',password:''};

  constructor(private authService: AuthService,
              private router:Router, 
              private flashMessage:FlashMessagesService) { }

  ngOnInit() {
    this.authService.getAuth().subscribe(auth => {
      if(auth){
        this.router.navigate(['/']);
      }
    });
  }

  onSubmit(){
    //console.log(this.user);
    this.authService.login(this.user).then(res => {
      this.displayMessage('You are now logged in','alert-success','/');
      }).catch(err => {
        this.displayMessage(err.message,'alert-danger','login');
      })
  }

  displayMessage(message:string, messageclass:string,route:string){
    //console.log('route to go:'+ route);
    this.flashMessage.show(message, {cssClass:messageclass, timeout:4000});
    this.router.navigate([route]);
  }
}
