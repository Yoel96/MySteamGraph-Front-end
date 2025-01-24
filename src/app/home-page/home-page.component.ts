import { Component } from '@angular/core';
import { ProfileBarComponent } from '../profile-bar/profile-bar.component';
import { GameListComponent } from '../game-list/game-list.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [ProfileBarComponent,GameListComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {



  constructor(){


  }

}
