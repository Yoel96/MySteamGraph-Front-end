import { Component, inject, Inject } from '@angular/core';
import { SteamService } from '../steam.service';

@Component({
  selector: 'app-profile-bar',
  standalone: true,
  imports: [],
  providers:[SteamService],
  templateUrl: './profile-bar.component.html',
  styleUrl: './profile-bar.component.css'
})
export class ProfileBarComponent {

  steamService= inject(SteamService);
  userName:string= "";
  userAvatar:string= "";
  created:string="";
  lastLog:string="";
  constructor(){

    this.steamService.getuserProfile().subscribe({next:(data)=>{
      this.userName= data.response.players[0].personaname;
      this.userAvatar= data.response.players[0].avatarfull;
      this.created=new Date(data.response.players[0].timecreated * 1000).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
      this.lastLog=new Date(data.response.players[0].lastlogoff * 1000).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

    },
  error:(error)=>{


  }});


  }

}
