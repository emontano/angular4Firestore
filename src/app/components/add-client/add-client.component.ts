import { Component, OnInit, ViewChild } from '@angular/core';
import { Client } from '../../models/Client';
import { FlashMessagesService} from 'angular2-flash-messages';
import { Router } from '@angular/router';
import { ClientService } from '../../services/client.service';
import { SettingsService} from '../../services/settings.service';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit {
  client:Client = {
    firstName:'',
    lastName:'',
    email:'',
    phone:'',
    balance:0
  }

  disableBalanceOnAdd:boolean;
  @ViewChild('clientForm') form: any;

  constructor(private flashMessage: FlashMessagesService, 
              private router:Router,
              private clientService:ClientService,
              private settingService :SettingsService) { }

  ngOnInit() {
    this.disableBalanceOnAdd = this.settingService.getSettings().disableBalanceOnAdd;
  }

  onSubmit({value, valid}:{value:Client, valid:boolean}){
    if(this.disableBalanceOnAdd){
      value.balance = 0;
      }
    console.log(value,valid);
    
    if(!valid){
      this.displayMessage('Please fill in all fields','alert-danger','/client/add');
      }
    else{
      // add New Client
      this.clientService.newClient(value);
      this.displayMessage('New client added','alert-success','/');
      }
  }

  displayMessage(message:string, messageclass:string,route:string){
    this.flashMessage.show(message, {cssClass:messageclass, timeout:4000});
    this.router.navigate([route]);
  }

}