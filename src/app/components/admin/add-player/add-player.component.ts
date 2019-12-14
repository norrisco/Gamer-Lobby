import { Router } from '@angular/router';
import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material';
import { ApiService } from '../../../shared/api.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'app-add-player',
  templateUrl: './add-player.component.html',
  styleUrls: ['./add-player.component.css']
})

export class AddPlayerComponent implements OnInit {
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  @ViewChild('chipList', {static: false}) chipList;
  @ViewChild('resetPlayerForm', {static: false}) myNgForm;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  playerForm: FormGroup;
  RankArray: any = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
  TimeArray: any = ['1 hr', '2 hrs', '3 hrs', '4 hrs', '5+ hrs'];
  GamesArray: any = ['Overwatch', 'Minecraft', 'League of Legends', 'Warcraft III', 'Fortnite'];

  ngOnInit() {
    this.submitBookForm();
  }

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private playerApi: ApiService
  ) { }

  /* Reactive book form */
  submitBookForm() {
    this.playerForm = this.fb.group({
      player_name: ['', [Validators.required]],
      player_rank: ['', [Validators.required]],
      player_score: ['', [Validators.required]],
      player_time: ['', [Validators.required]],
      games_played: ['', [Validators.required]],
      player_status: ['Available']
    })
  }

  /* Get errors */
  public handleError = (controlName: string, errorName: string) => {
    return this.playerForm.controls[controlName].hasError(errorName);
  }  

  /* Submit book */
  submitPlayerForm() {
    if (this.playerForm.valid) {
      this.playerApi.AddPlayer(this.playerForm.value).subscribe(res => {
        this.ngZone.run(() => this.router.navigateByUrl('/admin/player-list'))
      });
    }
  }

}