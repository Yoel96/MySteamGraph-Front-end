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
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';
@Component({
  selector: 'app-game-list',
  standalone: true,
  imports: [DecimalPipe, DatePipe, InfiniteScrollDirective, CdkDropListGroup, CdkDropList, CdkDrag],
  providers: [SteamService],
  templateUrl: './game-list.component.html',
  styleUrl: './game-list.component.css',
})
export class GameListComponent {
  steamService = inject(SteamService);
  games = [];
  filteredGames = [];
  completedGames = [];
  completedGamesId: number[] = [];
  filteredCompletedGames = [];

  gamesIteration: number = 0;
  completedGamesIteration: number = 0;
  completedListState: boolean = false;

  constructor() {
    this.steamService.getUserGames().subscribe({
      next: (data) => {
        this.games = data.response.games;
        this.steamService.getCompletedGames().subscribe({
          next: (data) => {
            console.log(
              data.map(function (e: any) {
                return e.steamId;
              })
            );
            this.completedGamesId = data.map(function (e: any) {
              return e.steamId;
            });
            console.log(this.games);
            this.completedGames = this.games.filter(
              (e) => this.completedGamesId.indexOf(e['appid']) > -1
            );
            this.filterCompletedGames();
          },
          error: (error) => {},
        });

        this.filterGameList();
      },
      error: (error) => {},
    });
  }

  gameDrop(event: CdkDragDrop<never[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {


      if (event.container.id == 'completedGameList') {
        // If the user drop a game into the completed list container
        transferArrayItem(
          event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          Infinity
        );
        if (this.completedGames.length / 8 > this.completedGamesIteration + 1) {
          this.completedGamesIteration++;
        }
        this.completedGamesId.push(
          parseInt(event.item.element.nativeElement.id)
        );
        this.steamService
          .addCompletedGame({
            steamGameId: event.item.element.nativeElement.id,
          })
          .subscribe({
            next: (data) => {
              console.log(data);
            },
          });
      } else {
        // If the user drop a game into the uncompleted list container

        this.steamService.removeCompletedGame(event.item.element.nativeElement.id).subscribe({
          next:(data)=>{  


          }
        })

        transferArrayItem(
          event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex
        );
        
        
        if (this.completedGames.length / 8 <= this.completedGamesIteration) {
          this.completedGamesIteration--;
        }

        delete this.completedGamesId[this.completedGamesId.indexOf(parseInt(event.item.element.nativeElement.id))]
        this.filterGameList(); 

      }
      this.filterCompletedGames();
    }
  }

  completedList() {
    // This function is called when the user press the button for the list of completed games
    this.completedListState = !this.completedListState;
    this.filterGameList();
  }

  filterGameList() {
    if (this.completedListState) {
      this.filteredGames = this.games.filter(
        (e, idx) =>
          idx >= this.gamesIteration * 50 &&
          idx <= (this.gamesIteration + 1) * 50 &&
          this.completedGamesId.indexOf(e['appid']) == -1
      );
    } else {
      this.filteredGames = this.games.filter(
        (e, idx) =>
          idx >= this.gamesIteration * 50 &&
          idx <= (this.gamesIteration + 1) * 50
      );
    }
  }

  filterCompletedGames() {
    this.filteredCompletedGames = this.completedGames.filter(
      (e, idx) =>
        idx >= this.completedGamesIteration * 8 &&
        idx < (this.completedGamesIteration + 1) * 8
    );
  }

  changeFilter(number: number) {
    this.completedGamesIteration += number;
    this.filterCompletedGames();
  }

  onScroll(){
    console.log("scrolled")

  }
}
