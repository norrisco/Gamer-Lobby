import { NgModule } from '@angular/core';
import { Routes, RouterModule, Router } from '@angular/router';
import { AddPlayerComponent } from './components/add-player/add-player.component';
import { UpdatePlayerComponent } from './components/update-player/update-player.component';
import { DeletePlayerComponent } from './components/delete-player/delete-player.component';
import { PlayerListComponent } from './components/player-list/player-list.component';
import { GamesComponent } from './components/games/games.component';
import { PlayerRankingComponent } from "./components/player-ranking/player-ranking.component";
import { JoinGameComponent } from "./components/join-game/join-game.component";


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'player-ranking' },
  //{ path: 'add-player', component: AddPlayerComponent },
  //{ path: 'read-player/:id', component: UpdatePlayerComponent },
  //{ path: 'delete-player/:id', component: DeletePlayerComponent },
  //{ path: 'player-list', component: PlayerListComponent },
  //{ path: 'games', component: GamesComponent }
  { path: 'player-ranking', component: PlayerRankingComponent},
  { path: 'join-game', component: JoinGameComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {enableTracing: true})],
  exports: [RouterModule]
})

export class AppRoutingModule { 
  // constructor(private router: Router) {
  //   this.router.errorHandler = (error: any) => {
  //       this.router.navigate(['404']); // or redirect to default route
  //   }
  // }
}
