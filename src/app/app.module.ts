import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

//import { AddPlayerComponent } from './components/add-player/add-player.component';
//import { UpdatePlayerComponent } from './components/update-player/update-player.component';
//import { DeletePlayerComponent } from './components/delete-player/delete-player.component';
//import { GamesComponent } from './components/games/games.component'
import { PlayerListComponent } from './components/player-list/player-list.component';
import { SearchComponent } from './components/search/search.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './material.module';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
/* Angular 8 CRUD services */
import { ApiService } from './shared/api.service';
/* Reactive form services in Angular 8 */
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AdminModule } from "./components/admin/admin.module";

import { AuthModule } from "./auth/auth.module";
import { PlayerRankingComponent } from './components/player-ranking/player-ranking.component';
import { JoinGameComponent } from './components/join-game/join-game.component';


@NgModule({
  declarations: [
    AppComponent,
    //AddPlayerComponent,
    //UpdatePlayerComponent,
    //DeletePlayerComponent,
    PlayerListComponent,
    SearchComponent,
   //GamesComponent,
    PlayerRankingComponent,
   JoinGameComponent,

    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    FormsModule,
    AdminModule,
    AuthModule
  ],
  providers: [ApiService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class AppModule { }
