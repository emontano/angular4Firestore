import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Client } from '../../models/Client';

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.css']
})
export class ClientDetailsComponent implements OnInit {
  id:string;
  client:Client;
  hasBalance:boolean = false;
  showBalanceUpdateInput: boolean =false;

  constructor(private clientService:ClientService, 
              private router:Router, private route:ActivatedRoute,
              private flashMessage:FlashMessagesService) { }

  ngOnInit() {
    //get id from url
    this.id = this.route.snapshot.params['id'];
    
    //get the client from service
    this.clientService.getClient(this.id).subscribe(client =>{
     if(client != null){
      if(client.balance > 0){
        this.hasBalance = true;
        }
      //console.log(client);
      this.client = client;
      }
    });
  }

  updateBalance(){
    this.clientService.updateClient(this.client);
    this.showBalanceUpdateInput=false;
    this.displayMessage('Balance updated','alert-success','/client/'+this.client.id);
  }

  onDeleteClick(){
    if(confirm('Are you sure?')){
      this.clientService.deleteClient(this.client);
      this.displayMessage('Client Removed','alert-success','/');
    }
  }

  displayMessage(message:string, messageclass:string,route:string){
    //console.log('route to go:'+ route);
    this.flashMessage.show(message, {cssClass:messageclass, timeout:4000});
    this.router.navigate([route]);
  }

}
