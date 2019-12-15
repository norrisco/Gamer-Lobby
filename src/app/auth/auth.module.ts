import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule, ReactiveFormsModule }    from '@angular/forms';

import { LoginComponent }    from './login/login.component';
import { AuthRoutingModule } from './auth-routing.module';

import { AngularMaterialModule } from "../material.module";



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AuthRoutingModule,
    AngularMaterialModule,
    ReactiveFormsModule
  ],
  declarations: [
    LoginComponent
  ]
})
export class AuthModule {}