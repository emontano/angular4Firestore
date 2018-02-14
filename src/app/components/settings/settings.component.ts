import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../../services/settings.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
import { Settings } from '../../models/Settings';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  settings : Settings;

  constructor( private settingService :SettingsService,
              private router:Router, 
              private flashMessage:FlashMessagesService) { }

  ngOnInit() {
    this.settings = this.settingService.getSettings();
  }

  onSubmit(){
    this.settingService.changeSettings(this.settings);
    this.displayMessage('Settings Saved','alert-success','/settings');
  }

  displayMessage(message:string, messageclass:string,route:string){
    //console.log('route to go:'+ route);
    this.flashMessage.show(message, {cssClass:messageclass, timeout:4000});
    this.router.navigate([route]);
  }

}
