import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router'; 
import { User } from '../../models/User';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user:User = {email:'',password:''};

  constructor(private authService: AuthService,
              private router:Router, 
              private flashMessage:FlashMessagesService) 
              { }

  ngOnInit() {
  }

  onSubmit(){
    console.log(this.user);
    this.authService.register(this.user).then(res => {
      this.displayMessage('You are now Register and Loggged in','alert-success','/');
      }).catch(err => {
        this.displayMessage(err.message,'alert-danger','register');
      })
  }

  displayMessage(message:string, messageclass:string,route:string){
    //console.log('route to go:'+ route);
    this.flashMessage.show(message, {cssClass:messageclass, timeout:4000});
    this.router.navigate([route]);
  }

}
