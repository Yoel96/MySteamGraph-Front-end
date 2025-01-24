import { Component, inject } from '@angular/core';
import { SteamService } from '../steam.service';
import { DatePipe, DecimalPipe } from '@angular/common';
import {
  CdkDragDrop,
  CdkDrag,
  CdkDropList,
  CdkDropListGroup,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
@Component({
  selector: 'app-game-list',
  standalone: true,
  imports: [DecimalPipe, DatePipe, CdkDropListGroup, CdkDropList, CdkDrag],
  providers: [SteamService],
  templateUrl: './game-list.component.html',
  styleUrl: './game-list.component.css',
})
export class GameListComponent {
  steamService = inject(SteamService);
  games = [];
  gamesToShow = [];
  completedGames = [];
  iteration = 0;
  completedListState:boolean = false;

  constructor() {
    this.steamService.getUserGames().subscribe({
      next: (data) => {
        console.log(data.response);
        this.games = data.response.games;
        this.gamesToShow = this.games.filter((e, idx) => {
          if (idx >= this.iteration && idx <= this.iteration + 50) {
            return true;
          } else {
            return false;
          }
        });
      },
      error: (error) => {},
    });
  }

  gameDrop(event: CdkDragDrop<never[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      console.log(event)
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

  completedList(){
    this.completedListState= !this.completedListState;
  }

}
