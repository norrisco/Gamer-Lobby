import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';

import { AdminComponent } from './admin/admin.component';
import { PlayerListComponent } from './player-list/player-list.component';
import { AddPlayerComponent } from './add-player/add-player.component';
import { UpdatePlayerComponent } from './update-player/update-player.component';
import { GamesComponent } from './games/games.component';

import { AngularMaterialModule } from "../../material.module";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AdminComponent,
    PlayerListComponent,
    AddPlayerComponent,
    UpdatePlayerComponent,
    GamesComponent,
  
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    AngularMaterialModule,
  ]
})
export class AdminModule { }
