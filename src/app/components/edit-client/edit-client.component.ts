import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Client } from '../../models/Client';
import { SettingsService} from '../../services/settings.service';


@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css']
})
export class EditClientComponent implements OnInit {
  id:string;
  client:Client = {
    firstName:'',
    lastName: '',
    email:'',
    phone:'',
    balance:0
    }
  disableBalanceOnEdit:boolean;

  constructor(private clientService:ClientService, 
    private router:Router, private route:ActivatedRoute,
    private flashMessage:FlashMessagesService,
    private settingService :SettingsService) 
    { }

    ngOnInit() {
      this.disableBalanceOnEdit = this.settingService.getSettings().disableBalanceOnEdit;
      //get id from url
      this.id = this.route.snapshot.params['id'];
      
      //get the client from service
      this.clientService.getClient(this.id).subscribe(client => this.client = client);
      console.log("cliente:"+this.client);
    }

    onSubmit({value,valid}:{value:Client, valid:boolean}){
      if(!valid){
        this.displayMessage('Please fill in all fields','alert-danger','/client/edit'+this.id);
        }
      else{
        //add id to client
        value.id = this.id;
        // update Client
        this.clientService.updateClient(value);
        this.displayMessage('Client updated','alert-success','/client/'+this.id);
        }
    }

    displayMessage(message:string, messageclass:string,route:string){
      this.flashMessage.show(message, {cssClass:messageclass, timeout:4000});
      this.router.navigate([route]);
    }

}
