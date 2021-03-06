import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './material.module';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ApiService } from './shared/api.service';
import { GamesApiService } from './shared/games.api.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminModule } from "./components/admin/admin.module";
import { AuthModule } from "./auth/auth.module";
import { PlayerRankingComponent } from './components/player-ranking/player-ranking.component';
import { JoinGameComponent } from './components/join-game/join-game.component';
import { AuthInterceptor } from './auth/auth-interceptor';


@NgModule({
  declarations: [
    AppComponent,
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
  providers: [
    ApiService, 
    GamesApiService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class AppModule { }
