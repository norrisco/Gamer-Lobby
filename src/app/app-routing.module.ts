import { NgModule } from '@angular/core';
import { Routes, RouterModule, Router } from '@angular/router';
import { PlayerRankingComponent } from "./components/player-ranking/player-ranking.component";
import { JoinGameComponent } from "./components/join-game/join-game.component";


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'player-ranking' },
  { path: 'player-ranking', component: PlayerRankingComponent},
  { path: 'join-game/:id', component: JoinGameComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {enableTracing: true})],
  exports: [RouterModule]
})

export class AppRoutingModule { 
}
