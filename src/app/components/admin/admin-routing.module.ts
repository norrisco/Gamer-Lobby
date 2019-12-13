import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from "./admin/admin.component";
import { AddPlayerComponent } from "./add-player/add-player.component";
import { PlayerListComponent } from "./player-list/player-list.component";
import { UpdatePlayerComponent } from "./update-player/update-player.component";
import { GamesComponent } from "./games/games.component";
import { AuthGuard } from "../../auth/auth.guard";


const adminRoutes: Routes = [
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        canActivateChild: [AuthGuard],
        children: [
          { path: '', pathMatch: 'full', redirectTo: 'player-list' },
          { path: 'read-player/:id', component: UpdatePlayerComponent },
          { path: 'add-player', component: AddPlayerComponent },
          { path: 'games', component: GamesComponent},
          { path: 'player-list', component: PlayerListComponent },
        ]
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(adminRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AdminRoutingModule {}