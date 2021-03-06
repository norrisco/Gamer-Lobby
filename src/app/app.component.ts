import { Component, ViewChild, HostListener, OnInit, DoCheck } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { AuthService } from "./auth/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit, DoCheck{
  opened = true;
  showFiller = false;
  @ViewChild('sidenav', {static: false}) sidenav: MatSidenav;

  constructor (private auth: AuthService) {}
  isLoggedIn = false;  

  ngOnInit() {
    this.isLoggedIn = this.auth.isLoggedIn();
  }

  ngDoCheck(){
    this.isLoggedIn = this.auth.isLoggedIn();
  }


  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if (event.target.innerWidth < 768) {
      this.sidenav.fixedTopGap = 55;
      this.opened = false;
    } else {
      this.sidenav.fixedTopGap = 55;
      this.opened = true;
    }
  }

  isBiggerScreen() {
    const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    if (width < 768) {
      return true;
    } else {
      return false;
    }
  }

  logout() {
    this.auth.logout();
  }
  


}