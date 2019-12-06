import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddPlayerComponent } from './components/add-player/add-player.component';
import { UpdatePlayerComponent } from './components/update-player/update-player.component';
import { DeletePlayerComponent } from './components/delete-player/delete-player.component';
import { PlayerListComponent } from './components/player-list/player-list.component';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'add-player' },
  { path: 'add-player', component: AddPlayerComponent },
  { path: 'update-player/:id', component: UpdatePlayerComponent },
  { path: 'delete-player/:id', component: DeletePlayerComponent },
  { path: 'player-list/:id', component: PlayerListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
